---
layout: post
title: "Accessing AWS DynamoDB using AWS SDK v2 and v3"
date: 2025-07-21
categories: [aws, 2-aws-sdk-dynamodb--md]
tags: [aws, dynamodb, java, javascript, database]
author: "GGurkhude"
excerpt: "Learning notes on accessing aws dynamodb using aws sdk v2 and v3"
original_path: "0_AWS_sdk_v2_v3/2_aws_sdk_dynamodb_.md"
---

# Accessing AWS DynamoDB using AWS SDK v2 and v3

## Overview
Amazon DynamoDB is a fully managed NoSQL database service that provides fast and predictable performance with seamless scalability. AWS provides SDKs to interact with DynamoDB, with notable differences between **aws-sdk v2** and **aws-sdk v3**.

---

## 1. Installing Dependencies

### AWS SDK v2
```sh
npm install aws-sdk
```

### AWS SDK v3
```sh
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
```

---

## 2. Importing Required Modules

### AWS SDK v2
```javascript
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const dynamoDB = new AWS.DynamoDB();
const documentClient = new AWS.DynamoDB.DocumentClient();
```

### AWS SDK v3
```javascript
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand, DeleteCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);
```

---

## 3. Creating a Table

### AWS SDK v2
```javascript
const params = {
  TableName: "Users",
  KeySchema: [{ AttributeName: "UserId", KeyType: "HASH" }],
  AttributeDefinitions: [{ AttributeName: "UserId", AttributeType: "S" }],
  ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
};

dynamoDB.createTable(params, (err, data) => {
  if (err) console.error("Error", err);
  else console.log("Table Created", data);
});
```

### AWS SDK v3
```javascript
const { CreateTableCommand } = require("@aws-sdk/client-dynamodb");

const params = {
  TableName: "Users",
  KeySchema: [{ AttributeName: "UserId", KeyType: "HASH" }],
  AttributeDefinitions: [{ AttributeName: "UserId", AttributeType: "S" }],
  ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
};

const command = new CreateTableCommand(params);
client.send(command)
  .then(data => console.log("Table Created", data))
  .catch(error => console.error("Error", error));
```

---

## 4. Inserting an Item

### AWS SDK v2
```javascript
const params = {
  TableName: "Users",
  Item: {
    UserId: "123",
    Name: "John Doe",
    Email: "john@example.com"
  }
};

documentClient.put(params, (err, data) => {
  if (err) console.error("Error", err);
  else console.log("Item Inserted", data);
});
```

### AWS SDK v3
```javascript
const params = {
  TableName: "Users",
  Item: {
    UserId: "123",
    Name: "John Doe",
    Email: "john@example.com"
  }
};

const command = new PutCommand(params);
docClient.send(command)
  .then(data => console.log("Item Inserted", data))
  .catch(error => console.error("Error", error));
```

---

## 5. Retrieving an Item

### AWS SDK v2
```javascript
const params = {
  TableName: "Users",
  Key: { UserId: "123" }
};

documentClient.get(params, (err, data) => {
  if (err) console.error("Error", err);
  else console.log("Item Retrieved", data);
});
```

### AWS SDK v3
```javascript
const params = {
  TableName: "Users",
  Key: { UserId: "123" }
};

const command = new GetCommand(params);
docClient.send(command)
  .then(data => console.log("Item Retrieved", data))
  .catch(error => console.error("Error", error));
```

---

## 6. Updating an Item

### AWS SDK v2
```javascript
const params = {
  TableName: "Users",
  Key: { UserId: "123" },
  UpdateExpression: "set Email = :email",
  ExpressionAttributeValues: { ":email": "newemail@example.com" }
};

documentClient.update(params, (err, data) => {
  if (err) console.error("Error", err);
  else console.log("Item Updated", data);
});
```

### AWS SDK v3
```javascript
const params = {
  TableName: "Users",
  Key: { UserId: "123" },
  UpdateExpression: "set Email = :email",
  ExpressionAttributeValues: { ":email": "newemail@example.com" }
};

const command = new UpdateCommand(params);
docClient.send(command)
  .then(data => console.log("Item Updated", data))
  .catch(error => console.error("Error", error));
```

---

## 7. Deleting an Item

### AWS SDK v2
```javascript
const params = {
  TableName: "Users",
  Key: { UserId: "123" }
};

documentClient.delete(params, (err, data) => {
  if (err) console.error("Error", err);
  else console.log("Item Deleted", data);
});
```

### AWS SDK v3
```javascript
const params = {
  TableName: "Users",
  Key: { UserId: "123" }
};

const command = new DeleteCommand(params);
docClient.send(command)
  .then(data => console.log("Item Deleted", data))
  .catch(error => console.error("Error", error));
```

---

## 8. Differences Between AWS SDK v2 and v3

| Feature                | AWS SDK v2                      | AWS SDK v3                      |
|------------------------|--------------------------------|--------------------------------|
| Installation          | `npm install aws-sdk`          | `npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb` |
| Modular Imports      | No                              | Yes (Reduces bundle size)      |
| Method Calls         | Callback-based API             | Promise-based API (async/await) |
| Performance          | Loads entire SDK               | Loads only required modules    |

---

## 9. Best Practices
- **Use SDK v3** for better performance and modularity.
- **Use Secondary Indexes** for efficient querying.
- **Enable Auto Scaling** to handle traffic spikes.
- **Optimize Queries** by using `ProjectionExpression` to retrieve only necessary attributes.
- **Batch Writes** using `BatchWriteCommand` to improve performance.

---

## 10. Conclusion
AWS SDK v3 is more modular, efficient, and uses promises, making it a better choice for new applications. However, SDK v2 is still widely used and supported.

---

