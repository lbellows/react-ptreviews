import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './slate.css'
import './styles.css'

function loadData(){
  return fetch('/db.json', {method:'GET'})
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      
     return {Users: data.users, Reviews: data.Reviews, CurrentReview: -1};
    });
}

loadData().then(data => {
  ReactDOM.render(
    <App {...data} />,
    document.getElementById('root')
  );
});


