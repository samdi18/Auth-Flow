### Auth Flow Service

A simple auth flow service completed with user and auth apis based on jwt token

#### Features

- A user route endpoint to register a user. After successful registration, server returns a jwt token

- A auth route to login a user which is authenticated with the user token

- A get auth route to get user object by using user token.

#### Running the Project

- `npm install`

- This starts the server in port `5000`: `npm run start`

#### The Structure

```
server.js <-- entry point for node to connect to database and listen
for incoming requests

Also has the routes to the API
server <-- root folder for all functionalities

| - config <-- all server specific config resides here
  | - db.js  < -- connects to the db with mongoose.
  | - default.json < -- mongodb URI and jwt secret here

| - models < -- for api resource which need model schema
  | - User.js < -- Model for user login and register

| - middleware <-- for code to run between request and responses
    | -auth.js <-- for private routes to check for token in the header
                   and verify the jwt token


| - controller <-- contains all controller functions for the route handlers
  | - userController.js <-- registerU function
  | - authController.js <-- loginUser function and getUserByToken function


| - routes <-- contains all the route handlers/ incoming requests
              and passes to the right controller function
  | - userRoute.js <-- contains a POST to api/user to register a user
  | - authRoute.js <-- contains a POST to api/auth to login a user
                    & a GET private route to api/auth to get a user

| - test <-- for unit testing
   | - user.test.js
   | - auth.test.js
```

#### Exposing a new API Resource

- Create a file route in the route folder e.g post.js and specify all the route handlers here for all end points

- Create another file in the controller folder which contains all the functionalities like db access logic and more to control the incoming requests to the new API resource

- Finally register your api to the base api routing at `server.js`

- To know more, please take a look at the given sample api documentation

#### Other Important Commands

- To run tests: `npm run test`

### API documenttion

## Register User

Returns user token as an object

- URL
  /api/users

- Method
  POST

- URL parameter
  none
- Data parameter
  Content-Type: application/json,
  {
  ‘name’: ‘Test’,
  ‘email’: ‘test@gmail.com’,
  ‘password’: ‘test123’
  }
- Success Response
  Code: 200,
  Content:
  {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYwOGIwMzQ2NzYzYmQyYTZjNmQ1MDc4In0sImlhdCI6MTU5NDQ2MTA5NCwiZXhwIjoxNTk0ODkzMDk0fQ.hl0lTs56Ne6nbERkg-efAeT4XgfwdJoL-Di8358wev4"
  }
- Error Response
  Code: 500
  Content: “Server Error”

## Login User

Returns existing user token as an object

- URL
  /api/auth

- Method
  POST

- URL parameter
  None

- Headers
  Content-Type: application/json,

- Data parameter
  {
  ‘email’: ‘test@gmail.com’,
  ‘password’: ‘test123’
  }
- Success Response
  Code: 200,
  Content:
  {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYwOGIwMzQ2NzYzYmQyYTZjNmQ1MDc4In0sImlhdCI6MTU5NDQ2MTA5NCwiZXhwIjoxNTk0ODkzMDk0fQ.hl0lTs56Ne6nbERkg-efAeT4XgfwdJoL-Di8358wev4"
  }
- Error Response
  Code: 500
  Content: “Server Error”

## Get User by Token

Returns user as an object

- URL
  /api/auth

- Method
  GET

- URL parameter
  None

- Headers
  Content-Type: application/json,
  x-auth-token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYwOGIwMzQ2NzYzYmQyYTZjNmQ1MDc4In0sImlhdCI6MTU5NDQ2MTA5NCwiZXhwIjoxNTk0ODkzMDk0fQ.hl0lTs56Ne6nbERkg-efAeT4XgfwdJoL-Di8358wev4"

= Data parameter
None

- Success Response
  Code: 200,
  Content: {
  "\_id": "5f08b0346763bd2a6c6d5078",
  "name": "test",
  "email": "test@gmail.com",
  "date": "2020-07-10T18:15:16.876Z",
  "\_\_v": 0
  }
- Error Response
  Code: 500
  Content: “Server Error”
