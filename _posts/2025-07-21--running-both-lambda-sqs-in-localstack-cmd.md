---
layout: post
title: "✅ Running Both Lambda & SQS in LocalStack: CMD"
date: 2025-07-21
categories: [aws, ex1-create-lambda-sqs-cmd-md]
tags: [aws, javascript, docker, networking]
author: "GGurkhude"
excerpt: "Learning notes on ✅ running both lambda & sqs in localstack: cmd"
original_path: "0_AWS_SAM_Localstack/ex1_create_lambda_sqs_cmd.md"
---

# ✅ Running Both Lambda & SQS in LocalStack: CMD
- This method allows you to:

   1. Push messages to SQS from a Producer Lambda
   1. Trigger a Consumer Lambda from SQS
   1. Run everything in a single LocalStack Docker container
## 1️⃣ Start LocalStack (Single Docker Container)
- Run LocalStack with both SQS and Lambda support:
```sh
docker run --rm -it -p 4566:4566 -e LOCALSTACK_SERVICES=sqs,lambda localstack/localstack
```
## 2️⃣ Create SQS Queue in LocalStack
- Once LocalStack is running, create an SQS queue:
```sh
aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name my-queue
```
- Get the Queue URL:
```sh
aws --endpoint-url=http://localhost:4566 sqs get-queue-url --queue-name my-queue
```
## 3️⃣ Create Producer Lambda (Sends Message to SQS)
### 📝 producer/app.js
```js
const AWS = require('aws-sdk');

const sqs = new AWS.SQS({
    endpoint: 'http://localhost:4566',  // LocalStack endpoint
    region: 'us-east-1'
});

const QUEUE_URL = 'http://localhost:4566/000000000000/my-queue';

exports.handler = async () => {
    const params = {
        QueueUrl: QUEUE_URL,
        MessageBody: JSON.stringify({ orderId: "12345", status: "Processing" }),
    };

    try {
        const result = await sqs.sendMessage(params).promise();
        console.log("Message sent:", result.MessageId);
        return { statusCode: 200, body: JSON.stringify({ messageId: result.MessageId }) };
    } catch (error) {
        console.error("Error:", error);
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
```
- ### Zip the Producer Code
   - AWS Lambda requires deployment as a ZIP file:
```sh
zip -r producer.zip producer/
```
## 4️⃣ Deploy Producer Lambda to LocalStack
- Register the Lambda function in LocalStack:
```sh
aws --endpoint-url=http://localhost:4566 lambda create-function \
  --function-name ProducerLambda \
  --runtime nodejs18.x \
  --role arn:aws:iam::000000000000:role/lambda-role \
  --handler producer/app.handler \
  --zip-file fileb://producer.zip
```

## 5️⃣ Create Consumer Lambda (Processes Messages from SQS)
### 📝 consumer/app.js
```js
exports.handler = async (event) => {
    console.log("Received SQS messages:", JSON.stringify(event, null, 2));

    for (const record of event.Records) {
        const message = JSON.parse(record.body);
        console.log("Processing message:", message);
    }

    return { statusCode: 200, body: "Messages processed" };
};
```
### - Zip the Consumer Code
```sh
zip -r consumer.zip consumer/
```
## 6️⃣ Deploy Consumer Lambda to LocalStack
```sh
aws --endpoint-url=http://localhost:4566 lambda create-function \
  --function-name ConsumerLambda \
  --runtime nodejs18.x \
  --role arn:aws:iam::000000000000:role/lambda-role \
  --handler consumer/app.handler \
  --zip-file fileb://consumer.zip
```
## 7️⃣ Set Up SQS Trigger for Consumer Lambda
- Now, link the SQS queue to trigger the Lambda function when messages arrive:
```sh
aws --endpoint-url=http://localhost:4566 lambda create-event-source-mapping \
  --function-name ConsumerLambda \
  --event-source-arn arn:aws:sqs:us-east-1:000000000000:my-queue \
  --batch-size 5
```
## 8️⃣ Invoke Producer Lambda (Send Message to SQS)
- Now, send a message to SQS by invoking Producer Lambda:
```sh
aws --endpoint-url=http://localhost:4566 lambda invoke \
  --function-name ProducerLambda \
  output.json
```
- This will send a message to SQS, which will then trigger the Consumer Lambda.

## 9️⃣ Check Logs of Consumer Lambda
- Since SQS triggers the Consumer Lambda, you can check its logs:
```sh
docker logs $(docker ps -q --filter ancestor=localstack/localstack)
```
- You should see:
```sh
Received SQS messages: {...}
Processing message: { orderId: '12345', status: 'Processing' }
```
## 🔹 Why This is the Best Approach?
  - ✅ Single LocalStack Container → No need for sam local commands.
  - ✅ No AWS Account Needed → Everything runs locally.
  - ✅ Automatic SQS to Lambda Trigger → No manual polling required.
  - ✅ Fast & Cost-Free Testing → No AWS bills or slow deployments.

## 🔹 Summary
- Run LocalStack (SQS + Lambda) in a single Docker container.
- Deploy Producer Lambda to send messages to SQS.
- Deploy Consumer Lambda that gets triggered when a message is sent.
- Invoke Producer Lambda to send messages.
- See logs to verify Consumer Lambda processes messages.

## How IAM Works in LocalStack
 LocalStack mimics AWS IAM roles and permissions, but IAM enforcement is disabled by default for simplicity.

🔹 In real AWS, you must attach IAM roles to Lambda, SQS, and other services for security.

🔹 In LocalStack, it allows all requests without checking IAM policies unless explicitly enabled.
### 1️⃣ Does LocalStack Enforce IAM Permissions?
- By default, NO ❌.
### 2️⃣ Can LocalStack Simulate IAM Policies?
- Yes ✅, but you need to enable IAM enforcement manually.
- To enable IAM in LocalStack, run it with:
```sh
docker run --rm -it -p 4566:4566 -e LOCALSTACK_AUTH_MODE=ENFORCE localstack/localstack
```

### 3️⃣ How Do IAM Roles Work in LocalStack?
- Since IAM roles aren’t enforced by default, you can define fake roles when deploying resources.
- For example, when creating a Lambda function in LocalStack, you still need to provide a role ARN, but LocalStack doesn’t validate it:
```sh
aws --endpoint-url=http://localhost:4566 lambda create-function \
  --function-name MyLambda \
  --runtime nodejs18.x \
  --role arn:aws:iam::000000000000:role/lambda-role \
  --handler index.handler \
  --zip-file fileb://my-lambda.zip
```
- > Even though arn:aws:iam::000000000000:role/lambda-role is not a real IAM role, LocalStack accepts it.


