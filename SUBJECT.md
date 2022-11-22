# Node.js with TypeScript

## Context

Your front-end team need's a new API on top of GitHub API to add custom functionnalities to the website they have been working on for 3 months.

As you once said, while have a coffee break with your workmates, that you did an API back in 1998, the project manager asked you to make this new API.

The team created some task for you that you need to do in order to help them.

The client requires that this API **must** be done in Node.js. Since you are a big fan of static typing, you decide to use TypeScript.

So, here you are, starting your journey to the wonderful world of TypeScript.

## Requirements

- The project must be realised in Node.js 12, with Typescript 4.
- You should use Fastify framework to build the API.
- You should use Axios library to call GitHub API.
- You shouldn't need to add any library to the project.
- You can add libraries for bonus points, make sure to use `npm to install them.
- You shouldn't need a GitHub API key, all the GitHub API called in the subject are public.
- *All bonus points*, if you do bonus points, should be realised in the order given in the subject.
- Bonus points will not be taken into account if the subject is not complete.

## Getting started

- Clone this repository
- Use `npm install` to install dependencies
- Use `npm start` to run the project
- Open `http://127.0.0.1:3000/api` url in your browser.
- You should see `Hello, friend`
- Open the root folder of this project with your IDE and you are ready to work !

**Links**
- (TypeScript documentation)[https://www.typescriptlang.org/docs]
- (GitHub API documentation)[https://developer.github.com/v3/]

## How to read tasks

For each task, a small description will be given.

You should add endpoint - or webservices - to your API if you have the **WS** text in requirements for the task
```
WS: /api
^ This means you have to implement something that will print something when browsing http://127.0.0.1:5000/api
```

You should add a path parameter if the **WS** text contains a name between brackets `[]`
```
WS: /api/[username] ( )
^ This means it should work when browsing http://127.0.0.1:5000/api/lucas or http://127.0.0.1:5000/api/appstud
^ lucas or appstud in the exemple are the `[username]` in the URL.
```

You should add a query parameter to your API if you have the **Parameter** text in requirements for the task
```
Parameters:
    name = (description of the parameter)
^ This means it should work when browsing http://127.0.0.1:5000/api?name=lucas or http://127.0.0.1:5000/api?name=appstud
^ lucas or appstud in the exemple are the `name` parameter you need to implement.
```

Your WS should return the same content as specified in **Response** in requirements for the task
```
Response:
    {
        "name": "hello",
        "time": (timestamp)
    }
^ This should be printed when browsing the WS associated with the task
^ We will not care about the newline, response can be with or without new line.
^ It should be a valid JSON, unless explicitly specified
^ Parenthesis in values is descripting the expected value. Here your WS will return the time in milliseconds instead of the (timestamp) word
```

## Fun time

### TASK-1001: Healthcheck endpoint

We need to endpoint to check if the API is alive.

**WS**: /api/healthcheck

**Response**:
```json
{
    "name": "github-api",
    "version": "1.0",
    "time": (timestamp)
}
```

### TASK-1002: Add a tiny easter egg

We usually add easter egg(s) in the end of a project ... but you couldn't resist ...

**WS**: /api/timemachine/logs/mcfly

**Response**:
```js
[
    {
        "name": "My mom is in love with me",
        "version": "1.0",
        "time": -446723100
    },
    {
        "name": "I go to the future and my mom end up with the wrong guy",
        "version": "2.0",
        "time": 1445470140
    },
    {
        "name": "I go to the past and you will not believe what happens next",
        "version": "3.0",
        "time": -(Maximum Long Value)
    }
]
```

### TASK-1003: Register user

We need an endpoint to register an user.

We should probably store this somewhere in the code. It can be in memory for now (see task ##BONUS-1003 for better storage solution later).

**WS**: /api/users/register

**Parameters**:
- username = Login for the user account
- password = Password for the user account

**Response**:
```js
{
    "username": (username parameter should be here)
    "token": (a randomly created string)
}
```

### TASK-1004: List registered users

We need an endpoint to list users.

**WS**: /api/users

**Response**:
```js
[
    {
        "username": (username)
    },
    /* ... other users ... */
]
```

### TASK-1005: Login user

We need an endpoint to login a user.

This endpoint should return a **new** access token.

**WS**: /api/users/login

**Parameters**:
- username = Login for the user account
- password = Password for the user account

**Response**:
```js
{
    "username": (username),
    "token": (new randomly generated token)
}
```

### TASK-1006: Get connected user

We need an endpoint to retrieve the connected user.

**WS**: /api/users/me

**Parameters**:
- token = Token retrieved on login / register

**Response**:
```js
{
    "username": (username)
}
```

### TASK-1007: GitHub endpoint to retrieve feed

We want to have a GitHub activity feed. You can use `/events` GitHub API endpoint.

**Don't forget** to look at the (GitHub API documentation)[https://developer.github.com/v3/].

Request will fail with a 403 by default. Something is required by the GitHub API (and it's not a token).

**WS**: /api/github/feed

**Response**:
```js
[
    {
        "type": "PullRequestReviewCommentEvent",
        "actor": {
            "id": 6668460,
            "login": "jkotas"
        },
        "repo": {
            "id": 30092893,
            "name": "dotnet/coreclr"
        }
    },
    /* ... more events ... */
]
```

### TASK-1008: GitHub endpoint to retrieve a public user with login

We want to have an endpoint to retrieve GitHub user informations.

**WS**: /api/github/users/[actor_login]

**Response**:
```js
{
    "id": (id),
    "login": (login),
    "avatar": (avatar_url),
    "details": {
        "public_repos":	(user public repositories)
        "public_gists":	(user public gists)
        "followers": (user follower number)
        "following": (user following number)
    }
}
```

# Bonus points

### BONUS-1001: A correct exception handling system

We didn't handled exceptions in our program. It could be cool if the API had a real exception management strategy.

### BONUS-1002: Caching system for GitHub API

We could add a caching system on GitHub endpoints.

### BONUS-1003: Add a database system

Remember that our users are registered and stored in-memory ? In-memory means that if we reload the server, we don't have users registered anymore.

It might be great to plug a database, or use a database like SQLite which stores the data into a file.

### BONUS-1004: Make a frontend for the API - served by this same server

Choose whatever HTML / JS library and build a tiny web application to use the API.

The only requirement is that the application should be served by this program in Node.js.

You can go nuts on this one ;)
