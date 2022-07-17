import './site.css';

import { useLocation } from 'react-router-dom';
import { useEffect, useReducer, useContext } from 'react';

import axios from 'axios';
import Editor from "@monaco-editor/react";
import usePromise from '../hooks/usePromise';
import { AppContext } from '../context/appContext';

interface State {
  data: any,
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
      return { ...state, data: newData }
    case "update:id":
      newData.id = action.payload;
      return { ...state, data: newData }
    case "update:name":
      newData.id = action.payload;
      return { ...state, data: newData }
    case "update:engine":
      newData.id = action.payload;
      return { ...state, data: newData }
    default:
      return { ...state }
  }
}

const Site = () => {

  const location = useLocation();
  const paths = location.pathname.split('/');
  const appContext: any = useContext(AppContext);

  const [state, dispatch] = useReducer(reducer, { data: {} });
  const [loading, payload, error, loadPayload] = usePromise({ promiseFn: () => axios.get(`http://localhost:3001/api/site/${paths[2]}`) });

  useEffect(() => {
    loadPayload();
  }, [location])

  useEffect(() => {
    if (!payload) { return; }
    dispatch({ type: 'load:data', payload: payload.data })
  }, [payload])

  const updatePage = () => {
    appContext.updateSite(paths[2], {
      id: state.data.id,
      name: state.data.name,
      engine: state.data.engine,
      pages: state.data.pages
    })
  }

  return (
    <div className="site-workspace">
      {Object.keys(state.data).length > 0 ?
        <>
          <div className="toolbar">
            <h5>Edit the Site meta</h5>
            <button className="btn-sm" onClick={() => { updatePage() }}>Update</button>
          </div>
          <div className="form">
            <div>
              <label>ID</label>
              <input type='text' value={state.data.id} onChange={(e) => dispatch({ type: 'update:id', payload: e.target.value })} />
            </div>
            <div>
              <label>Name</label>
              <input type='text' value={state.data.name} onChange={(e) => dispatch({ type: 'update:name', payload: e.target.value })} />
            </div>
            <div>
              <label>Engine</label>
              <input type='text' value={state.data.engine} onChange={(e) => dispatch({ type: 'update:engine', payload: e.target.value })} />
            </div>
            <div>
              <label>Pages</label>
              <span>{state.data.pages.length}</span>
            </div>

          </div>
        </>
        : "No site data"}
    </div>

  )
}

export default Site;