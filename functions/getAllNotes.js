const middy = require('@middy/core');
const httpErrorHandler = require('@middy/http-error-handler');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const { authMiddleware } = require('../middleware/authMiddleware'); 
const AWS = require('aws-sdk');


const dynamoDb = new AWS.DynamoDB.DocumentClient();

const getAllNotesHandler = async (event) => {
  console.log('Event received:', JSON.stringify(event, null, 2));

  const username = event.user?.username;
  console.log('Username from token:', username);


  if (!username) {
    console.error('Unauthorized request: No username in token');
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' }),
    };
  }


  const params = {
    TableName: process.env.NOTES_TABLE,
    FilterExpression: 'username = :username',
    ExpressionAttributeValues: {
      ':username': username,
    },
  };

  try {
    console.log('DynamoDB Query Params:', params);
    const result = await dynamoDb.scan(params).promise();

    if (!result.Items || result.Items.length === 0) {
      console.log('No notes found for user:', username);
      return {
        statusCode: 200,
        body: JSON.stringify([]),
      };
    }

    console.log('DynamoDB Query Result:', result.Items);
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error('Error fetching notes:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Could not fetch notes',
        details: error.message,
      }),
    };
  }
};

module.exports.getAllNotes = middy(getAllNotesHandler)
  .use(httpJsonBodyParser())  
  .use(httpErrorHandler())    
  .use(authMiddleware());    
