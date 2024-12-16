NOTES API

CRUD - endpoints operation backend only 
Using AWS Lambda, API Gateway, DynamoDB, and Middy middleware for authentication and authorization.

FOR SIGN UP / LOGIN POST

Use Insomnia or Postman, first posting with sign up endpoints and then post with login endpoint.
You will receive an authentication token for the user.

Request Body:

{
  "username": "your_username",
  "password": "your_password"
}

Response:

{
	"message": "User created successfully"
}

