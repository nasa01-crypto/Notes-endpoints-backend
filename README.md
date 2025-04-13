NOTES API

CRUD - endpoints operation backend only 
using AWS and Middleware for authentication and authorization.

In Insomnia or Postman, first post with sign up endpoint and then login with login endpoint. You will receive an authentication token for the user. 
Copy the token to the Auth section and choose Bearer Token as auth type to continue with the rest of the operations.

POST SIGN UP 

Request Body:

<pre> ```

{
  "username": "your_username",
  "password": "your_password"
}``` 
</pre>


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

POST Add Notes

Request Body:

{
  "title": "My First Note",
  "text": "This is the content of the note"
}

Response:

{
	"id": " ",
	"username": "your_username",
	"title": "My First Note",
	"text": "This is the content of the note",
	"createdAt": "2024-12-16T13:39:40.730Z",
	"modifiedAt": "2024-12-16T13:39:40.730Z"
}

PUT Update Notes

Request Body:

{ 
"id": "	", 
"title": "Updated Title", 
"text": "Updated content" 
}

Response:

{
	"createdAt": "2024-12-16T13:39:46.248Z",
	"modifiedAt": "2024-12-16T13:40:39.867Z",
	"text": "Updated content",
	"username": "your_username",
	"id": " ",
	"title": "Updated Title"
}

GET Get Notes

Empty request body 


DELETE Delete Notes

Request Body:

{ 
	"id": " "
}

Response:

{
	"message": "Note deleted successfully"
}

HTTP / JSON response:

200 
201 
400
401 
404 
409 
500 


