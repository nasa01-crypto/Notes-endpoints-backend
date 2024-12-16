const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.signUp = async (event) => {
  console.log('Event received:', JSON.stringify(event, null, 2));
  const { username, password } = JSON.parse(event.body);

  if (!username || !password) {
    console.error('Validation error: Username or password missing');
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Username and password are required' }),
    };
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const params = {
    TableName: 'ACCOUNTS_TABLE',
    Item: {
      id: uuidv4(),
      username,
      password: hashedPassword,
    },
  };

  try {
    console.log('Saving user to DynamoDB:', params);
    await dynamoDb.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'User created successfully' }),
    };
  } catch (error) {
    console.error('Error saving user:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not create user', details: error.message }),
    };
  }
};
