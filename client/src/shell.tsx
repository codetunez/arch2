import './shell.css';
import * as React from 'react';
import { Routes, Route } from "react-router-dom";

import { AppContext } from './context/appContext';

import Nav from './components/nav';
import Header from './components/header';

import Page from './pages/page';
import Content from './pages/content';
import Site from './pages/site';

const Shell = () => {

    const appContext: any = React.useContext(AppContext);

    return (
        <div className="shell">
            <div className="header"><Header /></div>
            <div className="content">
                <div className="navigation"><Nav sites={appContext.sites} content={appContext.content} /></div>
                <div className="workspace">
                    <Routes>
                        <Route path="/site/*" element={<Site />}></Route>
                        <Route path="/content/*" element={<Content />}></Route>
                        <Route path="/page/*" element={<Page />}></Route>
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Shell;