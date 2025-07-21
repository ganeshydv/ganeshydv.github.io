---
layout: post
title: "Serverless Deployment Automation"
date: 2025-07-21
categories: [aws, 3-aws-cicd-serverless--md]
tags: [aws]
author: "GGurkhude"
excerpt: "Learning notes on serverless deployment automation"
original_path: "0_AWS/3_aws_cicd_serverless_.md"
---

# Serverless Deployment Automation  

## Why Automate Serverless Deployment?  

- A serverless application may have **many APIs** that need to be configured with AWS services.  
- Manually configuring these APIs and services is **time-consuming and error-prone**.  
- If code changes, API endpoints and their configurations **must be updated**, which is difficult to manage manually.  

### Serverless Deployment Workflow  
```plaintext
Write Code → Run Tests → Deploy
```
# Serverless Deployment Tools  

## AWS SAM (Serverless Application Model)  

- A **simplified version of AWS CloudFormation** designed for serverless applications.  
- Automates the deployment of AWS services using a **simple text-based template**.  
- SAM templates use **the same format** as CloudFormation but are **simplified for serverless**.  
- AWS CloudFormation **converts SAM templates into standard CloudFormation templates**.  

---

## Serverless Framework  

- Uses a **different template format** than AWS SAM.  
- Supports **various plugins**, making it usable for **non-serverless services** as well.  
- Example Use Cases:  
  - Can build **API endpoints** (without using AWS API Gateway).  
  - Can manage **Lambda functions and IAM roles** dynamically.  
  - Allows defining **security groups and traffic control** for Lambda functions.  

---

## AWS CI/CD Services for Serverless  

### 1. **AWS CodeCommit**  
- A **Git-based source control service** similar to GitHub.  
- Stores and manages serverless application code.  

### 2. **AWS CodeBuild**  
- A fully managed **continuous integration (CI) service**.  
- Builds and tests **serverless code automatically**.  
- Can create and update AWS resources as part of the build process.  

### 3. **AWS CodePipeline**  
- A **continuous delivery (CD) service** for automating deployment workflows.  
- Manages deployment from **source repository → build → deployment**.  
- Supports integrations with **CodeCommit, CodeBuild, AWS Lambda, and other AWS services**.  

---
