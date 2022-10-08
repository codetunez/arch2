import './site.css';

import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useEffect, useReducer, useContext } from 'react';

import axios from 'axios';
import Editor from "@monaco-editor/react";
import usePromise from '../hooks/usePromise';
import { AppContext } from '../context/appContext';

import { Combo } from '../controls/combo';

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
    case "update:name":
      newData.name = action.payload;
      return { ...state, data: newData, dirty: true }
    case "update:engine":
      newData.engine = action.payload;
      return { ...state, data: newData, dirty: true }
    case "update:stylesheet":
      newData.stylesheet = action.payload;
      return { ...state, data: newData, dirty: true }
    case "update:sitenav":
      if (action.payload.value) {
        newData.sitenav.push(action.payload.key);
      } else {
        const i = newData.sitenav.indexOf(action.payload.key);
        newData.sitenav.splice(i, 1);
      }
      return { ...state, data: newData, dirty: true }
    case "dirty:clear":
      return { ...state, dirty: false }
    default:
      return { ...state }
  }
}

const Site = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const paths = location.pathname.split('/');
  const appContext: any = useContext(AppContext);

  const [state, dispatch] = useReducer(reducer, { data: {}, dirty: false });
  // eslint-disable-next-line
  const [loading, payload, error, loadPayload] = usePromise({ promiseFn: () => axios.get(`http://localhost:3001/api/site/${paths[2]}`) });

  useEffect(() => {
    loadPayload();
    // eslint-disable-next-line
  }, [location])

  useEffect(() => {
    if (!payload) { return; }
    dispatch({ type: 'load:data', payload: payload.data })
    // eslint-disable-next-line
  }, [payload])

  const updateSite = () => {
    appContext.updateSite(paths[2], {
      id: state.data.id,
      name: state.data.name,
      engine: state.data.engine,
      stylesheet: state.data.stylesheet,
      pages: state.data.pages,
      sitenav: state.data.sitenav,
    });
    dispatch({ type: 'dirty:clear', payload: null })
  }

  const addPage = () => {
    appContext.addPage(paths[2]);
  }

  const deleteSite = () => {
    appContext.deleteSite(paths[2]);
    navigate("/root/data");
  }

  const url = Object.keys(state.data).length > 0 ? `${paths[2]}` : null;

  return (
    <div className="site-workspace">
      {Object.keys(state.data).length > 0 ?
        <>
          <div className="toolbar">
            <h5>Edit the Site</h5>
            <div className="btn-bar">
              <button className={state.dirty ? "btn-sm btn-warning" : "btn-sm"} onClick={() => { updateSite() }}>Update</button>
              <button className={"btn-sm btn-danger"} onClick={() => { deleteSite() }}>Delete</button>
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
              <label>Name</label>
              <input type='text' value={state.data.name} onChange={(e) => dispatch({ type: 'update:name', payload: e.target.value })} />
            </div>
            <div>
              <label>CSS Engine</label>
              <Combo name="engine" items={appContext.engines} value={state.data.engine} onChange={(e) => dispatch({ type: 'update:engine', payload: e.target.value })} />
            </div>
            <div>
              <label>Site Stylesheet</label>
              <div className="monaco">
                <Editor options={{
                  renderLineHighlight: 'none',
               //   wordWrap: 'false',
                  formatOnType: true,
                  lineNumbers: 'off',
                  minimap: { enabled: false },
                  glyphMargin: false,
                  disableLayerHinting: true,
                }}
                  onChange={(value) => dispatch({ type: 'update:stylesheet', payload: value })}
                  language="css"
                  defaultValue={state.data.stylesheet}
                  value={state.data.stylesheet}
                />
              </div>
            </div>
            <div>
              <label>Add a new Page</label>
              <button onClick={() => addPage()}>+</button>
            </div>
            <br />
            <div>
              <div className="pages-list">
                <div className="item">
                  <label>Current Pages</label>
                  <label>Page in Site Nav</label></div>
              </div>
              {state.data.pages.map((ele, i) => {
                return <div key={i} className="pages-list">
                  <div className="item">
                    <Link to={`/page/${url}/${ele.id}`}>{ele.title}</Link>
                    <div><input type="checkbox" checked={state.data.sitenav.indexOf(ele.id) > -1} onChange={(e) => dispatch({ type: 'update:sitenav', payload: { key: ele.id, value: e.target.checked } })} /></div>
                  </div>
                </div>
              })}
            </div>
          </div>
        </>
        : "No site data"}
    </div>

  )
}

export default Site;