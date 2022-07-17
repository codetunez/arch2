import './content.css';

import { useLocation } from 'react-router-dom';
import { useEffect, useReducer, useContext } from 'react';

import axios from 'axios';
import Editor from "@monaco-editor/react";
import usePromise from '../hooks/usePromise';
import { AppContext } from '../context/appContext';

interface State {
  data: any,
  dirty: boolean
}

interface Action {
  type: any;
  payload: any;
}

const reducer = (state: State, action: Action) => {

  let newData = Object.assign({}, state.data);

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
    case "dirty:clear":
      return { ...state, dirty: false }
    default:
      return { ...state }
  }
}

const Content = () => {

  const location = useLocation();
  const paths = location.pathname.split('/');
  const appContext: any = useContext(AppContext);

  const [state, dispatch] = useReducer(reducer, { data: {}, dirty: true });
  const [loading, payload, error, loadPayload] = usePromise({ promiseFn: () => axios.get(`http://localhost:3001/api/content/${paths[2]}`) });

  useEffect(() => {
    loadPayload();
  }, [location])

  useEffect(() => {
    if (!payload) { return; }
    dispatch({ type: 'load:data', payload: payload.data })
  }, [payload])

  const updateContent = () => {
    appContext.updateContent(paths[2], {
      id: state.data.id,
      markup: state.data.markup
    }).then(() => {
      dispatch({ type: 'dirty:clear', payload: null })
    })
  }

  return (
    <div className="content-workspace">
      {Object.keys(state.data).length > 0 ?
        <>
          <div className="toolbar">
            <h5>Edit the content meta</h5>
            <button className={state.dirty ? "btn-sm btn-warning" : "btn-sm"} onClick={() => { updateContent() }}>Update</button>
          </div>
          <div className="form">
            <div>
              <label>ID</label>
              <input type='text' value={state.data.id} onChange={(e) => dispatch({ type: 'update:id', payload: e.target.value })} />
            </div>
          </div>
          <br />
          <h5>Edit the page markup</h5>
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
        </>
        : "No content data"}
    </div>

  )
}

export default Content;