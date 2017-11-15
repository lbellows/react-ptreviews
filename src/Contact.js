import React, { Component } from 'react';
import Configjson from './config.json'
import { SNS, CognitoIdentityCredentials, config} from 'aws-sdk';

export default class Contact extends Component {
  
    constructor(props){
      super(props);
      this.domain = window.location.hostname;
      this.state = {new: true, message: ""};
      
      
    }
  
    Send(){
      
      config.region = 'us-east-1';
      var snsConfig = new CognitoIdentityCredentials({
        IdentityPoolId: Configjson.poolId,
        //region: 'us-east-1'
      });
      config.credentials = snsConfig;

      var service = new SNS();
  
      var params = {
          Message: document.getElementById('msg').value,
          Subject: this.domain + ': Message',
          TopicArn: Configjson.topicArn
      }
  
      service.publish(params, (err, data) => {
          if (err){
            console.log(err);
            this.setState({new: false, message: "Sorry there was an error!"});
          }
          else{
            this.setState({new: false, message: "Thank you for your email!"});
          }
      });
    }
  
    render(){
      var display = <div></div>;
      if(!this.state.new){
        display = (
          <h3 className="col-sm-6 col-sm-offset-4">{ this.state.message}</h3>
        ) 
      }
      else if(this.state.new){
        display = (
        <form id="form">
              <div className="form-group col-sm-8 col-sm-offset-2">
                  <h2>Contact me about domain:</h2>
                  <textarea name="msg" id="msg" placeholder="Type your message and contact info." className="form-control"></textarea>
                  <button type="button" onClick={() => this.Send()} className="btn btn-primary form-control">Send</button>
              </div>
        </form>
        )
      }
  
      return(
        <div className="row">
          {display}
        </div>
      );
    }
  }