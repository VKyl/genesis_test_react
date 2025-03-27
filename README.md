# Test chat app
#### Credentials: Viktor Kyliukh 

Start the app with Docker desktop from root directory:
```bash
docker compose up --build
```
Or
Docker Engine:
```bash
docker-compose up --build
```
## To view the Frontend: [click this link](http://localhost:5173)

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
control on types.

### All of my services are in `/services` folder, a bit about them:

I decided to separate the DB interactions into a separate
singleton `DatabaseService()`

