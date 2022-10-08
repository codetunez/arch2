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


// MSAL imports
import { MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";


type AppProps = {
    pca: IPublicClientApplication
};

const Shell = ({ pca }: AppProps) => {

    const appContext: any = React.useContext(AppContext);
// The next 3 lines are optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
//const history = useHistory();
//const navigationClient = new CustomNavigationClient(history);
//pca.setNavigationClient(navigationClient);


    return (
        <MsalProvider instance={pca}>
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
        </MsalProvider>
    )
}

export default Shell;