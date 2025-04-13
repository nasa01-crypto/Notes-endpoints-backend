**NOTES API with AWS configure**

CRUD (Create - Read - Update - Delete) endpoints operation backend only using AWS and Middleware for authentication and authorization.

In Insomnia or Postman, first post with sign up endpoint and then login with login endpoint. You will receive an authentication token for the user. 
Copy the token to the Auth section and choose Bearer Token as auth type to continue with the rest of the operations.

**POST-endpoint SIGN UP**

`Request Body:`

```bash```

<pre>

{
	
 "username": "your_username",
 "password": "your_password"
	
} 
</pre>



`Response:`

<pre>

{
  "message": "User created successfully"	
}

</pre>

**POST-endpoint LOGIN**

`Request Body:`

<pre>

{
	
  "username": "your_username",
  "password": "your_password"
	
}

</pre>

`Response:`

<pre>
	
{
  "token": "ey----------->"
}

</pre>

**POST-endpoint Add Notes**

`Request Body:`

<pre>

{
	
  "title": "My First Note",
  "text": "This is the content of the note"
	
}

</pre>

`Response:`

<pre>
{
	
  "id": " ",
  "username": "your_username",
  "title": "My First Note",
  "text": "This is the content of the note",
  "createdAt": "2024-12-16T13:39:40.730Z",
  "modifiedAt": "2024-12-16T13:39:40.730Z"
	
}

</pre>

**PUT-endpoint Update Notes**

`Request Body:`

<pre>
	
{ 

  "id": "	", 
  "title": "Updated Title", 
  "text": "Updated content" 
	
}

</pre>

`Response:`

<pre>

{
	
  "createdAt": "2024-12-16T13:39:46.248Z",
  "modifiedAt": "2024-12-16T13:40:39.867Z",
  "text": "Updated content",
  "username": "your_username",
  "id": " ",
  "title": "Updated Title"
	
}

</pre>
	
**GET-endpoint Get Notes**

<pre>Empty request body </pre>


**DELETE-endpoint Delete Notes**

`Request Body:`
<pre>
{ 
 "id": " "
}
</pre>

`Response:`
<pre>
{
  "message": "Note deleted successfully"
}
</pre>

`HTTP / JSON response:`
<pre>
200 <br>
201 <br>
400 <br>
401 <br>
404 <br>
409 <br>
500 <br>
</pre>


