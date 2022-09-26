import './root.css';

import { useLocation, Link } from 'react-router-dom';
import { useContext, useState, useMemo } from 'react';
import { AppContext } from '../context/appContext';

import { Combo } from '../controls/combo';

function indexBuilder(items, itemKey, root?) {
  return items.map((ele) => {
    const path = `/${itemKey}/${root ? root + '/' : ''}${ele.id}`
    return <Link to={path}>http://localhost:3000{path}</Link>
  })
}

const Root = () => {

  const location = useLocation();
  const paths = location.pathname.split('/');
  const appContext: any = useContext(AppContext);

  const [engine, setEngine] = useState<string>("bootstrap3");

  const pages = useMemo(() => {
    return appContext.sites.map((ele) => {
      const site = ele.id;
      return indexBuilder(ele, "pages", site);
    })
  }, [appContext.sites])

  const content = useMemo(() => { return indexBuilder(appContext.content, "content"); }, [appContext.content])
  const data = useMemo(() => { return indexBuilder(appContext.data, "data"); }, [appContext.data])
  const sites = useMemo(() => { return indexBuilder(appContext.sites, "sites"); }, [appContext.sites])

  return (
    <div className="root-workspace">
      {paths[2] === 'env' ? <div className="index">
        <div>
          <h4>Sites</h4>
          {sites}
        </div>
        <div>
          <h4>Pages</h4>
          {pages}
        </div>
        <div>
          <h4>Content</h4>
          {content}
        </div>
        <div>
          <h4>Data</h4>
          {data}
        </div>
        <br />
      </div>
        : null}

      {paths[2] === 'site' ? <>
        <h4>Add a new Site</h4>
        <div className="form">
          <div>
            <label>Select Engine</label>
            <Combo name="engine" items={appContext.engines} value={engine} onChange={(e) => setEngine(e.target.value)} />
            <br />
            <label>Create site</label>
            <button onClick={() => appContext.addSite(engine)}>+</button>
          </div>
        </div>
      </>
        : null}

      {paths[2] === 'content' ? <>
        <h4>Add a new Content item</h4>
        <div className="form">
          <div>
            <label>Create Content item</label>
            <button onClick={() => appContext.addContent()}>+</button>
          </div>
        </div>
      </>
        : null}

      {paths[2] === 'data' ? <>
        <h4>Add a new Data item</h4>
        <div className="form">
          <div>
            <label>Create Data item</label>
            <button onClick={() => appContext.addData()}>+</button>
          </div>
        </div>
      </>
        : null}
    </div>
  )
}

export default Root;