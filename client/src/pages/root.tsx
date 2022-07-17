import './root.css';

import { useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext } from '../context/appContext';

import { Combo } from '../controls/combo';

const Root = () => {

  const location = useLocation();
  const paths = location.pathname.split('/');
  const appContext: any = useContext(AppContext);

  const [engine, setEngine] = useState<string>("bootstrap3");

  const addContent = () => { appContext.addContent(paths[2]); }

  const addSite = () => { appContext.addSite(engine); }

  return (
    <div className="root-workspace">
      {paths[2] === 'data' ? <h4>Expand tree or select Site or Content</h4> : null}

      {paths[2] === 'site' ? <>
        <h4>Add a new Site</h4>
        <div className="form">
          <div>
            <label>Select Engine</label>
            <Combo name="engine" items={appContext.engines} value={engine} onChange={(e) => setEngine(e.target.value)} />
            <br />
            <label>Create site</label>
            <button onClick={() => addSite()}>+</button>
          </div>
        </div>
      </>
        : null}

      {paths[2] === 'content' ? <>
        <h4>Add a Content item</h4>
        <div className="form">
          <div>
            <label>Create Content item</label>
            <button onClick={() => addContent()}>+</button>
          </div>
        </div>
      </>
        : null}
    </div>
  )
}

export default Root;