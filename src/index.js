import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Footer} from './StaticContent';
import './slate.css';
import './styles.css';

console.log("index.js init");

ReactDOM.render(
  
  <App />,
  document.getElementById('root')
);

ReactDOM.render(
  
  <Footer />,
  document.getElementById('footer')
);