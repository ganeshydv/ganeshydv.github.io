---
layout: post
title: "Accessing AWS Lambda using AWS SDK v2 and v3"
date: 2025-07-21
categories: [aws, 6-aws-sdk-lambda--md]
tags: [aws, java, javascript]
author: "GGurkhude"
excerpt: "Learning notes on accessing aws lambda using aws sdk v2 and v3"
original_path: "0_AWS_sdk_v2_v3/6_aws_sdk_lambda_.md"
---

# Accessing AWS Lambda using AWS SDK v2 and v3

## Overview
Amazon Lambda is a serverless compute service that runs code in response to triggers without provisioning or managing servers. AWS SDKs allow developers to invoke, deploy, and manage Lambda functions.

---

## 1. Installing Dependencies

### AWS SDK v2
```sh
npm install aws-sdk
```

### AWS SDK v3
```sh
npm install @aws-sdk/client-lambda
```

---

## 2. Importing Required Modules

### AWS SDK v2
```javascript
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const lambda = new AWS.Lambda();
```

### AWS SDK v3
```javascript
const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");
const client = new LambdaClient({ region: "us-east-1" });
```

---

## 3. Invoking a Lambda Function

### AWS SDK v2
```javascript
const params = {
  FunctionName: "myLambdaFunction",
  Payload: JSON.stringify({ key: "value" })
};

lambda.invoke(params, (err, data) => {
  if (err) console.error("Error", err);
  else console.log("Response", JSON.parse(data.Payload));
});
```

### AWS SDK v3
```javascript
const command = new InvokeCommand({
  FunctionName: "myLambdaFunction",
  Payload: JSON.stringify({ key: "value" })
});

client.send(command)
  .then(data => console.log("Response", JSON.parse(Buffer.from(data.Payload).toString())))
  .catch(error => console.error("Error", error));
```

---

## 4. Creating a Lambda Function

### AWS SDK v2
```javascript
const params = {
  FunctionName: "myNewLambda",
  Runtime: "nodejs18.x",
  Role: "arn:aws:iam::123456789012:role/execution_role",
  Handler: "index.handler",
  Code: {
    ZipFile: require("fs").readFileSync("./function.zip")
  }
};

lambda.createFunction(params, (err, data) => {
  if (err) console.error("Error", err);
  else console.log("Lambda Created", data);
});
```

### AWS SDK v3
```javascript
const { CreateFunctionCommand } = require("@aws-sdk/client-lambda");
const fs = require("fs");

const command = new CreateFunctionCommand({
  FunctionName: "myNewLambda",
  Runtime: "nodejs18.x",
  Role: "arn:aws:iam::123456789012:role/execution_role",
  Handler: "index.handler",
  Code: {
    ZipFile: fs.readFileSync("./function.zip")
  }
});

client.send(command)
  .then(data => console.log("Lambda Created", data))
  .catch(error => console.error("Error", error));
```

---

## 5. Updating a Lambda Function

### AWS SDK v2
```javascript
const params = {
  FunctionName: "myLambdaFunction",
  ZipFile: require("fs").readFileSync("./updated_function.zip")
};

lambda.updateFunctionCode(params, (err, data) => {
  if (err) console.error("Error", err);
  else console.log("Lambda Updated", data);
});
```

### AWS SDK v3
```javascript
const { UpdateFunctionCodeCommand } = require("@aws-sdk/client-lambda");
const fs = require("fs");

const command = new UpdateFunctionCodeCommand({
  FunctionName: "myLambdaFunction",
  ZipFile: fs.readFileSync("./updated_function.zip")
});

client.send(command)
  .then(data => console.log("Lambda Updated", data))
  .catch(error => console.error("Error", error));
```

---

## 6. Deleting a Lambda Function

### AWS SDK v2
```javascript
const params = { FunctionName: "myLambdaFunction" };

lambda.deleteFunction(params, (err, data) => {
  if (err) console.error("Error", err);
  else console.log("Lambda Deleted", data);
});
```

### AWS SDK v3
```javascript
const { DeleteFunctionCommand } = require("@aws-sdk/client-lambda");

const command = new DeleteFunctionCommand({ FunctionName: "myLambdaFunction" });

client.send(command)
  .then(data => console.log("Lambda Deleted", data))
  .catch(error => console.error("Error", error));
```

---

## 7. Differences Between AWS SDK v2 and v3

| Feature                | AWS SDK v2                      | AWS SDK v3                      |
|------------------------|--------------------------------|--------------------------------|
| Installation          | `npm install aws-sdk`          | `npm install @aws-sdk/client-lambda` |
| Modular Imports      | No                              | Yes (Reduces bundle size)      |
| Method Calls         | Callback-based API             | Promise-based API (async/await) |
| Performance          | Loads entire SDK               | Loads only required modules    |

---

## 8. Best Practices
- **Use SDK v3** for better performance and modularity.
- **Use IAM Policies** to restrict Lambda execution permissions.
- **Enable Function Versioning** to manage deployments safely.
- **Set Timeout and Memory Limits** to optimize performance.
- **Use CloudWatch Logs** for monitoring and debugging.

---

## 9. Conclusion
AWS SDK v3 is more modular, efficient, and uses promises, making it a better choice for new applications. However, SDK v2 is still widely used and supported.

---

