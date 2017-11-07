import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Users from './Users';

export class Register extends Component {

	constructor(props) {
    super(props);
    this.email="";
    this.password="";
    
  }

  changeEmail = ev => this.email = ev.target.value;
  changePassword = ev => this.password = ev.target.value;
  
  submitForm(){
    var users = new Users();
    users.CreateUser(this.email, this.password).then(res => {
      console.log("user res", res);
    })
    .catch(err => console.log("user err", err));
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
                <Link to="login">
                  Have an account?
                </Link>
              </p>

              <form>
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
              </form>
            </div>

          </div>
        </div>
			</div>
		)
	}
}