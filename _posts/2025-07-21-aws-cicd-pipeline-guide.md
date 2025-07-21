---
layout: post
title: "AWS CI/CD Pipeline Guide"
date: 2025-07-21
categories: [aws, cicd]
tags: [aws, dynamodb, javascript]
author: "GGurkhude"
excerpt: "Learning notes on aws ci/cd pipeline guide"
original_path: "0_AWS/CICD/2__aws_cicd__.md"
---

# AWS CI/CD Pipeline Guide  

## AWS Services in CI/CD  

1. **AWS CodeCommit**: Hosts Git repositories (source control).  
2. **AWS CodeBuild**: Continuous Integration (CI) service to build/package for deployment.  
3. **AWS CodePipeline / AWS CodeDeploy**: Continuous Delivery (CD) to automate deployments.  

---

## Steps to Set Up CI/CD Pipeline  

### 1. Add Repository to AWS CodeCommit  
Push your local repository to CodeCommit as the remote repository.  

### 2. Use AWS CodeBuild  

#### Important Considerations  
- **IAM Permissions**: CodeBuild must have the same permissions as the user in local development to access AWS services like RDS, DynamoDB, S3, etc.  
- **Example Scenario**:  
  - A user creates a Serverless project and deploys it using the Serverless Framework.  
  - The project accesses AWS services (DynamoDB, RDS, S3) via AWS CloudFormation, which automatically assigns permissions using local credentials.  
  - After pushing the code to redeploy, CodeBuild must assume the same role as the user for CI to function properly.  

#### Key Points  
1. **Local to CodeBuild Workflow**  
   - Serverless uses **CloudFormation** to access AWS services (DynamoDB, S3, etc.).  
   - CloudFormation leverages the credentials stored on the local machine.  
   - When deployed, API Gateway, S3, and DynamoDB are already connected to Lambda.  

2. **CodeBuild Creates a Containerized Environment**  
   - The user has all required permissions.  
   - The same permissions must be assigned to CodeBuild.  
   - **Solution**: Create an **IAM Role** that grants the necessary permissions.  

---

### 3. Create IAM Role for CodeBuild  
- This role should include permissions to access AWS services on behalf of the user.  

---

### 4. Create a CodeBuild Project  

- **Name**: Provide a descriptive name.  
- **Source Provider**: Choose from CodeCommit, S3, GitHub, Bitbucket.  
- **Repository**: Specify the repository source.  
- **Environment**:  
  - Use a **Managed Image** provided by CodeBuild.  
  - **OS**: Select the appropriate operating system.  
  - **Runtime**: Choose the required Node.js version.  
  - **BuildSpec File**: Define `buildspec.yml` (to instruct CodeBuild on handling the source code).  

- **Service Role**: Select the IAM role created earlier.  
- **Advanced Settings**: Configure environment variables if needed.  

---

### 5. Add `buildspec.yml` to Source Code  

Define the build steps inside `buildspec.yml` and commit it to the repository.  

---

### 6. Push Code to Remote Repository  

Ensure that all changes, including `buildspec.yml`, are pushed to CodeCommit.  

---

### 7. Manually Build the CodeBuild Project  

At this stage, deployment is still **manual**.  

---

## Automating Deployment with AWS CodePipeline  

Instead of manual deployment, use **CodePipeline** to automate the process.  

### 1. Create a CodePipeline  

- **Source Provider**: Choose from Bitbucket, Git, or CodeCommit.  
- **Branch Name**: Specify the branch for deployment.  
- **Deployment Provider**:  
  - Options: CodeBuild, ECS, CloudFormation.  
  - **For Serverless Framework**:  
    - No need for CloudFormation separately, as Serverless Framework manages deployments using `buildspec.yml`.  

- **IAM Role**: Assign a role to CodePipeline.  
- **Review & Create CodePipeline**  

---

### 2. Does CodePipeline Use CodeBuild?  

✅ **Yes** – CodePipeline orchestrates the CI/CD workflow and **triggers CodeBuild** to build and package the application.  

---

## Summary of the Workflow  

1. **Developer commits code** → Pushed to **CodeCommit**  
2. **CodePipeline detects change** → Triggers **CodeBuild**  
3. **CodeBuild**:  
   - Builds & packages the application  
   - Uses **IAM Role** to access AWS services  
4. **Deployment**:  
   - Serverless Framework manages AWS CloudFormation  
   - Automatically deploys API Gateway, Lambda, DynamoDB, S3, etc.  

---