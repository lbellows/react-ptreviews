import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Footer} from './StaticContent';
import './css/slate.css';
import './css/styles.css';
import 'react-app-polyfill/ie11';

console.log("index.js init");

ReactDOM.render(
  
  <App />,
  document.getElementById('root')
);

ReactDOM.render(
  
  <Footer />,
  document.getElementById('footer')
);