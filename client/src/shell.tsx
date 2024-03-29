import './shell.css';
import * as React from 'react';
import { Routes, Route } from "react-router-dom";

import { AppContext } from './context/appContext';

import Nav from './components/nav';
import Header from './components/header';

import Page from './pages/page';
import Content from './pages/content';
import Site from './pages/site';
import Root from './pages/root';
import Data from './pages/data';

const Shell = () => {

    const appContext: any = React.useContext(AppContext);

    return (
        <div className="shell">
            <div className="header"><Header /></div>
            <div className="content">
                <div className="navigation"><Nav sites={appContext.sites} content={appContext.content} data={appContext.data} /></div>
                <div className="workspace">
                    <Routes>
                        <Route path="/sites/*" element={<Site />}></Route>
                        <Route path="/content/*" element={<Content />}></Route>
                        <Route path="/pages/*" element={<Page />}></Route>
                        <Route path="/data/*" element={<Data />}></Route>
                        <Route path="/root/*" element={<Root />}></Route>
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Shell;