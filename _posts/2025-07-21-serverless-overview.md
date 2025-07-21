---
layout: post
title: "Serverless Overview"
date: 2025-07-21
categories: [aws, 1-serverless---md]
tags: [aws, dynamodb, database, docker, networking]
author: "GGurkhude"
excerpt: "Learning notes on serverless overview"
original_path: "0_AWS_Serverless/1_serverless__.md"
---

# Serverless Overview

## What is Serverless?
- Serverless functions are used to perform tasks based on events.
- These functions run in a containerized environment similar to Docker.
- They respond to events, such as an HTTP GET request, and start executing when triggered.

---

## Serverless Components  
### Serverless = AWS Lambda + API Gateway + DynamoDB + More...

### AWS Lambda  
- Lambda functions run in a containerized environment.  
- They are event-driven and execute only when triggered.  
- Access to Lambda functions can be controlled using IAM policies.  

### AWS API Gateway  
- Used to create APIs.  
- Supports building RESTful APIs.  
- Can integrate API requests with different AWS services.  

### Amazon DynamoDB  
- A NoSQL database service.  
- Scales on demand without manual intervention.  

### SNS & SQS  
- Used for communication between different AWS services.  
- SNS (Simple Notification Service) enables pub/sub messaging.  
- SQS (Simple Queue Service) provides message queuing for decoupling applications.  

### AWS CloudFormation  
- Used to create and automate the deployment of AWS resources.  
- Uses simple text-based templates to define infrastructure.  

### AWS Step Functions  
- Helps coordinate AWS Lambda functions.  
- Used for orchestrating workflows and defining execution sequences.  

---

## Other AWS Services in Serverless  

### S3  
- Used for storing static files.  

### SNS & SQS  
- Enable messaging and event-driven communication.  

### Kinesis  
- Used for real-time data streaming applications.  

### Athena  
- Allows querying and searching data stored in S3.  

### AWS X-Ray & CloudWatch  
- Used for debugging, monitoring, and logging.  

### AWS Cognito  
- Provides authentication (AuthN) and authorization (AuthZ) for serverless applications.  

---

## Use Cases of Serverless  
1. Backend services  
2. Real-time data processing  
