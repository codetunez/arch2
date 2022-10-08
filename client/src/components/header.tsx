import './header.css';
import * as React from 'react';

import { AppContext } from '../context/appContext';
import WelcomeName from './WelcomeName';
import SignInSignOutButton from './SignInSignOutButton';
import { initDataverseConnection } from './connection';

const Header = () => {

    const appContext: any = React.useContext(AppContext);
    const [DataverseConnText, setDataverseConnText] = React.useState('Connect to Dataverse');

    const DataverseConnectionBtnOnClick  = () => {
        initDataverseConnection().then(()=> setDataverseConnText('Connected')).catch(() => setDataverseConnText('Connect to Dataverse'));
    }

    return (
        <div className="header">
            <a href="http://localhost:3000/"><h1>Arch II PoC</h1></a>
            <div className="headerOptions">
            <button className={appContext.refreshRuntime ? "btn-sm btn-warning" : "btn-sm"} onClick={() => appContext.runtimeRefresh()}>Refresh Server</button>
            <button className="btn-sm" onClick={DataverseConnectionBtnOnClick}>{DataverseConnText}</button>
            <WelcomeName/>
            <SignInSignOutButton/>
            </div>
        </div>
    )
}

export default Header;