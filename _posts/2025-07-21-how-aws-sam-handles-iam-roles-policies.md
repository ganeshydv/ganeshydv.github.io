---
layout: post
title: "How AWS SAM Handles IAM Roles & Policies"
date: 2025-07-21
categories: [aws, 1-2-sam-iam-vpc-sg-acl-md]
tags: [aws, dynamodb, javascript, database]
author: "GGurkhude"
excerpt: "Learning notes on how aws sam handles iam roles & policies"
original_path: "0_AWS_SAM/1.2_sam_IAM_VPC_SG_ACL.md"
---

# How AWS SAM Handles IAM Roles & Policies
- If you don’t define IAM roles manually, SAM automatically creates:
  - A default execution role for Lambda
  - Permissions for API Gateway to invoke Lambda
  - Permissions for Lambda to access S3, DynamoDB, etc. (if defined)

### Example 1: Explicit IAM Role in AWS SAM
If you want to control IAM permissions manually, define them in template.yaml:
```yml
Resources:
  MyLambdaFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: app.handler
      Runtime: nodejs18.x
      CodeUri: .
      Role: !GetAtt LambdaExecutionRole.Arn  # Use a custom IAM role
      Policies:
        - S3ReadPolicy:
            BucketName: my-secure-bucket
        - AWSLambdaBasicExecutionRole

  LambdaExecutionRole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: "2012-10-17"
        Statement:
          - Effect: Allow
            Principal:
              Service: lambda.amazonaws.com
            Action: sts:AssumeRole
      Policies:
        - PolicyName: LambdaPolicy
          PolicyDocument:
            Version: "2012-10-17"
            Statement:
              - Effect: Allow
                Action:
                  - s3:GetObject
                  - s3:ListBucket
                Resource: arn:aws:s3:::my-secure-bucket/*
```

Here, we explicitly define an IAM role (LambdaExecutionRole), which:
- Grants Lambda permissions to read from S3.
- Is manually attached to the Lambda function.

### Example 2: Automatically Managed IAM Roles
If no role is provided, SAM automatically creates one with the AWSLambdaBasicExecutionRole permission:
```yml
Resources:
  MyLambdaFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: app.handler
      Runtime: nodejs18.x
      CodeUri: .
      Policies:
        - AWSLambdaBasicExecutionRole
```
This will:
- Allow logs to be written to CloudWatch.
- Use an AWS-managed IAM role instead of a custom one.
----
# AWS SAM & Network Security (VPC, Security Groups, NACLs)
If your Lambda function interacts with RDS (MySQL, PostgreSQL) or other private VPC resources, it needs VPC configuration.

### Example 3: Running Lambda inside a 
```yml
Resources:
  MyLambdaFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: app.handler
      Runtime: nodejs18.x
      CodeUri: .
      VpcConfig:
        SecurityGroupIds:
          - sg-123456789
        SubnetIds:
          - subnet-abc123
          - subnet-def456
```
- This ensures Lambda runs inside a VPC.
- Requires Security Groups (sg-123456789) and Subnets (subnet-abc123).

> If these security groups or network ACLs block traffic, Lambda won’t be able to reach RDS or other private resources.