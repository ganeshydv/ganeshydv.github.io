---
layout: post
title: "Required User Roles:"
date: 2025-07-21
categories: [aws, sls-user-roles--md]
tags: [aws]
author: "GGurkhude"
excerpt: "Learning notes on required user roles:"
original_path: "0_AWS_Serverless/sls_user_roles_.md"
---

## Required User Roles:
```json
{
  "Effect": "Allow",
  "Action": [
    "iam:PassRole",
    "lambda:CreateFunction",
    "lambda:UpdateFunctionCode",
    "lambda:UpdateFunctionConfiguration",
    "lambda:ListFunctions",
    "lambda:GetFunction",
    "lambda:DeleteFunction",
    "s3:PutObject",
    "s3:GetObject",
    "s3:ListBucket",
    "cloudformation:CreateStack",
    "cloudformation:UpdateStack",
    "cloudformation:DescribeStacks",
    "cloudformation:DeleteStack"
  ],
  "Resource": "*"
}
```
## Why?

> lambda:* → Needed for creating, updating, and managing Lambda functions.

> s3:* → Required because Serverless Framework and SAM upload your deployment package to an S3 bucket before deploying it to Lambda.

> cloudformation:* → Required for SAM/Serverless Framework to manage resources using AWS CloudFormation.

> iam:PassRole → Allows Lambda to assume the execution role you define.
