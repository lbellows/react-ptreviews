import * as AWS from 'aws-sdk';
import awsconfig from './awsconfig.json';

export class Users {
  CreateUser(data){
    var serv = new AWS.CognitoIdentityServiceProvider();
    serv.signUp(data);

  }
}