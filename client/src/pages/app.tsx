
import axios from 'axios';
import { useEffect, useReducer } from 'react';
import './app.css';

interface State {
  data: any,
}

interface Action {
  type: any;
  payload: any;
}

const reducer = (state: State, action: Action) => {

  const newData = Object.assign({}, state.data);

  switch (action.type) {
    case "initial":
      newData.sites = action.payload.siteData;
      newData.content = action.payload.contentData;
      return { ...state, data: newData }
    case "update:sites":
      newData.sites = JSON.parse(action.payload);
      return { ...state, data: newData }
    case "update:content":
      newData.content = JSON.parse(action.payload);
      return { ...state, data: newData }
    case "save:sites":
      axios.post("http://localhost:3001/api/sites", state.data.sites)
      return { ...state, data: newData }
    case "save:content":
      axios.post("http://localhost:3001/api/content", state.data.content)
      return { ...state, data: newData }
    case "update:runtime":
      axios.post("http://localhost:3002/api/reload", {})
      return { ...state, data: newData }
    default:
      return { ...state }
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, {
    data: {
      sites: null,
      content: null
    }
  })

  useEffect(() => {
    let siteData = null;
    axios('http://localhost:3001/api/sites')
      .then((res: any) => {
        siteData = res.data;
        return axios('http://localhost:3001/api/content')
      })
      .then((res: any) => {
        dispatch({ type: 'initial', payload: { siteData, contentData: res.data } });
      })
  }, []);

  return (
    <div className="app">
      <h2>Sites</h2>
      {!state.data.sites ? null : <>
        <div className="links">
          {state.data.sites.map((site) => {
            const s = site.id;
            const dom = site.pages.map((page) => {
              return <div><a href={`http://localhost:3002/${s}/${page.url}`} rel="noreferrer" target="_blank">{`http://localhost:3002/${s}/${page.url}`}</a></div>
            })
            return dom.concat([<br />]);
          })}
        </div>
        <br />
        <h2>Sites - Pages/Layout</h2>
        <textarea onChange={(e) => dispatch({ type: 'update:sites', payload: e.target.value })}>{JSON.stringify(state.data.sites, null, 2)}</textarea>
        <div className="btn-bar">
          <button onClick={() => dispatch({ type: 'save:sites', payload: null })}>Update</button>
          <button onClick={() => dispatch({ type: 'update:runtime', payload: null })}>Refresh Runtime</button>
        </div>
      </>}
      <h2>Content</h2>
      {!state.data.content ? null : <>
        <textarea onChange={(e) => dispatch({ type: 'update:content', payload: e.target.value })}>{JSON.stringify(state.data.content, null, 2)}</textarea>
        <div className="btn-bar">
          <button onClick={() => dispatch({ type: 'save:content', payload: null })}>Update</button>
          <button onClick={() => dispatch({ type: 'update:runtime', payload: null })}>Refresh Runtime</button>
        </div>
      </>}
    </div>
  );
}

export default App;
