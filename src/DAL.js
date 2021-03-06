import {DynamoDB}from 'aws-sdk';
import awsconfig from './config/awsconfig.json';

//TODO: This goes in Lambda, replace with something that calls the endpoint
export default class DAL{

  constructor(){
    //TODO: move this into AWS lambda
    this.DB_TABLES = {reviews: 'Reviews', comments: 'Comments', users: 'Users'};
    //AWS.config.update(awsconfig);
    //this.db = new AWS.DynamoDB();
    this.client = new DynamoDB.DocumentClient(awsconfig);
  }

  GetAll(table){
    var params = {
      TableName: table,
    };

    return this.client.scan(params).promise();
  }

  GetCommentsById(val){
    var params = {
      TableName: 'Comments',
      FilterExpression: 'reviewId = :rev_id',
      ExpressionAttributeValues: {':rev_id' : val}
    };

    return this.client.scan(params).promise();
  }

  Get(id, table){
    var params = {
      TableName : table,
      Key: {'id': id}
    };
    return this.client.get(params).promise();
  }

  Save(data, table){
    //data['Key'] = {'id': data.id};

    var params = {
      TableName : table,
      Item: data
    };

    return this.client.put(params).promise();
  }

}