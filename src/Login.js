import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import Users from './Users';

export default class Login extends Component{

  constructor(props){
    super(props);
    this.state = {LoggedIn: props.LoggedIn, isConfirmed:true};
    this.users = new Users();
    
  }

  /*
  SignIn(){
    this.users.SignIn(this.email, this.password).then(res => {
      console.log("user res", res);
      this.props.history.push("/reviews")
    })
    .catch(err => {
      this.setState({message: err.message});
      if(err.code === "UserNotConfirmedException"){
        this.setState({isConfirmed: false});
      }
    });
  }
*/
  ConfirmUser(){
    this.users.ConfirmUser(this.email, this.confirmation).then(res => {
      this.setState({message: "Login", isConfirmed: true});
    })
    .catch(err => {
      console.log("user res2", err);
      this.setState({message: err.message});
      if(err.code === "CodeMismatchException"){
        console.log("user res3", err);
      }
    });
  }

  render(){
    console.log('login', this.props)
    return(
      <div>
        <Link to="/register">Need to register? Click!</Link>
        <p>
          {this.state.message}
        </p>
        <div className="sign-in form-inline">
        { 
          (!this.state.LoggedIn) && 
          <span>
          <input placeholder="email" className="form-control" 
            onChange={(event) => this.email = event.target.value} 
          />
          <input type="password" placeholder="password" className="form-control" 
            onChange={(event) => this.password = event.target.value} 
          />
          <button className="btn btn-primary" type="button" onClick={() => this.props.actions.doLogin(this.email, this.password)}>Signin</button>
          </span>
        }

        {
          ( !this.state.isConfirmed ) &&
          <div>
          <input placeholder="code" className="form-control" 
            onChange={(event) => this.confirmation = event.target.value} 
          />
          <button className="btn btn-primary" type="button" onClick={() => this.ConfirmUser()}>Confirm</button>
          </div>
        }

        {
          (this.state.isConfirmed && this.state.LoggedIn) && 
          ("This could be user profile")
        }
          
        </div>
      </div>
    );
  }
}