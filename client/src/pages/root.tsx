import './root.css';

import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/appContext';

const Root = () => {

  const location = useLocation();
  const paths = location.pathname.split('/');
  const appContext: any = useContext(AppContext);

  const addContent = () => {
    appContext.addContent(paths[2])
  }

  const addSite = () => {
    appContext.addSite("bootstrap3")
  }

  return (
    <div className="root-workspace">
      {paths[2] === 'data' ? <h5>Expand tree or select Site or Content</h5> : null}

      {paths[2] === 'site' ? <>
        <div className="form">
          <div>
            <label>Add a new Site</label>
            <button onClick={() => addSite()}>+</button>
          </div>
        </div>
      </>
        : null}

      {paths[2] === 'content' ? <>
        <div className="form">
          <div>
            <label>Add a new Content item</label>
            <button onClick={() => addContent()}>+</button>
          </div>
        </div>
      </>
        : null}
    </div>
  )
}

export default Root;