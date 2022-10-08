import './page.css';

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
    case "update:title":
      newData.title = action.payload;
      return { ...state, data: newData, dirty: true }
    case "update:url":
      newData.url = action.payload;
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

const Page = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const paths = location.pathname.split('/');
  const appContext: any = useContext(AppContext);

  const [state, dispatch] = useReducer(reducer, { data: {}, dirty: false });
  // eslint-disable-next-line
  const [loading, payload, error, loadPayload] = usePromise({ promiseFn: () => axios.get(`http://localhost:3001/api/page/${paths[2]}/${paths[3]}`) });

  useEffect(() => {
    loadPayload();
    // eslint-disable-next-line
  }, [location])

  useEffect(() => {
    if (!payload) { return; }
    dispatch({ type: 'load:data', payload: payload.data })
  }, [payload])

  const updatePage = () => {
    appContext.updatePage(paths[2], paths[3], {
      id: state.data.id,
      title: state.data.title,
      markup: state.data.markup,
      url: state.data.url,
    })
    dispatch({ type: 'dirty:clear', payload: null })
  }

  const deletePage = () => {
    appContext.deletePage(paths[2], paths[3]);
    navigate("/root/data");
  }

  const url = Object.keys(state.data).length > 0 ? `${paths[2]}/${state.data.url}` : null;

  return (
    <div className="page-workspace">
      {Object.keys(state.data).length > 0 ?
        <>
          <div className="toolbar">
            <h5>Edit the page</h5>
            <div className="btn-bar">
              <button className={state.dirty ? "btn-sm btn-warning" : "btn-sm"} onClick={() => { updatePage() }}>Update</button>
              <button className={"btn-sm btn-danger"} onClick={() => { deletePage() }}>Delete</button>
            </div>
          </div>
          <div className="form">
            <div>
              <label>URL</label>
              <a href={`http://localhost:3002/${url}`} rel="noreferrer" target="_blank">{`http://localhost:3002/${url}`}</a>
            </div>
            <div>
              <label>ID</label>
              <input type='text' value={state.data.id} onChange={(e) => dispatch({ type: 'update:id', payload: e.target.value })} />
            </div>
            <div>
              <label>Title</label>
              <input type='text' value={state.data.title} onChange={(e) => dispatch({ type: 'update:title', payload: e.target.value })} />
            </div>
            <div>
              <label>Url</label>
              <input type='text' value={state.data.url} onChange={(e) => dispatch({ type: 'update:url', payload: e.target.value })} />
            </div>
          </div>
          <br />
          <h5>Edit the page markup</h5>
          <div className="monaco">
            <Editor options={{
              renderLineHighlight: 'none',
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
        : "No page data"}
    </div>

  )
}

export default Page;