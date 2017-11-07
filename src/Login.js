import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Users from './Users';

export default class Login extends Component{

  constructor(props){
    super(props);
    this.state = this.props.loggedIn || {loggedIn:false};
    this.users = new Users();
  }

  SignIn(){
    this.users.CreateUser(this.email, this.password).then(res => {
      console.log("user res", res);
    })
    .catch(err => console.log("user err", err));
  }

  render(){
    return(
      <div>
        <Link to="register">Register?</Link>
        <div className="sign-in form-inline">
          <input placeholder="email" className="form-control" 
            onChange={(event) => this.email = event.target.value} 
          />
          <input placeholder="password" className="form-control" 
            onChange={(event) => this.password = event.target.value} 
          />
          <button className="btn btn-primary" type="button" onClick={() => this.SignIn()}>Signin</button>
        </div>
      </div>
    );
  }
}