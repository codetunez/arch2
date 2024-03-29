import './header.css';
import * as React from 'react';

import { AppContext } from '../context/appContext';

const Header = () => {

    const appContext: any = React.useContext(AppContext);

    return (
        <div className="header">
            <a href="http://localhost:3000/"><h1>Arch II PoC</h1></a>
            <button className={appContext.refreshRuntime ? "btn-sm btn-warning" : "btn-sm"} onClick={() => appContext.runtimeRefresh()}>Refresh Server</button>
        </div>
    )
}

export default Header;