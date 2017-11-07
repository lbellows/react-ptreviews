import * as AWS from 'aws-sdk';
import awsconfig from './awsconfig.json';

export default class Users {

  constructor(){
    this.cog = new AWS.CognitoIdentityServiceProvider();
    this.user = new AWS.CognitoIdentityServiceProvider().user
  }

  CreateUser(email, password){
    var params = {
      ClientId: awsconfig.appClientId,
      Password: password,
      Username: email,
      UserAttributes: [
        {
          Name: 'email', 
          Value: email
        },
      ]
    };

    /*
    var poolData = { 
      UserPoolId : awsconfig.poolId,
      ClientId : awsconfig.appClientId
    };
    var cog = new AWS.CognitoIdentityServiceProvider(poolData);
    */
    return this.cog.signUp(params).promise();
  }

  ConfirmUser(){
    this.cog.getUser().promise().then(res => res);
    this.cog.confirmSignUp();
  }

  SignIn(){
    this.cog.initiateAuth()
  }
}