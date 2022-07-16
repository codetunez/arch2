import './app.css';

import { useEffect, useReducer, useState } from 'react';

import axios from 'axios';
import Editor from "@monaco-editor/react";
import usePromise from '../hooks/usePromise';

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
    case "load:page":
      newData.page = action.payload;
      return { ...state, data: newData }
    case "update:page:id":
      newData.page.id = action.payload;
      return { ...state, data: newData }
    case "update:page:title":
      newData.page.title = action.payload;
      return { ...state, data: newData }
    case "update:page:url":
      newData.page.url = action.payload;
      return { ...state, data: newData }
    case "update:page:markup":
      newData.page.markup = action.payload;
      return { ...state, data: newData }
    default:
      return { ...state }
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, {
    data: {
      sites: null,
      content: null,
      page: null
    }
  })

  const [loadUrl, setLoadUrl] = useState({ site: '', page: '', pageUrl: '' });
  const [loading, data, error, loadPage] = usePromise({ promiseFn: () => axios.get(`http://localhost:3001/api/site/${loadUrl.site}/${loadUrl.page}`) });

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

  useEffect(() => {
    if (loadUrl.site === '') { return; }
    loadPage()
  }, [loadUrl])

  useEffect(() => {
    if (!data) { return; }
    dispatch({ type: 'load:page', payload: data.data })
  }, [data])

  const updatePage = () => {
    axios.post(`http://localhost:3001/api/site/${loadUrl.site}/${loadUrl.page}`, {
      id: state.data.page.id,
      title: state.data.page.title,
      markup: state.data.page.markup,
      url: state.data.page.url,
    })
      .then((res: any) => {
        dispatch({ type: 'load:page', payload: res.data })
      })
  }

  return (
    <div className="app">
      <div className="header">
        <h1>Arch II</h1>
      </div>
      <div className="workspace">
        <div className="menu">
          {!state.data.sites ? null : <>
            <div className="links">
              {state.data.sites.map((site) => {
                const s = site.id;
                const dom = site.pages.map((page) => {
                  return <button onClick={() => setLoadUrl({ site: s, page: page.id, pageUrl: s + '/' + page.url })}>{page.title}</button>
                })
                return [<h5>{site.name}</h5>].concat(dom);
              })}
            </div>
          </>}
        </div >
        <div className="editor">
          {state.data.page ?
            <>

              <div className="toolbar">
                <h5>Edit the page meta</h5>
                <div className='btn-bar'>
                  <button onClick={() => updatePage()} className="btn-sm">Update Page</button>
                  <button onClick={() => dispatch({ type: 'update:runtime', payload: null })} className="btn-sm">Refresh Runtime</button>
                </div>
              </div>

              <div className="pageForm">
                <div>
                  <label>URL</label>
                  <a href={`http://localhost:3002/${loadUrl.pageUrl}`} rel="noreferrer" target="_blank">{`http://localhost:3002/${loadUrl.pageUrl}`}</a>
                </div>
                <div>
                  <label>ID</label>
                  <input type='text' value={state.data.page.id} onChange={(e) => dispatch({ type: 'update:page:id', payload: e.target.value })} />
                </div>
                <div>
                  <label>Title</label>
                  <input type='text' value={state.data.page.title} onChange={(e) => dispatch({ type: 'update:page:title', payload: e.target.value })} />
                </div>
                <div>
                  <label>Url</label>
                  <input type='text' value={state.data.page.url} onChange={(e) => dispatch({ type: 'update:page:url', payload: e.target.value })} />
                </div>
              </div>

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
                  onChange={(value) => dispatch({ type: 'update:page:markup', payload: value })}
                  language="html"
                  defaultValue={state.data.page.markup}
                  value={state.data.page.markup}
                />
              </div>
            </>
            : null}

        </div>
      </div >
    </div >
  )
}


export default App;
