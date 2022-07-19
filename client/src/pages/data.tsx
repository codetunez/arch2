import './data.css';
import * as library from 'library';

import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo, useRef, useEffect, useReducer, useContext } from 'react';

import axios from 'axios';
import Editor from "@monaco-editor/react";
import usePromise from '../hooks/usePromise';
import { AppContext } from '../context/appContext';
import { Combo } from '../controls/combo';

interface State {
  data: any,
  dirty: boolean,
  form: any
}

interface Action {
  type: any;
  payload: any;
}

const reducer = (state: State, action: Action) => {

  let newData = Object.assign({}, state.data);
  let newForm = Object.assign({}, state.form);

  switch (action.type) {
    case "load:data":
      newData = action.payload;
      newData.fields = JSON.stringify(newData.fields, null, 2);
      return { ...state, data: newData, dirty: false }
    case "update:id":
      newData.id = action.payload;
      return { ...state, data: newData, dirty: true }
    case "update:fields":
      newData.fields = action.payload;
      return { ...state, data: newData, dirty: true }
    case "update:engine":
      newForm.engine = action.payload;
      return { ...state, form: newForm }
    case "update:form":
      newForm.form = action.payload;
      return { ...state, form: newForm }
    case "dirty:clear":
      return { ...state, dirty: false }
    default:
      return { ...state }
  }
}

const Data = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const paths = location.pathname.split('/');
  const appContext: any = useContext(AppContext);

  const refPreview = useRef();

  const [state, dispatch] = useReducer(reducer, { data: {}, dirty: true, form: { engine: library.list.engines[0], form: library.list.forms[0] } });
  // eslint-disable-next-line
  const [loading, payload, error, loadPayload] = usePromise({ promiseFn: () => axios.get(`http://localhost:3001/api/data/${paths[2]}`) });

  useEffect(() => {
    loadPayload();
    // eslint-disable-next-line
  }, [location])

  useEffect(() => {
    if (!payload) { return; }
    dispatch({ type: 'load:data', payload: payload.data })
  }, [payload])

  useEffect(() => {

    if (!state.data.id || !state.form.form || !state.form.engine) { return; }

    let markup = library.content.resolveServer(`<pp:form data="${state.data.id}" ux="${state.form.form}"></pp:form>`, { [state.data.id]: { fields: JSON.parse(state.data.fields) } })
    markup = library.engines[state.form.engine](markup);
    markup = library.templates[state.form.engine]("Sample", "<div style='padding: 2rem'>" + markup + "</div>");
    const ref: any = refPreview.current;
    if (ref) { ref.src = "data:text/html;charset=utf-8," + markup; }

  }, [state.data.id, state.data.fields, state.form.engine, state.form.form])

  const updateData = () => {
    appContext.updateData(paths[2], {
      id: state.data.id,
      fields: JSON.parse(state.data.fields || '')
    })
    dispatch({ type: 'dirty:clear', payload: null })
  }

  const deleteData = () => {
    appContext.deleteData(paths[2]);
    navigate("/root/env");
  }

  return (
    <div className="data-workspace">
      {Object.keys(state.data).length > 0 ?
        <>
          <div className="toolbar">
            <h5>Edit the content meta</h5>
            <div className="btn-bar">
              <button className={state.dirty ? "btn-sm btn-warning" : "btn-sm"} onClick={() => { updateData() }}>Update</button>
              <button className={"btn-sm btn-danger"} onClick={() => { deleteData() }}>Delete</button>
            </div>
          </div>
          <div className="form">
            <div>
              <label>ID</label>
              <input type='text' value={state.data.id} onChange={(e) => dispatch({ type: 'update:id', payload: e.target.value })} />
            </div>
          </div>
          <br />
          <div className='stack'>
            <div>
              <h5>Edit fields</h5>
              <div className="monaco">
                <Editor options={{
                  renderLineHighlight: 'none',
                  wordWrap: 'false',
                  formatOnType: true,
                  lineNumbers: 'off',
                  minimap: { enabled: false },
                  glyphMargin: false,
                  disableLayerHinting: true,
                }}
                  onChange={(value) => dispatch({ type: 'update:fields', payload: value })}
                  language="json"
                  defaultValue={state.data.fields}
                  value={state.data.fields}
                />
              </div>
            </div>
            <div>
              <h3>Server form preview</h3>
              <div className='preview-bar'>
                <Combo items={appContext.engines} value={state.form.engine || ''} onChange={(e) => dispatch({ type: 'update:engine', payload: e.target.value })} />
                <Combo items={appContext.forms} value={state.form.form || ''} onChange={(e) => dispatch({ type: 'update:form', payload: e.target.value })} />
              </div>
              <iframe ref={refPreview} id="preview" title="preview" src="about:blank"></iframe>
            </div>
          </div>
        </>
        : "No data"}
    </div>

  )
}

export default Data;