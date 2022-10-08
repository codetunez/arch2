import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter as Router } from 'react-router-dom'
import { AppProvider } from './context/appContext';
import Shell from './shell';


// MSAL imports
import { PublicClientApplication, EventType, EventMessage, AuthenticationResult } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

export const msalInstance = new PublicClientApplication(msalConfig);

// Account selection logic is app dependent. Adjust as needed for different use cases.
const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
        const payload = event.payload as AuthenticationResult;
        const account = payload.account;
        msalInstance.setActiveAccount(account);
    }
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
{/*   
 <AuthenticatedTemplate> */}
  <AppProvider>
    <Router>
      <Shell pca={msalInstance}/>
    </Router>
  </AppProvider>
{/*  
 </AuthenticatedTemplate> */}
{/* 
 <UnauthenticatedTemplate>
   <h6>Please sign-in to see your profile information.</h6>
 </UnauthenticatedTemplate> */}
</>

);