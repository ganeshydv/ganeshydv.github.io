# Accessing AWS SQS using AWS SDK v2 and v3

## Overview
Amazon Simple Queue Service (SQS) is a fully managed message queuing service that enables decoupling and scaling of microservices, distributed systems, and serverless applications.

AWS provides SDKs to interact with SQS, with notable differences between **aws-sdk v2** and **aws-sdk v3**.

---

## 1. Installing Dependencies

### AWS SDK v2
```sh
npm install aws-sdk
```

### AWS SDK v3
```sh
npm install @aws-sdk/client-sqs
```

---

## 2. Importing Required Modules

### AWS SDK v2
```javascript
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const sqs = new AWS.SQS();
```

### AWS SDK v3
```javascript
const { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand } = require("@aws-sdk/client-sqs");

const client = new SQSClient({ region: "us-east-1" });
```

---

## 3. Sending Messages to SQS

### AWS SDK v2
```javascript
const params = {
  QueueUrl: "https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue",
  MessageBody: "Hello from AWS SDK v2"
};

sqs.sendMessage(params, (err, data) => {
  if (err) console.error("Error", err);
  else console.log("Success", data.MessageId);
});
```

### AWS SDK v3
```javascript
const params = {
  QueueUrl: "https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue",
  MessageBody: "Hello from AWS SDK v3"
};

const command = new SendMessageCommand(params);
client.send(command)
  .then(data => console.log("Success", data.MessageId))
  .catch(error => console.error("Error", error));
```

---

## 4. Receiving Messages from SQS

### AWS SDK v2
```javascript
const params = {
  QueueUrl: "https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue",
  MaxNumberOfMessages: 1,
  WaitTimeSeconds: 10
};

sqs.receiveMessage(params, (err, data) => {
  if (err) console.error("Error", err);
  else console.log("Received", data.Messages);
});
```

### AWS SDK v3
```javascript
const params = {
  QueueUrl: "https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue",
  MaxNumberOfMessages: 1,
  WaitTimeSeconds: 10
};

const command = new ReceiveMessageCommand(params);
client.send(command)
  .then(data => console.log("Received", data.Messages))
  .catch(error => console.error("Error", error));
```

---

## 5. Deleting Messages from SQS

### AWS SDK v2
```javascript
const params = {
  QueueUrl: "https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue",
  ReceiptHandle: "YOUR_RECEIPT_HANDLE"
};

sqs.deleteMessage(params, (err, data) => {
  if (err) console.error("Error", err);
  else console.log("Deleted", data);
});
```

### AWS SDK v3
```javascript
const params = {
  QueueUrl: "https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue",
  ReceiptHandle: "YOUR_RECEIPT_HANDLE"
};

const command = new DeleteMessageCommand(params);
client.send(command)
  .then(data => console.log("Deleted", data))
  .catch(error => console.error("Error", error));
```

## 6. Updating the Visibility Timeout for a Message:


To extend the processing time for a specific message, use the ChangeMessageVisibility API.
### AWS SDK v2
```javascript
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

const sqs = new AWS.SQS();

const params = {
  QueueUrl: "https://sqs.us-east-1.amazonaws.com/123456789012/my-queue",
  ReceiptHandle: "your-receipt-handle", // Received from receiveMessage()
  VisibilityTimeout: 60 // Set timeout in seconds
};

sqs.changeMessageVisibility(params, (err, data) => {
  if (err) console.error("Error updating visibility timeout:", err);
  else console.log("Visibility timeout updated successfully", data);
});

```

### AWS SDK v3
```javascript
import { SQSClient, ChangeMessageVisibilityCommand } from "@aws-sdk/client-sqs";

const client = new SQSClient({ region: "us-east-1" });

const params = {
  QueueUrl: "https://sqs.us-east-1.amazonaws.com/123456789012/my-queue",
  ReceiptHandle: "your-receipt-handle",
  VisibilityTimeout: 60 // Set timeout in seconds
};

const command = new ChangeMessageVisibilityCommand(params);

client.send(command)
  .then(data => console.log("Visibility timeout updated successfully", data))
  .catch(error => console.error("Error updating visibility timeout:", error));

```

---

##  Differences Between AWS SDK v2 and v3

| Feature                | AWS SDK v2                      | AWS SDK v3                      |
|------------------------|--------------------------------|--------------------------------|
| Installation          | `npm install aws-sdk`          | `npm install @aws-sdk/client-sqs` |
| Modular Imports      | No                              | Yes (Reduces bundle size)      |
| Method Calls         | Callback-based API             | Promise-based API (async/await) |
| Performance          | Loads entire SDK               | Loads only required modules    |

---

##  Best Practices
- **Use SDK v3** for better performance and modularity.
- **Enable Long Polling** (set `WaitTimeSeconds` > 0) to reduce empty responses.
- **Use Dead Letter Queues (DLQs)** to handle failed messages.
- **Ensure IAM Permissions** for the necessary SQS actions.
- **Batch Requests** to improve efficiency (e.g., `SendMessageBatch`).

---

##  Conclusion
AWS SDK v3 is more modular, efficient, and uses promises, making it a better choice for new applications. However, SDK v2 is still widely used and supported.

---

