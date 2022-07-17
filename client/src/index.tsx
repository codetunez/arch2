import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter as Router } from 'react-router-dom'
import { AppProvider } from './context/appContext';
import Shell from './shell'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <Router>
      <Shell />
    </Router>
  </AppProvider>
);