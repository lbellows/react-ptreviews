import { CognitoIdentityServiceProvider, CognitoIdentity } from 'aws-sdk';
import awsconfig from './config/awsconfig.json';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';


//TODO: This goes in Lambda, replace with something that calls the endpoint
export default class Users {

  poolData = {
    UserPoolId : awsconfig.poolId,
    ClientId : awsconfig.appClientId 
  };

  constructor(){
    this.cog = new CognitoIdentityServiceProvider();
    this.user = new CognitoIdentity();
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

    return this.cog.signUp(params).promise();
  }

  ConfirmUser(user, code){

    return new Promise((res, rej) => {
      var userPool = new CognitoUserPool(this.poolData);
      var userData = {
          Username : user,
          Pool : userPool
      };

      var cognitoUser = new CognitoUser(userData);
      cognitoUser.confirmRegistration(code, true, rej, res);
    });
  }

  SignIn(user, pass){
    var authenticationData = {
      Username : user,
      Password : pass,
    };

    return new Promise((res, rej) => {
      var authenticationDetails = new AuthenticationDetails(authenticationData);

      var userPool = new CognitoUserPool(this.poolData);
      var userData = {
          Username : user,
          Pool : userPool
      };

      var cognitoUser = new CognitoUser(userData);
    
      cognitoUser.authenticateUser(authenticationDetails,{
        onSuccess: res,
        onFailure: rej
      });
    });
     
    //{
    //    onSuccess: function (result) {
            //console.log('access token + ' + result.getAccessToken().getJwtToken());

            //POTENTIAL: Region needs to be set if not already set previously elsewhere.
            //AWS.config.region = '<region>';

            //need to add write to dynamo DB permissions in IAM
            //AWS.config.credentials = new AWS.CognitoIdentityCredentials();
            //return result;
              /*{
                IdentityPoolId : '...', // your identity pool id here
                Logins : {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>' : result.getIdToken().getJwtToken()
                }
            });*/

            // Instantiate aws sdk service objects now that the credentials have been updated.
            // example: var s3 = new AWS.S3();

        //}
    //}).promise();
  }
}