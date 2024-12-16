NOTES API

CRUD - endpoints operation backend only 
Using AWS Lambda, API Gateway, DynamoDB, and Middleware for authentication and authorization.

In Insomnia or Postman, first post with sign up endpoint and then with login endpoint.
You will receive an authentication token for the user. Copy the token to the Auth section and choose Bearer Token as auth type before continuing with adding notes etc.

POST SIGN UP 

Request Body:

{
  "username": "your_username",
  "password": "your_password"
}

Response:

{
	"message": "User created successfully"
}

POST LOGIN

Request Body:

{
  "username": "your_username",
  "password": "your_password"
}

Response:

{
	"token": "ey----------->"
}

POST Add Note

Request Body:

{
  "title": "My First Note",
  "text": "This is the content of the note"
}

Response:

{
	"id": " ",
	"username": "Your username",
	"title": "My First Note",
	"text": "This is the content of the note",
	"createdAt": "2024-12-16T13:39:40.730Z",
	"modifiedAt": "2024-12-16T13:39:40.730Z"
}
