import './content.css';
import * as library from 'library';

import { useLocation, useNavigate } from 'react-router-dom';
import { useRef, useEffect, useReducer, useContext } from 'react';

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
      return { ...state, data: newData, dirty: false }
    case "update:id":
      newData.id = action.payload;
      return { ...state, data: newData, dirty: true }
    case "update:markup":
      newData.markup = action.payload;
      return { ...state, data: newData, dirty: true }
    case "update:engine":
      newForm.engine = action.payload;
      return { ...state, form: newForm }
    case "dirty:clear":
      return { ...state, dirty: false }
    default:
      return { ...state }
  }
}

const Content = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const paths = location.pathname.split('/');
  const appContext: any = useContext(AppContext);

  const refPreview = useRef();

  const [state, dispatch] = useReducer(reducer, { data: {}, dirty: true, form: { engine: library.list.engines[0] } });
  // eslint-disable-next-line
  const [loading, payload, error, loadPayload] = usePromise({ promiseFn: () => axios.get(`http://localhost:3001/api/content/${paths[2]}`) });

  useEffect(() => {
    loadPayload();
    // eslint-disable-next-line
  }, [location])

  useEffect(() => {
    if (!payload) { return; }
    dispatch({ type: 'load:data', payload: payload.data })
  }, [payload])

  useEffect(() => {

    if (!state.data.id || !state.form.engine) { return; }

    let markup = library.engines[state.form.engine](state.data.markup);
    markup = library.templates[state.form.engine]("Sample", "<div style='padding: 2rem'>" + markup + "</div>","");
    const ref: any = refPreview.current;
    if (ref) { ref.src = "data:text/html;charset=utf-8," + markup; }

  }, [state.data.markup, state.form.engine])

  const updateContent = () => {
    appContext.updateContent(paths[2], {
      id: state.data.id,
      markup: state.data.markup
    })
    dispatch({ type: 'dirty:clear', payload: null })
  }

  const deleteContent = () => {
    appContext.deleteContent(paths[2]);
    navigate("/root/data");
  }

  return (
    <div className="content-workspace">
      {Object.keys(state.data).length > 0 ?
        <>
          <div className="toolbar">
            <h5>Edit Content fragment</h5>
            <div className="btn-bar">
              <button className={state.dirty ? "btn-sm btn-warning" : "btn-sm"} onClick={() => { updateContent() }}>Update</button>
              <button className={"btn-sm btn-danger"} onClick={() => { deleteContent() }}>Delete</button>
            </div>
          </div>
          <div className="form">
            <div>
              <label>ID</label>
              <input type='text' value={state.data.id} onChange={(e) => dispatch({ type: 'update:id', payload: e.target.value })} />
            </div>
          </div>
          <br />
          <h5>Edit the content fragment</h5>
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
              onChange={(value) => dispatch({ type: 'update:markup', payload: value })}
              language="html"
              defaultValue={state.data.markup}
              value={state.data.markup}
            />
          </div>
          <div>
            <h3>Content fragment preview</h3>
            <div className='preview-bar'>
              <Combo items={appContext.engines} value={state.form.engine || ''} onChange={(e) => dispatch({ type: 'update:engine', payload: e.target.value })} />
            </div>
            <iframe ref={refPreview} id="preview" title="preview" src="about:blank"></iframe>
          </div>
        </>
        : "No content data"}
    </div>

  )
}

export default Content;