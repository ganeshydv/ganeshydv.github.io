---
layout: post
title: "✅ Best Approach: Using AWS SAM with LocalStack"
date: 2025-07-21
categories: [aws, ex2-using-localstack-sam--md]
tags: [aws, java, javascript, docker, networking]
author: "GGurkhude"
excerpt: "Learning notes on ✅ best approach: using aws sam with localstack"
original_path: "0_AWS_SAM_Localstack/ex2_using_localstack_sam_.md"
---

# ✅ Best Approach: Using AWS SAM with LocalStack
You can define SQS + Lambda in a single template.yaml file, and deploy everything locally using SAM CLI.

## 1️⃣ Install AWS SAM CLI & LocalStack
- Make sure you have both AWS SAM CLI and LocalStack installed:
- Run this command in PowerShell or Command Prompt:
```sh
docker run --rm -it -p 4566:4566 -p 4510-4559:4510-4559 localstack/localstack
```
- This will: 
  - ✅ Start LocalStack
  - ✅ Expose ports for AWS services (SQS, Lambda, S3, etc.)
  - ✅ Run LocalStack in Docker without needing Python or pip
- ### ✅ Alternative: Run LocalStack in Detached Mode
To keep LocalStack running in the background:
```sh
docker run -d --name localstack -p 4566:4566 -p 4510-4559:4510-4559 localstack/localstack
```
- ### ✅ Test if LocalStack is Running
Run this command to check LocalStack’s status:
```sh
curl http://localhost:4566/_localstack/health
```
  - Expected output::
    ```json
      {
        "services": {
          "sqs": "running",
          "lambda": "running",
          "s3": "running"
        }
      }
    ```
> ### `Create SQS maually as SAM does not creates it`
```sh
aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name MyQueue
```
- check Queue:
> aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name MyQueue

## 2️⃣ Define SAM Template (template.yaml)
- This template does everything for you:

  - Creates an SQS queue
  - Creates a Lambda function
  - Links SQS to Lambda (Event Source Mapping)
- ## 📝 template.yaml
```yml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31

Resources:
  MyQueue:
    Type: AWS::SQS::Queue
    Properties:
      QueueName: my-queue

  ProducerLambda:
    Type: AWS::Serverless::Function
    Properties:
      FunctionName: ProducerLambda
      Runtime: nodejs18.x
      Handler: producer.handler
      CodeUri: producer/
      Policies:
        - SQSSendMessagePolicy:
            QueueName: my-queue
      Environment:
        Variables:
          QUEUE_URL: !Ref MyQueue

  ConsumerLambda:
    Type: AWS::Serverless::Function
    Properties:
      FunctionName: ConsumerLambda
      Runtime: nodejs18.x
      Handler: consumer.handler
      CodeUri: consumer/
      Policies:
        - SQSPollerPolicy:
            QueueName: my-queue
      Events:
        SQSEvent:
          Type: SQS
          Properties:
            Queue: !GetAtt MyQueue.Arn
            BatchSize: 5
```
## 3️⃣ Create the Lambda Code
### 📝 producer/index.js (Pushes messages to SQS)
```javascript
const AWS = require('aws-sdk');

const sqs = new AWS.SQS({ endpoint: 'http://host.docker.internal:4566', region: 'us-east-1' });
const QUEUE_URL = process.env.QUEUE_URL;

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

### 📝 consumer/index.js (Processes SQS Messages)
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
## 4️⃣ Build and Deploy Locally
- Run the following commands in your project folder:
```sh
# Build Lambda package
sam build

# Deploy to LocalStack
sam local start-api --docker-network host
```
- This will:
  - ✅ Build Lambda functions
  - ✅ Create SQS queue
  - ✅ Deploy Lambda + event source mapping
  - ✅ Run everything inside LocalStack

## 5️⃣ Test Producer Lambda (Send Message to SQS)
Invoke the Producer Lambda locally:
```sh
sam local invoke ProducerLambda
```
You should see:
```sh
Message sent: abc1234
```
## 6️⃣ Verify Consumer Lambda Processing
Since SQS automatically triggers ConsumerLambda, check LocalStack logs:
```sh
docker logs $(docker ps -q --filter ancestor=localstack/localstack)
```
Expected output:
```sh
Received SQS messages:
Processing message: { orderId: "12345", status: "Processing" }
```

## Check Queue List:
- `aws --endpoint-url=http://localhost:4566 sqs list-queues`
## Check Queue:
- `aws --endpoint-url=http://localhost:4566 sqs receive-message --queue-url http://localhost:4566/000000000000/MyQueue --region us-west-2`

## Delete Queue:
- `aws --endpoint-url=http://localhost:4566 sqs delete-queue --queue-url http://localhost:4566/000000000000/MyQueue`
## Check Lambda Event mapping: check sqs is event for lambda
- `aws --endpoint-url=http://localhost:4566 lambda list-event-source-mappings`

## Check Queue ARN:
- `aws --endpoint-url=http://localhost:4566 sqs get-queue-attributes  --queue-url http://localhost:4566/000000000000/MyQueue  --attribute-name QueueArn`