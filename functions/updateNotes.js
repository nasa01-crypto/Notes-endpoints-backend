const middy = require('@middy/core');
const httpErrorHandler = require('@middy/http-error-handler');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const { authMiddleware } = require('../middleware/authMiddleware');  // Korrigerad för CommonJS
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const updateNotesHandler = async (event) => {
  const { id, title, text } = event.body;
  const username = event.user.username;

  if (!id || !title || !text || title.length > 50 || text.length > 300) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid input' }),
    };
  }

  const params = {
    TableName: process.env.NOTES_TABLE,
    Key: { id },
    UpdateExpression:
      'set title = :title, #txt = :text, modifiedAt = :modifiedAt',
    ConditionExpression: 'username = :username',
    ExpressionAttributeNames: {
      '#txt': 'text',
    },
    ExpressionAttributeValues: {
      ':title': title,
      ':text': text,
      ':modifiedAt': new Date().toISOString(),
      ':username': username,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await dynamoDb.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    console.error('Error updating note:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not update note', details: error.message }),
    };
  }
};

module.exports.updateNotes = middy(updateNotesHandler)
  .use(httpJsonBodyParser())  
  .use(httpErrorHandler())    
  .use(authMiddleware()); 
