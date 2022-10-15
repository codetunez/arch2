import './site.css';
import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useEffect, useReducer, useContext } from 'react';

import axios from 'axios';
import Editor from "@monaco-editor/react";
import usePromise from '../hooks/usePromise';
import { AppContext } from '../context/appContext';

import { Combo } from '../controls/combo';
import { Card } from '../components/Card';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { List } from '../components/List';
import ReactDOMServer from 'react-dom/server'

import { TextField } from '@fluentui/react/lib/TextField';

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

const options: IDropdownOption[] = [
  { key: 'card', text: 'card' },
  { key: 'list', text: 'list' },
  { key: 'table', text: 'table' }
];


interface State {
  data: any,
  dirty: boolean
}

interface Action {
  type: any;
  payload: any;
}

const layouts = ['card', 'list'];
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

  const [showCard, setShowCard] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showTable, setShowTable] = useState(false);

  
  const [repeat, setRepeat] = useState(1);

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
  console.log("path**" + paths[2]);
  console.log("data=>"+ state.data.pages);

  return (
    <div  style={{display: "flex", flexDirection: "column", margin: "8px"}}>
      <div>
      <TextField label="Standard" multiline rows={8} />
      </div>
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
              <Dropdown
                placeholder="Select an option"
                label="Layouts"
                options={options}
                styles={dropdownStyles}
                onChange={(e, selectedOption) => {
                  // Not working.
                  console.log("value updtaed.." + selectedOption.text)
                  if(selectedOption.text === 'card'){
                    setShowCard(true);
                    setShowList(false);
                  }
                  if(selectedOption.text === 'list'){
                    console.log("showing list");
                    setShowList(true);
                    setShowCard(false);
                  }
                  if(selectedOption.text === 'table'){

                  }
                  
              }}
              />   
             </div>
             <div  style={{width: '200px'}}>
              <label>Repeat</label>
              <input type='number' value={repeat} onChange={(e) => setRepeat(parseInt(e.target.value))} />
            </div>
            {/* <div>
              <label>ID</label>
              <input type='text' value={state.data.id} onChange={(e) => dispatch({ type: 'update:id', payload: e.target.value })} />
            </div> */}
          
            <div>
              <label>CSS Engine</label>
              <Combo name="engine" items={appContext.engines} value={state.data.engine} onChange={(e) => dispatch({ type: 'update:engine', payload: e.target.value })} />
            </div>
            
            {/* <div>
              <label>Site Stylesheet</label>
              <div className="monaco">
                <Editor options={{
                  renderLineHighlight: 'none',
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
             */}
          </div>
        </>
        : "No site data"}
        <div>
        {/* {showCard && ReactDOMServer.renderToString(<Card repeat={repeat} data={state.data.pages}/>)} */}
        {showCard && <Card repeat={repeat} data={state.data.pages}/>} 
        {showList && <List repeat={repeat} data={state.data.pages}/>}
        </div>
    </div>
    </div>
  

  )
}

export default Site;