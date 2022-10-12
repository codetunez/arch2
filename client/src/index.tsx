import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter as Router } from 'react-router-dom'
import { AppProvider } from './context/appContext';
import Shell from './shell'

//const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <AppProvider>
    <Router>
      <Shell />
    </Router>
  </AppProvider>, document.getElementById('root')
);