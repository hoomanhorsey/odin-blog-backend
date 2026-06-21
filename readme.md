## API endpoints

API serves JSON. UI and forms are handled by front end application.

POST /auth/signup
Request: { username: string, email: string, password: string }
Response: 201 Created | 500 Error

POST /auth/login
Request: { email: string, password: string }
Response: 200 OK { message: string, token: string } | 401 Unauthorized | 400 Bad Request | 500 Error

POST /auth/logout
Request: (empty body)
Response: 200 OK { message: "Logged out successfully" } | 500 error { error: "Logout failed'}

GET /posts/:id
Request: (no body required) | Path parameter: id (number)
Response: 200 OK { post object with id, content, author, createdAt, ... } | 404 Not Found | 500 Error

GET /posts

- Returns all posts
- Response: 200 OK with array of post objects

DELETE /posts/:id
Archives (soft-deletes) a post. The post data remains in the database
but is removed from public view. Only the post author or an admin can archive.
Response: 200 OK | 403 Forbidden | 404 Not Found | 500 Error
