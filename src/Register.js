import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Users from './Users';

export class Register extends Component {

	constructor(props) {
    super(props);
    this.email="";
    this.password="";
    this.state = {registered: false}
  }

  changeEmail = ev => this.email = ev.target.value;
  changePassword = ev => this.password = ev.target.value;
  
  submitForm(){
    var users = new Users();
    users.CreateUser(this.email, this.password).then(res => {
      this.setState({registered: true, message: res.$response.error || "Success!"});
    })
    .catch(err => this.setState({message: err.message}));
  }

  GetView(){
    if(!this.state.registered){
      return (
      <fieldset>
      <fieldset className="form-group">
        <input
          className="form-control form-control-lg"
          type="email"
          placeholder="Email"
          onChange={this.changeEmail} />
      </fieldset>
      <fieldset className="form-group">
        <input
          className="form-control form-control-lg"
          type="password"
          placeholder="Password"
          onChange={this.changePassword} />
      </fieldset>
      <button
        className="btn btn-lg btn-primary pull-xs-right"
        type="button"
        onClick={() => this.submitForm()}>
        Register
      </button>
      </fieldset>
      );
    }

    return(
        <div>
        
        <button type="button" onClick={() => this.setState({registered: false, message: ""})}
          className="btn btn-default form-control">OK
        </button>
        </div>
    );
  }

  //TODO: Goto success screen after register
  //TODO: Create generic success with a LinkTo param, with referred page, etc...
	render(){
		return(
			<div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login">
                  Have an account?
                </Link>
              </p>
              <div>
                {this.state.message}
              </div>
              <form>
                {this.GetView()}
              </form>
            </div>

          </div>
        </div>
			</div>
		)
	}
}