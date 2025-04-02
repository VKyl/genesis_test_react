# Test chat app
#### Credentials: Viktor Kyliukh 

Start the app with Docker desktop from root directory:
```bash
npm run start
```
Or
Docker Engine:
```bash
npm run start-docker-engine
```

> ## **⚠️ IMPORTANT️**
> #### Create you own .env file with ports and links (look up in .env.example)

# About the solution:

App is containerized with Docker, and consists of 3 images:

> - mongodb (for Database)
> - server (Node.js part)
> - ui-server (React part)

## Backend:

As was asked in the requirements:

> - Node.js
> - Socket.io 

I decided to use DB for storing data, 
my choice was MongoDB because that's 
easy for storing and retrieving data. 
So I needed an extra library `mongoose` and also
I've added `TypeScript` to **Node.js** for better 
control on types and express for REST API.

### All of my services are in `/services` folder, a bit about them:

I decided to separate the DB interactions into a
singleton class `DatabaseService()` either with `SessionService()`

Also, bots and creating chats as new user appears made in way, 
that they could be easily utilized without breaking the main logic

## Frontend

Queries are done using useQuery hook from `react-query`
For post calls used axios, and for notifications about updates
socket.io-client

## About chats and bots

At each new session new bots are created (this was done intentionally,
to show offline/online feature).

And each time new `USER`authenticates, server creates new chats with `EVERY` 
user that was created before

Some realisations were intentionally left unoptimised due to the lack of time
I could've improve chat list update (without refreshing all chats in the list)
