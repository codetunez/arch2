import './content.css';

import { useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const paths = location.pathname.split('/');
  const appContext: any = useContext(AppContext);

  const [state, dispatch] = useReducer(reducer, { data: {}, dirty: true });
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
            <h5>Edit the content meta</h5>
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