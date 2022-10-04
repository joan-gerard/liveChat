# Live Chat Websocket - AWS Serverless

We have created an API Gateway Websocket endpoint. The endpoint is then integrated with Lambda functions.

This has been built into a messaging platform, where users can create or join an existing room, and then send messages:

1. When the endpoint is hit, a user is invited to create a room by entering a username. 

2. A Lambda function will create a room number and record the connection (along with the room number) into a DynamoDB table.

3. As another user attempts to join that room (by entering username and an existing room number), a second Lambda will query the DynamoDB table and check that the room number that has been input exists before allowing the connection.

4. A third Lambda is in charge of broadcasting messages to other users present in the room.

5. When a user leaves the room, a fourth Lambda will remove the connection from the database.

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

### Live demo

There is a deployed basic MVP [here](https://ornate-dasik-ba5372.netlify.app/)

### Project structure
```
.
├── serverless                  # Folder holding extra serverless configuration
│   ├── dynamoResources         # DynamoDB table configuration 
│   └── functions               # config pointing to handlers websocket routes 
├── src
│   ├── functions               # Folder containing lambda fn 
│   │   ├── createRoom
│   │   │   └── index.ts        # lambda allowing user to create Room and adding connection record to Dynamo
│   │   ├── disconnect
│   │   │   └── index.ts        # lambda removing connection record from Dynamo
│   │   ├── joinRoom
│   │   │   └── index.ts        # lambda allowing user to join Room and adding another connection record to Dynamo
│   │   └── sendMessage
│   │       └── index.ts        # lambda allowing user to send a message 
│   │
│   └── libs                    
│       ├── dynamo.ts           # DynamoDB 'write', 'get' and 'query' functions
│       ├── apiGateway.ts       # API Gateway specific helpers (e.g. formatJSONResponse)
│       └── websocket.ts        # Create new websocket client
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── webpack.config.js           # Webpack configuration
└── tsconfig.paths.json         # Typescript paths
```