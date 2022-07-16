import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/app';

import { initializeIcons } from '@fluentui/font-icons-mdl2';
initializeIcons();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);