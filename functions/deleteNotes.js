const middy = require('@middy/core');
const httpErrorHandler = require('@middy/http-error-handler');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const { authMiddleware } = require('../middleware/authMiddleware');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const deleteNotesHandler = async (event) => {
  // Extrahera id från event.body
  const { id } = event.body;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid input, note ID is required' }),
    };
  }

  const username = event.user.username;

  const params = {
    TableName: process.env.NOTES_TABLE,
    Key: { id },
    ConditionExpression: 'username = :username', 
    ExpressionAttributeValues: {
      ':username': username,
    },
  };

  try {

    await dynamoDb.delete(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Note deleted successfully' }),
    };
  } catch (error) {
    console.error('Error deleting note:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not delete note', details: error.message }),
    };
  }
};


module.exports.deleteNotes = middy(deleteNotesHandler)
  .use(httpJsonBodyParser())  
  .use(httpErrorHandler())    
  .use(authMiddleware());     