# Live Chat Websocket - AWS Serverless

DESC HERE

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

### The Endpoints

```
```

```
```

### Project structure
```
.
├── serverless                  # Folder holding extra serverless configuration
│   ├── dynamoResources         # DynamoDB table configuration 
│   └── functions               # config pointing to handlers path and http method 
├── src
│   ├── functions               # Folder containing lambda fn 
│   │   ├── getReminders
│   │   │   └── index.ts        # lambda querying on a dynamodb table
│   │   ├── sendReminder
│   │   │   └── index.ts        # lambda making use of SES and SNS clients for notifications
│   │   └── setReminder
│   │       └── index.ts        # lambda adding to dynamodb table
│   │
│   └── libs                    
│       ├── dynamo.ts           # DynamoDB 'write', 'get' and 'query' functions
│       └── apiGateway.ts       # API Gateway specific helpers
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── webpack.config.js           # Webpack configuration
└── tsconfig.paths.json         # Typescript paths
```