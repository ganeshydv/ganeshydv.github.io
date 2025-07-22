---
layout: post
title: "AWS Cloud Services Complete Guide"
categories: ["Cloud & DevOps", "AWS Services"]
tags: [aws-services, complete-guide]
date: 2025-07-22
author: "GGurkhude"
description: "Complete AWS guide covering Lambda, ECS, IAM, API Gateway, DynamoDB, and deployment strategies"
toc: true
---

# AWS Cloud Services Complete Guide

Complete AWS guide covering Lambda, ECS, IAM, API Gateway, DynamoDB, and deployment strategies

## 📚 Table of Contents

- [**0.** Aws](#section-0)
- [**0.** Aws Cmd](#section-0)
- [**0.** Aws Free Tier](#section-0)
- [**0.** Iam Role Policy](#section-0)

- [**1.** Iam](#section-1)
- [**1-1.** Iam Mfa](#section-1-1)
- [**1-2.** User Access](#section-1-2)
- [**1-3.** Iam Role](#section-1-3)
- [**1-4.** Iam Security Tools](#section-1-4)

- [**3.** Aws Cicd Serverless](#section-3)
- [**3.** Ssh](#section-3)
- [**999.** Advanced Lambda Optimization Guide](#section-999)
- [**999.** Aws Ecs Complete Cicd](#section-999)
- [**999.** Aws Networking Vpc Subnet Sg](#section-999)
- [**999.** Cloudwatch](#section-999)
- [**999.** General Deployment Process](#section-999)
- [**999.** Lambda Best Practices Demo](#section-999)
  - [**0.** Aws Api Gateway](#section-0)
  - [**0.** Aws Codepipeline](#section-0)
  - [**0.** Ec2](#section-0)
  - [**0.** How Ecs Auto Scales](#section-0)
  - [**0.** How Ecs Ec2 Task Scales](#section-0)
  - [**0.** How Lamdba Works](#section-0)
  - [**0.** Lambda Limits 0](#section-0)
  - [**0.** Lambda Limits 1 Summary](#section-0)
  - [**0.** Sqs 0](#section-0)
  - [**0.** Targetgroup](#section-0)
  - [**0-1.** Db Connection](#section-0-1)
  - [**1.** Ec2 Secutitygroups](#section-1)
  - [**1.** Scaling And Alb](#section-1)
  - [**1.** Scaling Scenerio](#section-1)
  - [**1.** Ex Lambds](#section-1)
  - [**2.** Aws Cicd](#section-2)
  - [**2.** Aws Target Group How Failure Handles](#section-2)
  - [**999.** How Ecs Instance Launched](#section-999)
  - [**999.** Suumaryof Ecs](#section-999)
  - [**999.** Ecs](#section-999)
  - [**999.** Lambda Awsapigateway](#section-999)
  - [**999.** Lambda Serverlessyml](#section-999)
  - [**999.** Sqs Sam](#section-999)
  - [**999.** Aws Target Group Health Check Rolback](#section-999)

---



## 0. Aws {#section-0}

*📖 [← Back to Table of Contents](#-table-of-contents)*

[text](AWS_Free_Tier.md)

### 1. Create User:
### 2. assign Roles - for services, users 
- An IAM role is an identity you can create that has specific permissions with credentials that are valid for short durations. Roles can be assumed by entities that you trust.
- Roles and users are both AWS identities with permissions policies that determine what the identity can and cannot do in AWS.
- However, instead of being uniquely associated with one person, a role can be assumed by anyone who needs it. A role does not have standard long-term credentials such as a password or access keys associated with it. Instead, when you assume a role, it provides you with temporary security credentials for your role session.
- ROles: Group of policies + assigned to USER or Service for Temp access
### 3. Policies - Permissions

---

## 0. Aws Cmd {#section-0}

*📖 [← Back to Table of Contents](#-table-of-contents)*

## 1. Check ECS Cluster from Cloudshell:

```bash
aws ecs describe-clusters --clusters <cluster_name>
```

## 2. Check ECS Task from Cloudshell:

```bash
aws ecs describe-tasks --cluster <cluster_name> --tasks <task_id>
```

## 3. Connect to a Running Container in an ECS Task
```bash
aws ecs execute-command --cluster your-cluster-name --task your-task-id --container your-container-name --interactive --command "/bin/sh"

```

## 4. Find the Running Task ID
```bash
aws ecs list-tasks --cluster your-cluster-name
```

## 5. Configure AWS in local :
 ```bash
 aws configure
 ```

---

## 0. Aws Free Tier {#section-0}

*📖 [← Back to Table of Contents](#-table-of-contents)*

1. RDS: 2 months
 - type: for D2- 1 node only  
 - 750 Hours
 - Don't go after 2 months it costs
 - 20 GB/Month


2. 12 months free: from creation of account
 - single zone only
 - 1. ec2
 - 2. rds

3. Always free : but use restriction
 - 1. Dynamo = 25GB 
    - 25GB read/write per month
 - 2. lambda 
   - 1M notification per month
 - 3. Cloudwatch 
   - 10 Alarms / month
  
 

## Other free Services:

1. IAM + USER + Roles
2. Security Groups
3. VPC + Subnet + Route Table + ACL
 - VPC - charged for data transfer

## Not Free: 
1. NAT Gateway : for internet access
2. VPC :

---

## 0. Iam Role Policy {#section-0}

*📖 [← Back to Table of Contents](#-table-of-contents)*

## An IAM Role is a set of permissions that AWS services (like Lambda) assume to perform actions on other AWS resources.

- ### AssumeRolePolicyDocument = Who can use the role
- ### Policies = What the role can do once assumed
- ### When AWS Lambda runs, it needs:
   - `Permission to assume a role` (this is controlled by AssumeRolePolicyDocument).
   - `Permission to access AWS services` (this is defined inside Policies).

## Example:
For lambda let say needs access to S3
```yml
Resources:
  LambdaExecutionRole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:  # (1) Who can assume this role?
        Version: "2012-10-17"
        Statement:
          - Effect: Allow
            Principal:
              Service: lambda.amazonaws.com  # Only AWS Lambda can assume this role
            Action: sts:AssumeRole
      Policies:  # (2) What permissions does this role have?
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

### For this `LambdaExecutionRole`
### 1️⃣ AssumeRolePolicyDocument: Who Can Assume This Role?
- This section defines who (which AWS service) is allowed to assume this role.
```yml
AssumeRolePolicyDocument:
  Version: "2012-10-17"
  Statement:
    - Effect: Allow
      Principal:
        Service: lambda.amazonaws.com
      Action: sts:AssumeRole
```
- `Principal`: Specifies who can assume this role.
   - Here, it’s Lambda (lambda.amazonaws.com), meaning only AWS Lambda can use this role.
- `Action`: sts:AssumeRole: This allows Lambda to "assume" this role and temporarily get the permissions granted in Policies.

### 👉 Why is this needed?

- AWS roles do not belong to a specific user/service by default.
- AWS services (like Lambda) need explicit permission to "take on" a role to execute actions.
### 2️⃣ Policies: What Permissions Does This Role Have?
- This section defines what actions this role can perform on AWS resources.
```yml
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
### Key Components
- `PolicyName`: LambdaPolicy → This is just a name for this policy.
- `PolicyDocument`: Contains the permissions granted to the role.
  - `Effect`: Allow → Grants permission.
  - `Action`:
     - s3:GetObject: Allows reading objects in an S3 bucket.
     - s3:ListBucket: Allows listing objects inside the bucket.

   - `Resource`: arn:aws:s3:::my-secure-bucket/* → Grants permission to access this specific bucket.

### 👉 Why is this needed?

- Without this policy, Lambda would not be able to access S3.
- Fine-grained permissions prevent unauthorized access.
- Resource-based restrictions ensure the role only accesses what’s needed.


## How This Works in AWS Execution
When AWS Lambda runs:
1. AWS Lambda assumes the IAM role (allowed by AssumeRolePolicyDocument).
1. Lambda gets temporary credentials with the permissions defined in Policies.
1. Lambda can now access S3 (because s3:GetObject and s3:ListBucket are allowed).
1. When Lambda execution finishes, the credentials expire.

## Real-World Example
Let's say you’re building a video processing service that:
- Uploads videos to S3.
- Converts them using AWS Lambda.
- Stores metadata in DynamoDB.

Here’s how the IAM role would look:
```yml
Resources:
  VideoProcessorRole:
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
        - PolicyName: VideoProcessingPolicy
          PolicyDocument:
            Version: "2012-10-17"
            Statement:
              - Effect: Allow
                Action:
                  - s3:PutObject
                  - s3:GetObject
                Resource: arn:aws:s3:::video-bucket/*
              - Effect: Allow
                Action:
                  - dynamodb:PutItem
                  - dynamodb:GetItem
                Resource: arn:aws:dynamodb:us-east-1:123456789012:table/VideoMetadata
```
### 🔹 What This Role Does:

1. Lambda can assume this role (`AssumeRolePolicyDocument`).
1. Lambda can read & write to S3 (`s3:PutObject`, `s3:GetObject`).
1. Lambda can store video metadata in DynamoDB (dynamodb:PutItem, dynamodb:GetItem).


# 📌 IAM Role & Policy Summary

| Concept | Explanation |
|---------|------------|
| **AssumeRolePolicyDocument** | Defines who can assume the role (e.g., Lambda). |
| **Policies** | Specifies what permissions the role has (e.g., S3, DynamoDB access). |
| **sts:AssumeRole** | Allows Lambda to obtain temporary credentials to perform actions. |
| **Effect: Allow** | Grants permissions (you can also use `Deny` to restrict actions). |
| **Resource** | Limits permissions to specific AWS resources for security best practices. |

---

---

## 1. Iam {#section-1}

*📖 [← Back to Table of Contents](#-table-of-contents)*

- `You can use both IAM and AWS IAM Identity Center to create new usersor federate existing users into AWS. The main difference between the two is that IAM users are granted long-term credentials to your AWS resources while users in IAM Identity Center have temporary credentials that are established each time the user signs-in to AWS`
--------
- `A principal entity is a person or application that is authenticated 
using an IAM entity (user or role)`
--> `IAM Entity (User or Role ) becomes Principal Entity when authenticated`
----------------------------------------------------------------------
- `IAM Entity === IAM Principal` 
( both are same the difference is when IAM Entity is 
authenticated it is called IAM Principal)
-------------------------------------------------------------------

### IAM : Global service
- Used to create Users and groups

- IAM USed for : crating and managing
    1) IAM user 
    2) IAM group 
    3) IAM role 
    4) IAM group policies
- `User` : needs permission for access
       - AWS policies are used to give perm
- `services` : need IAM Roles for access
- `Groups` : can not have sub groups
    - : Why crate Groups ?
        - to give directly access to same policies to multiple users
          so not needed to give persmisiions
         independently to each one.

- Each group is independent.

- `Tags`: just for additional info for group/user/other aws resource

--------------------------------------------
## IAM Policy structure
- In AWS Identity and Access Management (IAM), permissions to access AWS services and resources are granted through policies. Both IAM users and IAM roles must have IAM policies attached to them to define the specific actions and resources they are allowed to access.


- `IAM Policy structure`:
```json
{
    "version": ",
    "Id" : "",
    "Statements":[
        {
            "Sid":"1",               
            // statement identifier
            "Effect":"Allow",        
            // statements allow or deny access
            "Principle":{       
                // aka IAM Entity     
                // users or Roles:policies applied to which user
                "AWS" :["arn:aws:iam:: ....:root"]
            },
            "Action":[    
                // list 0f actions this policy allowed to users
                "s3:GetObject",
                "
            ],
            "resource":["arn:aws:s3:::serciceName/*"]  
            //list of resources actions are applied to
        }
    ]
}
```

- `POLICY` :  used for giving certain persmissions to user

### General Process:
- user can have access to
1. diectly attached policies or 
2. inherited from GROUP or 
3. BOTH
```
Admin Role creates user --> gives certain persmissions --> user gets persmisiions
--> user logs in using aws alias or id and then can work on aws but 
user does not have some acees he will not be able to access those things.
```

- You can create own policies and the structure will be as above

---

## 1-1. Iam Mfa {#section-1-1}

*📖 [← Back to Table of Contents](#-table-of-contents)*

### Multi Factor Authentication

- `psd + mfa device ==> login succeess`

- `mfa device : Google auth (phone only ) or authy (for all devices)`

---

## 1-2. User Access {#section-1-2}

*📖 [← Back to Table of Contents](#-table-of-contents)*

# 3 Ways to access AWS :

1) AWS management console 
2) AWS CLIENT ( CLI ): protected by access key
3) AWS API (SDK): for code protected  by access key

### ACCESS KEYS : Every User has his own access key
-  genereated through AWS console
-  USer responsible for their own access key

- `Access Key ID `: USER name
- `Secret Access Key` : passwor- d

- these key are used to access AWS console

---

## 1-3. Iam Role {#section-1-3}

*📖 [← Back to Table of Contents](#-table-of-contents)*

## Role:

1) Roles are used by aws services not by users
2) Each service will be given role EX. if EC2 instance wants to acees dynamoDB
   then EC2 will be assigned a ROle to get access of dynamoDB AWS Service .

## Common Roles:

1) EC2 Insatnce roles
2) Lambda Fucntion roles
3) Roles for CloudFormation

---

## Create Roles:

### - Roles are created for Sevice for specific persmissions for short duration
1) choose role
2) give persmissions
3) create ROle

- In summary, IAM roles are entities with associated policies that define permissions. The policies attached to a role determine what actions entities assuming the role can perform. IAM policies, on the other hand, can be attached directly to users, groups, roles, or resources to define their permissions.

---

## 1-4. Iam Security Tools {#section-1-4}

*📖 [← Back to Table of Contents](#-table-of-contents)*

1) IAM Credentials Report ( account-level )

2) IAM Access Advisor ( User-level )

---

## 3. Aws Cicd Serverless {#section-3}

*📖 [← Back to Table of Contents](#-table-of-contents)*

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

---

## 3. Ssh {#section-3}

*📖 [← Back to Table of Contents](#-table-of-contents)*

## SSH : MAC/LINUX/windows10
## putty: windows<10
## EC2 Insatnce connect: using browsers

 ##  SSH using Linux or MAC

1) EC2 instance running will have inbound rule for PORT 22 which for SSH communication

2) download .pem file from there (remove space from name)
3) use public IP of EC2 instance
4) command:
    ```bash
    ssh ec2-user@_publicIP_
    ```
5) use cmd where .pem file 
   ```bash
    ssh -i name_.pem ec2-user@_publicIP_
   ```
   if fails 
   cmd :
   ```bash
    chmod 0400 name_.pem
   ```
   ```bash 
   ssh -i name_.pem ec2-user@_publicIP_
   ```

6) cmd :exit
   ```bash 
   exit
   ```

--------------------------
##   SSH using windows10
1) cmd : ssh -i name_.pem ec2-user@_publicIP_
2)

---

## 999. Advanced Lambda Optimization Guide {#section-999}

# Advanced Lambda Optimization Guide

## Introduction
This comprehensive guide covers advanced optimization techniques for AWS Lambda functions in production environments.

## Performance Optimization

### Memory Configuration
- Start with 128MB and adjust based on performance tests
- Monitor CloudWatch metrics for optimization opportunities

### Cold Start Reduction
- Use provisioned concurrency for critical functions
- Keep function code lightweight
- Minimize external dependencies

## Security Best Practices

### IAM Permissions
- Follow principle of least privilege
- Use specific resource ARNs instead of wildcards
- Regularly audit and rotate credentials

### Environment Variables
- Use AWS Systems Manager Parameter Store for sensitive data
- Encrypt environment variables at rest

## Monitoring and Logging

### CloudWatch Integration
- Set up appropriate log retention policies
- Use structured logging with JSON format
- Monitor key metrics: duration, errors, throttles

### X-Ray Tracing
- Enable X-Ray for distributed tracing
- Analyze performance bottlenecks
- Track downstream service calls

## Cost Optimization

### Resource Management
- Right-size memory allocation
- Use appropriate timeout values
- Leverage Lambda layers for shared code

### Pricing Considerations
- Monitor request count and duration
- Consider Savings Plans for predictable workloads
- Use CloudWatch dashboards for cost tracking

## Conclusion

Following these best practices will help you build robust, performant, and cost-effective Lambda functions that scale with your business needs.

---

## 999. Aws Ecs Complete Cicd {#section-999}

# CI/CD and Container Orchestration with Amazon ECS

## CI/CD Workflow

### Build Phase:
In the CI/CD pipeline, you build your application, create a Docker image, and push that image to a container registry (e.g., Amazon ECR).

## Container Orchestration

### ECS Task Definition:
In Amazon ECS, you define a task using a task definition. The task definition includes details such as which Docker image to use, the resources allocated to the task, environment variables, etc.

### Service Definition (Optional):
Optionally, you can define an ECS service, which is used to maintain a specified number of instances of a task definition simultaneously.

### Launching Containers:

#### Task Launch:
When you launch a task in ECS, you specify the task definition to use.

#### ECS Cluster and Agent:
The task runs on an ECS cluster, which consists of EC2 instances or Fargate tasks. Each EC2 instance has the ECS agent installed.

#### Image Pull:
The ECS agent pulls the specified Docker image from the container registry (e.g., Amazon ECR) onto the instance.

#### Container Start:
The ECS agent starts the container on the instance, running the application defined in the Docker image.

### Service Management (Optional):

#### ECS Service (Optional):
If you're using an ECS service, it manages the desired number of tasks, handles rolling updates, load balancing, and potentially auto-scaling based on the task definition.

## Workflow Recap:

### CI/CD Phase:
In CI/CD, you build and push Docker images to a container registry.

### ECS Phase:
In ECS, you define a task definition specifying which Docker image to use.
- You launch a task in an ECS cluster, and the ECS agent pulls the specified Docker image onto the instance.
- The ECS agent starts the container using the Docker image, effectively running your application.
- Optionally, if you're using an ECS service, it manages the lifecycle and scaling of the tasks.

## Key Points:

### Separation of Concerns:
- **CI/CD** focuses on building and packaging your application into a Docker image and pushing it to a registry.
- **ECS** focuses on running and managing containers based on task definitions.

### ECS Cluster:
The ECS cluster provides the underlying infrastructure for running containers, and the ECS agent on each instance facilitates container orchestration.

By combining CI/CD with ECS, you achieve a continuous delivery pipeline where your application, packaged in Docker images, is seamlessly deployed and run on AWS infrastructure, allowing for scalability, reliability, and efficient resource utilization.

---

## Summary:

### CI/CD Pipeline:
- Builds and pushes Docker images to a container registry.

### ECS Task Definition:
- Defines the parameters for running a Docker container, including the Docker image reference.

### Task Definition Update:
- Updates the task definition to use a new version of the Docker image.

### ECS Service Update (Optional):
- If using an ECS service, updates the service to use the latest task definition.

### ECS Cluster Update:
- ECS automatically pulls the updated Docker image onto instances or infrastructure and starts new containers.

This separation of concerns allows CI/CD pipelines to focus on building and packaging applications into Docker images, while ECS handles the deployment and management of containers based on task definitions. It enables a scalable and automated approach to deploying containerized applications in a production environment.

---

## 999. Aws Networking Vpc Subnet Sg {#section-999}

------------------------------------------------------------

### VPC ==> HAS security Group 

## SECURTIY GROUP: works as virtual firewall 
- gives access to inbound and outbound rule
- `RULES` - fundamental unit for security Group
- `Rules`: Specify the following for each rule:
   - `Type`: The type of traffic (similar to inbound rules).
   - `Protocol`: The protocol used for the traffic.
   - `Port Range`: The port or range of ports.
   - `Destination`: The destination IP address or range to which traffic is allowed.

--------------------------------------
```
Sequence for route in AWS :
1] cloud --> Internet Gateway -->( VPC starts ) ROUTE Table (for each subnet and has config for from to ip)
 --> security Group ( attached to each instance ) --> Resource

+------------------------+      +------------------------+
|     Internet Cloud    |       |     Internet Cloud    |
+------------------------+      +------------------------+
           |                                |
     +-----+-----+                     +-----+-----+
     |  Subnet 1  |                    |  Subnet 2  |
     +------------+                    +------------+
     |   Route    |                    |   Route    |
     |   Table    |                    |   Table    |
     +------------+                    +------------+
           |                                |
     +-------------+                   +-------------+
     | EC2 Instance|                   | EC2 Instance|
     | + Security  |                   | + Security  |
     |   Group     |                   |   Group     |
     +-------------+                   +-------------+
    
2]  cloud --> Internet Gateway -->( VPC starts ) ROUTE Table (for each subnet and has config for from to ip)
 -->ALB/NLB --> Target Group [decides instance] --> security Group ( attached to each instance ) --> Resource

+------------------------+      +------------------------+
|     Internet Cloud    |       |     Internet Cloud    |
+------------------------+      +------------------------+
           |                                |
     +-----+-----+                     +-----+-----+
     |  Subnet 1  |                    |  Subnet 2  |
     +------------+                    +------------+
     |   Route    |                    |   Route    |
     |   Table    |                    |   Table    |
     +------------+                    +------------+
           |                                |
     +-------------+                  +-------------+
     |   ALB/NLB   |                  |   ALB/NLB   |
     | + Target    |                  | + Target    |
     |   Group     |                  |   Group     |
     +-------------+                  +-------------+
           |                                   |
     +-------------+                  +-------------+
     | EC2 Instance|                  | EC2 Instance|
     | + Security  |                  | + Security  |
     |   Group     |                  |   Group     |
     +-------------+                  +-------------+
```

---

## 999. Cloudwatch {#section-999}

> ## 3 main parts:

1) Log event
2) Log Groups
3) Log streams

-----------------------------------------------------------
> ## general process:

```
1. Ec2 + filebeat       -->    _ Ec2 / Container + Logstash --> Cloudwatch / Kibana
2. Container + filebeat -->    _ Ec2 / Container + Logstash --> Cloudwatch / Kibana
```
-----------------------------------------------------------

> ## Q1. So filebeat ships logs to logstsash right

- Yes, that's correct. Filebeat is a lightweight log shipper that is commonly used to collect, parse, and forward log files to various destinations, including Logstash. 
- When you set up Filebeat on your EC2 instances or containers, it reads log files or log events and sends them to Logstash for further processing.

> ### Here's a simplified overview of the process:

1. `Filebeat Configuration`:
   - Filebeat is configured with a list of log files or paths to monitor.It is also configured with the address of the Logstash server to which it should forward the log data.yaml

    -  `filebeat.inputs`:
        ```
        - type: log
          paths:
            - /path/to/your/logs/*.log
        output.logstash:
          hosts: ["logstash-server:5044"]
        ```
2. `Filebeat Operation:`
   - Filebeat continuously monitors the specified log files for changes or new log entries.
   - When new log events are detected, Filebeat reads and ships them to the Logstash server.

3. `Logstash Processing:`
   - Logstash, on the central server, receives the log events from Filebeat.Logstash can then apply filters, parse the logs, and perform additional processing based on the configuration.

      ```
      input {
        beats {
          port => 5044
        }
      }
      filter {
        # Add filters as needed
      }
      
      output {
        cloudwatch_logs {
          log_group_name => "your-log-group-name"
          log_stream_name => "your-log-stream-name"
          # Add other CloudWatch Logs settings
        }
      }
      ```
4. `Logstash Output:`
    - Logstash outputs the processed log events to the specified destination, which, in this case, is CloudWatch Logs based on the provided configuration.
    
    - This setup allows you to centralize log collection, processing, and forwarding, making it easier to manage logs from multiple sources. Adjustments to the configurations can be made based on your specific use case, log formats, and requirements.

---

## 999. General Deployment Process {#section-999}

> ### Q1. so lets consider you are a aws devops engineer so can u explain me about general deployment process in which I have connected one bitbucket repo to code pipeline and need to deploy a ecs insatance with loadbalncer so what can be general process and it also generates logs which gets logged in one folder so I know there one JSON file which containes details about this image so it can generate conatiner and run it also know  that logs releated configuration are also done in that only and loadbalncer points  to that JSON file so can  u explain in details how this all happens
ChatGPT



- Certainly! The deployment process you described involves several AWS services, including AWS CodePipeline, Amazon ECS (Elastic Container Service), and possibly AWS Elastic Load Balancer (ELB). 
>### Here's a general overview of the deployment process:


1. `Code Repository Setup (Bitbucket):`

   - Your application code is stored in a Bitbucket repository.

2. `AWS CodePipeline Setup:`



   - Create an AWS CodePipeline to automate the continuous delivery process.
   
   - Configure the source stage of CodePipeline to connect to your Bitbucket repository.
   - Define a build stage (optional) where you can build and package your application.
   - In a containerized environment, this could involve creating a Docker image.
ECS Task Definition:
   - Define an ECS task definition that describes how your Docker container should run.
   - This definition includes details such as the Docker image, container port, environment variables, etc.

3. `ECS Service Setup:`
    - Create an ECS service that uses the task definition.
    - Configure the service to run a specified number of tasks and possibly set up auto-scaling.
4. `Elastic Load Balancer (Optional):`
    - If you're using a load balancer, create an Elastic Load Balancer (ELB).
    - Configure the ELB to distribute traffic across the ECS instances.

5. `Deployment Configuration:`
   - Configure CodePipeline to deploy your application to ECS.
   - Define a deployment stage that uses an ECS deploy action.
   - Specify the ECS cluster, service name, and task definition to use for the deployment.
6. `Logs Configuration:`
   - Configure your ECS task definition to send logs to AWS services like Amazon Cloud Watch Logs.
   - Define a log group for your application's logs in CloudWatch.
   - 
7. `JSON File and Configuration:`
   - If you have a specific JSON file that contains configuration details for your application, ensure that it is part of your Docker image or is available during runtime.
   - The ECS task definition can include environment variables or mount volumes for providing configuration files to the containers.
8. `Execution and Logs:`

   - CodePipeline will trigger the deployment process when changes are pushed to the Bitbucket repository.
   - ECS will launch new tasks or update existing tasks based on the new task definition.
   - Logs generated by your application will be sent to the configured log group in CloudWatch Logs.
9. `Monitoring and Troubleshooting:`
   - Monitor your ECS cluster and services using CloudWatch metrics.

   - Use CloudWatch Logs for troubleshooting and analyzing logs generated by your  application.
   - It's essential to adapt this process to the specific needs and architecture of your application. Additionally, you might want to consider integrating AWS Systems Manager Parameter Store or AWS Secrets Manager for managing sensitive configuration values securely.

---

## 999. Lambda Best Practices Demo {#section-999}

# AWS Lambda Best Practices

## Introduction
Here are the essential best practices for AWS Lambda development and deployment.

## Performance Optimization

### Memory Configuration
- Start with 128MB and adjust based on performance tests
- Monitor CloudWatch metrics for optimization opportunities

### Cold Start Reduction
- Use provisioned concurrency for critical functions
- Keep function code lightweight
- Minimize external dependencies

## Security Best Practices

### IAM Permissions
- Follow principle of least privilege
- Use specific resource ARNs instead of wildcards
- Regularly audit and rotate credentials

### Environment Variables
- Use AWS Systems Manager Parameter Store for sensitive data
- Encrypt environment variables at rest

## Monitoring and Logging

### CloudWatch Integration
- Set up appropriate log retention policies
- Use structured logging with JSON format
- Monitor key metrics: duration, errors, throttles

### X-Ray Tracing
- Enable X-Ray for distributed tracing
- Analyze performance bottlenecks
- Track downstream service calls

## Cost Optimization

### Resource Management
- Right-size memory allocation
- Use appropriate timeout values
- Leverage Lambda layers for shared code

### Pricing Considerations
- Monitor request count and duration
- Consider Savings Plans for predictable workloads
- Use CloudWatch dashboards for cost tracking

## Conclusion

Following these best practices will help you build robust, performant, and cost-effective Lambda functions that scale with your business needs.

---

### 0. Aws Api Gateway {#section-0}

> **📁 Topic: Api Gateway**

## AWS ApiGateway:

## Terms:

### API keys:
In AWS API Gateway, API keys are used to `control and track acces`s to your APIs—especially when:

- You want to `limit` who can access your APIs.
- You want to `monitor` usage per client (e.g., for rate limiting, throttling, analytics).
- You want to `associate usage plans` with different API consumers.
###

---

### 0. Aws Codepipeline {#section-0}

> **📁 Topic: CICD**

## CodePipeline:
```text
REPO [cicd]
   | 
Codepipeline [detects_changes] -pooling/webhook 
   |
Codebuild [takes code from codepipeline and builds]
   |
Codedeploy/ECS [for deployment]
```
### Q. Do codepipeline pulls repo code from specific branch?
- Yes
- pulls code and gives as artifact to next build stage
- Ex. pulls code from cicd of repo gives to codebuild
### Q. Do codebuild takes code from codepipelne in above structure?
- yes
- So it maintains consistant code even if new code is merged it will be new deployment

---

### 0. Ec2 {#section-0}

> **📁 Topic: EC2**

## EC2 :

### select: 
```
        1) OS 
        2) CPU
        3) RAM
        4) storage : Network + hardware
        5) Network card 
        6) Firewall rules : security groups
```
> EC2 user data : to start task
    - used for automating task

----------------------------------
## Launch EC2:

> 1) `instance - launch new instance`
> 2) `name and Tags`
> 3) `OS image `
> 4) `instance types ( ex. t2.micro)`
> 5) `key pair` : used for SSH utility - create -> name + RSA + format : .pem(all os) / .ppk(puTTY windows -7,8) -> crrate
> 6) `Network` 
>    - add security Groups (for allowig network traffic)
>    - allow SSH / HTTP/ https from internet
> 7) `configure storage`
> 8) `Advanced details`: User data: commands to execute for only once and only at start
> 9) `summary` 
> 10) `LAUNCH` instance

---------------------------------
## After LAUNCH :- 
> 1. it has public and Private Ips to access the instance
> 2. public IP changes every time instance statrs after stopped.
> 3. private IP: constant

## EC2 Types: 7 
-  why? compute + Memory + Networking
```
   Ex: m5.2xlarge: 
    -  m: instance class
    -  5: Generation
    -  2xlarge: size within instance class
```

---

### 0. How Ecs Auto Scales {#section-0}

> **📁 Topic: ECS**

# 🚀 How Scaling Works in ECS with EC2 (Launch Type)
## 1️⃣ Each ECS Task Runs on an EC2 Instance

- ECS schedules tasks (containers) on EC2 instances based on available CPU/RAM.
- Different tasks can have different CPU usage.
## 2️⃣ Load Balancer (ALB) Diverts Traffic

- ALB does NOT monitor CPU utilization directly.
- ALB only distributes traffic based on request load and health checks.
- If a task is overloaded (CPU > 80%), ALB does NOT "move" traffic by itself. Instead:
   - The task may respond slower due to high CPU usage.
   - ECS autoscaling must be triggered to add more capacity.
## 3️⃣ CloudWatch & ECS Auto Scaling Kick In

- CloudWatch monitors CPU utilization **`it takes data from ECS or EC2`** 
- If CPU > 80% for 2 minutes:
- CloudWatch Alarm triggers ECS Service Auto Scaling.
- ECS scales tasks (adds new containers).
- If new tasks don’t fit on existing instances, then:
   - EC2 Auto Scaling Group (ASG) triggers a new EC2 instance.
   - ECS places new tasks on the new instance.
## 4️⃣ Scaling Down (Reducing Instances or Tasks)

- If CPU < 30% for a certain time:
  - ECS Service Auto Scaling removes extra tasks.
  - If instances are underutilized, EC2 Auto Scaling may terminate instances (but only if tasks can be rescheduled elsewhere).
- Key point:
  - ECS will never scale down if all running tasks are using > 80% CPU.
  - Only when CPU remains low for some time, it removes tasks/instances.

---

### 0. How Ecs Ec2 Task Scales {#section-0}

> **📁 Topic: ECS**

## 1️⃣ Relationship Between ECS, EC2, and Tasks
- ECS Cluster = Group of EC2 instances (if using the EC2 launch type).
- EC2 Instance = A virtual machine inside the ECS cluster that runs multiple ECS tasks (containers) based on available CPU & memory.
- ECS Task = A running container (or multiple containers in a task definition).
- Hierarchy:
  >  `🚀 ECS Cluster (Parent) → 🖥️ EC2 Instances (Workers) → 📦 ECS Tasks (Containers)`

## 2️⃣ How Tasks Are Placed on EC2 Instances?
- When an ECS task starts, ECS checks if any existing EC2 instance has enough CPU & RAM.
- If there is space, the task starts on that instance.
- If no instance has enough resources, the task fails to start (if no auto scaling is enabled).
- If ECS auto scaling is enabled, a new EC2 instance will be launched to fit the new task.
## 3️⃣ What Happens If a Task Fails to Start?
### 🔹 Scenario 1: Enough Resources Available
- ✅ Task is placed on an existing EC2 instance.

### 🔹 Scenario 2: No Space Left on Any EC2 Instance
- ❌ Task fails → EC2 Auto Scaling Group (ASG) adds a new instance → ECS places the task on the new instance.

### 🔹 Scenario 3: Scaling Down

- If CPU utilization is low for a while, ECS removes some tasks.
- If EC2 instances are underutilized, EC2 Auto Scaling can remove unused instances (if tasks can fit elsewhere).
#
## 🔑 Key Takeaways
- ✅ One ECS Cluster → Can have multiple EC2 instances.
- ✅ One EC2 Instance → Can run multiple ECS Tasks (if it has enough resources).
- ✅ If tasks cannot start due to lack of CPU/RAM, ECS triggers EC2 Auto Scaling to add a new instance.
- ✅ Tasks & instances scale down when CPU usage remains low for a while.

---

### 0. How Lamdba Works {#section-0}

> **📁 Topic: Lambda**

# AWS Lambda Container Reuse

- For SAM and Lambda:check sam deployment
## How Lambda Containers Work

### Cold Start
When an AWS Lambda function is invoked for the first time (or after a long period of inactivity), AWS creates a new container to execute the function. This process involves:

- Initializing the runtime environment (e.g., Node.js, Python, etc.).
- Running any initialization code outside the handler function (e.g., setting up database connections, loading libraries, etc.).
- This process adds latency to the first invocation and is called a **cold start**.

### Warm Start
After the function completes execution, the container does not immediately shut down. Instead, AWS keeps it warm (active) for a period of time (typically a few minutes, though the exact duration is not guaranteed).

- If another request arrives while the container is still warm, AWS **reuses the same container** to handle the request.
- This avoids the overhead of reinitializing the runtime and the code, resulting in **faster execution**.
- This is called a **warm start**.

### Timeout and Shutdown
If no requests arrive for a while, AWS may terminate the container to free up resources. The next invocation will then trigger a **cold start**.

## Handler Code Execution
- The code inside the **handler function** runs for every invocation of the Lambda function.
- Any code outside the handler function is executed only once when the container is initialized (during cold start).

## Reusing Resources
To optimize performance, resources like database connections, HTTP clients, or in-memory caches can be initialized **outside the handler** and reused across multiple invocations within the same container.

## Benefits of Container Reuse
### 1. Improved Performance
- Avoids the overhead of reinitializing resources (e.g., database connections) for every invocation.
- **Warm starts** are significantly faster than cold starts.

### 2. Cost Efficiency
- Reduces the time spent on initialization, which can **lower execution costs**.

### 3. Resource Sharing
- Allows **sharing of resources** (e.g., database connections, caches) across multiple invocations within the same container, improving efficiency and responsiveness.

---

### 0. Lambda Limits 0 {#section-0}

> **📁 Topic: Lambda**

### Max Execution Time: 900 sec = 15 min
### Input event limit: 256kb
# 🔹 AWS Lambda Limits (2024)

AWS Lambda has **soft limits** (adjustable) and **hard limits** (fixed). Below is a breakdown of key limits:

---

## 🔹 1. Execution Limits

| **Limit**                                  | **Value** |
|--------------------------------------------|----------|
| **Max Execution Time (Timeout)**           | 900 seconds (15 minutes) |
| **Memory Allocation**                      | 128MB – 10GB |
| **Ephemeral Storage (/tmp disk)**          | 512MB – 10GB (configurable) |
| **Max Deployment Package Size (direct upload)** | 50MB (compressed), 250MB (uncompressed) |
| **Max Deployment Package Size (with layers)** | 250MB + up to 5 layers (50MB each) |
| **Max Environment Variables Size**         | 4KB |

---

## 🔹 2. Invocation & Concurrency Limits

| **Limit**                                   | **Value** |
|---------------------------------------------|----------|
| **Max Requests per Second (RPS) per function** | No strict limit (depends on concurrency) |
| **Max Concurrent Executions (soft limit)**  | 1,000 per AWS account (adjustable) |
| **Burst Scaling (per Region)**              | 500 – 3,000 (varies by Region) |
| **Max Event Payload Size (synchronous)**    | 6MB |
| **Max Event Payload Size (asynchronous - S3, SQS, etc.)** | 256KB |

💡 **Note:** If traffic exceeds the burst limit, AWS automatically scales up, but throttling may occur if concurrency is exhausted.

---

## 🔹 3. Networking & Execution Environment

| **Limit**                               | **Value** |
|-----------------------------------------|----------|
| **Max /tmp Storage (Ephemeral Disk)**   | 512MB – 10GB |
| **Max Execution Time of Init Code (Provisioned Concurrency)** | 10 minutes |
| **Max Number of File Descriptors (open files)** | 1,024 |
| **Max Number of Threads**               | 1,024 |
| **Max Network Bandwidth**               | 10Gbps (scales with memory) |

---

## 🔹 4. AWS Lambda Throttling

- If the concurrency limit is reached, **new Lambda invocations get throttled**.
- Throttled requests return a **429 error (TooManyRequestsException)**.
- **For asynchronous invocations** (S3, SQS, EventBridge), AWS automatically retries **up to 2 times**.

---

## 🔹 5. AWS Lambda Limits per Event Source

| **Event Source**         | **Limitations** |
|--------------------------|----------------|
| **API Gateway**          | 30 sec timeout |
| **SQS (Standard)**       | Max batch size: 10,000 (default: 10) |
| **SQS (FIFO)**           | Max batch size: 10 (fixed limit) |
| **DynamoDB Streams**     | Max batch size: 1,000 |
| **Kinesis Streams**      | Max batch size: 10,000 |

---

## 🔹 6. AWS Lambda Cost Optimization

| **Cost Factor**    | **Considerations** |
|--------------------|-------------------|
| **Free Tier**      | 1M free requests + 400,000 GB-seconds per month |
| **Compute Pricing** | $0.00001667 per GB-second |
| **Request Pricing** | $0.20 per 1M requests |

---

## 🔹 How to Optimize Usage?

1️⃣ **Keep execution time low** → Use **Step Functions** for long-running tasks.  
2️⃣ **Optimize concurrency** → Use **SQS batching**, avoid **cold starts**.  
3️⃣ **Adjust memory intelligently** → Higher memory **reduces execution time**, optimizing cost.  
4️⃣ **Use Provisioned Concurrency** → Reduces **cold starts**, but incurs extra cost.  
5️⃣ **Compress deployment package** → Keep package size **under 50MB** to avoid slow cold starts.  

---

---

### 0. Lambda Limits 1 Summary {#section-0}

> **📁 Topic: Lambda**

# 🔹 AWS Lambda: Synchronous vs. Asynchronous Invocation

## 🔹 1. Synchronous Invocation (Max Payload: 6MB)

**Triggered by:** API Gateway, ALB, AWS SDK, etc.  
**Behavior:** The client waits for a response before proceeding.  

### ✅ Use Cases:
- Real-time requests (e.g., REST APIs, user interactions).  

### ✅ Advantages:
✔️ Larger payload (up to **6MB**).  
✔️ Immediate response.  

### ❌ Disadvantages:
❌ **API Gateway has a 30-second timeout**.  
❌ More prone to client-side delays.  

---

## 🔹 2. Asynchronous Invocation (Max Payload: 256KB)

**Triggered by:** S3, SNS, EventBridge, SQS, Step Functions, etc.  
**Behavior:** The client doesn’t wait for a response (fire-and-forget).  

### ✅ Advantages:
✔️ No client-side timeout issues.  
✔️ Automatic **retries on failure** (up to **2 retries**).  
✔️ Works well for **event-driven processing**.  

### ❌ Disadvantages:
❌ **Smaller payload limit** (**256KB**).  
❌ No immediate response (**must check logs or use a status queue**).  

---

## 🔹 Difference in Payload Size for Synchronous vs. Asynchronous Invocations

| **Invocation Type**       | **Max Payload Size** |
|--------------------------|----------------------|
| **Synchronous Invocation** | **6MB** |
| **Asynchronous Invocation** | **256KB** |

---

## 🔹 How to Handle Large Payloads in Async Invocations?

If your event payload **exceeds 256KB**, use:

✅ **S3** → Store large data, pass the **object key** instead.  
✅ **DynamoDB / RDS** → Store request data and process via Lambda.  
✅ **SQS Large Message Handling** → Store large messages **via S3** and pass a reference.  

---

# 🔹 Summary of Payload Limits Based on Invocation Type

| **Event Source**                  | **Invocation Type** | **Max Payload Size** |
|------------------------------------|---------------------|----------------------|
| **API Gateway (REST & HTTP APIs)** | Synchronous        | **6MB**              |
| **Application Load Balancer (ALB)** | Synchronous        | **6MB**              |
| **AWS SDK (`invoke` method)**      | Synchronous        | **6MB**              |
| **AWS SDK (`invokeAsync` method)** | Asynchronous       | **256KB**            |
| **S3 Event Notification**          | Asynchronous       | **256KB**            |
| **SNS Event Notification**         | Asynchronous       | **256KB**            |
| **SQS Message**                    | Asynchronous       | **256KB**            |
| **EventBridge Event**              | Asynchronous       | **256KB**            |

🚀 **Key Takeaways:**
- **Synchronous Invocations** (e.g., API Gateway, ALB, AWS SDK `invoke`) support **up to 6MB** payload.  
- **Asynchronous Invocations** (e.g., S3, SNS, SQS, EventBridge, AWS SDK `invokeAsync`) have a **256KB** payload limit.  

📌 **Need to handle large payloads in async Lambda?**  
- Store large data in **S3/DynamoDB** and pass a reference instead!

---

### 0. Sqs 0 {#section-0}

> **📁 Topic: SQS**

## Amazon SQS Message Limits

| Feature                  | Default   | Maximum   |
|--------------------------|----------|----------|
| **Retention Period**     | 4 days   | 14 days  |
| **Message Size**        | 256 KB   | 256 KB   |
| **Storage for Large Messages** | SQS Extended Client (S3) | SQS Extended Client (S3) |

 
#

## 📌 SQS Message Retention & Size Limits
### 1️⃣ How long can SQS hold messages?
- Default retention: 4 days
- Maximum retention: 14 days (you can configure this)
- After this time, unprocessed messages are deleted automatically.
- ✅ `You can set the retention period in SQS settings`.
### 2️⃣ What is the message size limit?
- Max size per message: 256 KB
- If your message exceeds 256 KB, you have two options:
   - Use S3 for large payloads: Store data in S3 and send the S3 URL in the SQS message.
   - Use SQS Extended Client Library: It stores large messages in S3 automatically.
- ✅ If your message is small (just an ID or small payload), SQS works fine.


### 3️⃣ What happens if messages are not processed?
- If a message is not processed before the retention period, it gets deleted automatically.
- To prevent data loss:
   - Use Dead Letter Queue (DLQ) to capture unprocessed messages.
   - Set up CloudWatch alerts to monitor message backlog.

#

## Q. batchSize means max iteams that sqs will take at a time and maximum Batching window is time that this sqs will wait to fill the toatl batch size iteams in sqs
- Yes, you are correct. Let's break down the concepts of batchSize and maximumBatchingWindow in the context of AWS Lambda and SQS integration:

## `batchSize`
### Definition:
- The batchSize parameter specifies the maximum number of messages that AWS Lambda will retrieve from the SQS queue in a single batch.
- How many messages are fetched per poll request by the consumer.
### Usage:
- This determines how many messages the Lambda function will process in one invocation.
### Example: 
- If batchSize is set to 10, the Lambda function will process up to 10 messages at a time.
## `maximumBatchingWindow`
### Definition: 
- The maximumBatchingWindow parameter specifies the maximum amount of time (in seconds) that Lambda will wait to fill the batch with the specified batchSize of messages before invoking the function.
### Usage: 
- This helps in optimizing the invocation of the Lambda function by allowing it to wait for more messages to arrive, up to the specified batch size, before processing.
### Example: 
- If maximumBatchingWindow is set to 60 seconds, Lambda will wait up to 60 seconds to gather messages before invoking the function, even if the batch size is not yet reached.
## How They Work Together
### Batch Size: 
- Determines the maximum number of messages processed per invocation.
### Batching Window: 
- Determines how long Lambda will wait to fill the batch before invoking the function.

---

### 0. Targetgroup {#section-0}

> **📁 Topic: TagretGroup+ALB+ECS**

```
ECS --> Service -- Task Defination --> Tasks <-- Target Group <-- ALB
 |                                                  ^
 |                                                  |
  --------------------------------------------------
```

---

### 0-1. Db Connection {#section-0-1}

> **📁 Topic: Lambda**

> if connection is closed when execution is done will it be good I mean as u said a lambda once executed it's container still will be running to take other tasks it means if will make connection close it will reestablish for second right but if connection is not closed issue will be connection exhausted right if there are 5 lambda functions and connection limit is 5 it means it's fine and it will be like there are continuous 25 request it will not make new 25 connections but will use existing connections so possible number of connection request to db <=25 but if connection is closed after each request possible number of connection request to db ==25 right

# 🔹 Best Practices for Handling Database Connections in AWS Lambda

## 1️⃣ Understanding Lambda’s Execution Model
- A **Lambda container** is reused for multiple invocations if it remains warm.
- **DB connections persist** across warm invocations when defined outside the handler.
- If a DB connection is **closed after each request**, it must be reestablished, leading to **higher latency** and **unnecessary overhead**.

## 2️⃣ Connection Handling Strategies

### 🔴 Closing Connection After Each Request (❌ Not Recommended)
#### **Impact:**
- Every invocation creates a **new DB connection** and closes it afterward.
- If **25 concurrent requests** occur, it results in **25 new DB connections**.
- **High latency** due to frequent connection establishment.
- **Database overhead** from handling excessive new connections.

---

## 3️⃣ Recommended Strategy: 
✅ Keeping Connections Open
### **How It Works:**
- Define the **database connection outside the Lambda handler**.
- This allows connection **reuse across multiple invocations** when the Lambda remains warm.

### **Example: Using MySQL with Node.js (TypeORM)**
```typescript
import { DataSource } from "typeorm";

const dbConnection = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: ["./entities/*.ts"],
});

let isConnected = false;

export const handler = async (event) => {
  if (!isConnected) {
    await dbConnection.initialize();
    isConnected = true;
  }

  const userRepository = dbConnection.getRepository("User");
  const users = await userRepository.find();

  return {
    statusCode: 200,
    body: JSON.stringify(users),
  };
};
```
# 4️⃣ Additional Optimization Tips
✅ Use Connection Pooling
Instead of a single connection, use a pool to manage connections efficiently.

Example: Using mysql2 with connection pooling

```typescript
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,  // Adjust based on expected concurrency
  queueLimit: 0,
});

export const handler = async (event) => {
  const connection = await pool.getConnection();
  
  try {
    const [rows] = await connection.query("SELECT * FROM users");
    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } finally {
    connection.release(); // Always release back to the pool
  }
};
```
## 5️⃣ Key Takeaways

| **Approach**                     | **Performance** | **Latency**  | **DB Load**      | **Recommended?**          |
|----------------------------------|---------------|------------|----------------|-------------------------|
| **Closing DB Connection Per Request** | ❌ Poor        | ❌ High     | ❌ High         | 🚫 No                   |
| **Keeping DB Connection Open**  | ✅ Good       | ✅ Low      | ✅ Optimized    | ✅ Yes                  |
| **Using Connection Pooling**    | 🔥 Best       | 🔥 Lowest  | 🔥 Efficient   | ✅ Highly Recommended   |
| **Using RDS Proxy**             | 🔥🔥 Best for High Load | 🔥🔥 Very Low | 🔥🔥 Very Efficient | ✅✅ Best for Production |

---

---

### 1. Ec2 Secutitygroups {#section-1}

> **📁 Topic: EC2**

## Security Groups : for Network security in AWS
- `controls`: traffic allowed into or out of EC2 instance
- It can have : 
- It contains ALLOW rules only as by default in comming traffic is forbidden
   1) security group [or]
   2) IP address
- `Firewall`
- `Regulets`: 
   - Acces to port
   - authorized Ip ranges Ipv4 or Ipv6
   - control of inbound network ( from other to instance)
   - control of outbound network
- can be attached to multiple instances
- attached tp region/VPC
- good to maintain seperate SG for SSH access
- if response not getting it means SG issue
----------------------------------------------------------
## How to create Security group

1) `crate Insatnce of Ec2`
2) `go to Network & Security`
3) `got to Secure group`
4) `inbound rules` : from outside to instance     - here you have to add/DELETE security group TYPE
5)  `outbound rules` : from Insatnce to outside


----------
## Example:
```
EC2 instance A-- has SG1 allows inbound from - SG1 + SG2                           
EC2 instance B -has SG2 
Ec2 instance C -has SG1
            B ---->  A
            C ---->  A
now instance A allows instance B and C to be in inbound rule 
it means instance C and B can send data to instance A
```
--------
##   PORTS 
```
22= SSH - log in LINUX
21 = FTP 
22 = SFTP - upload file using SSH
80 = HTTP
443 = HTTPS
3389 = RDp - Remote Desktop protocol - log in windows
```

-----
## Q.1.Do roles and Security groups in aws are used for access management

ChatGPT
- Yes, both IAM (Identity and Access Management) roles and security
groups in Amazon Web Services (AWS) are used for access management, 
but they serve different purposes and are used in different contexts.

- `IAM Roles`: 
    - IAM roles are used to grant permissions to AWS services or entities (such as EC2 instances) rather than individual users. 
    - Roles allow you to define a set of permissions and then assign those permissions to AWS resources. 
    - This is useful for granting permissions to services or applications running on AWS resources without needing to manage long-term credentials like access keys. 
    - For example, you can create an IAM role that allows an EC2 instance to access an S3 bucket, and then associate that role with the instance. This enhances security and reduces the need to embed access credentials directly into your code or configuration.

- `Security Groups`: 
    - Security groups act as virtual firewalls for your AWS resources, controlling inbound and outbound traffic at the instance level. 
    - They are used to specify what types of traffic are allowed or denied to an EC2 instance, RDS instance, or other AWS resources. 
    - You can configure security groups to control access based on IP addresses, port ranges, and protocols.
    - Security groups are used to manage network-level access control for your resources.
- In summary, IAM roles are primarily used for managing permissions and 
access at the AWS service level, allowing you to grant permissions to 
resources or services themselves. Security groups are used to control 
network traffic and manage access at the instance level by specifying 
which types of traffic are allowed to reach the resource.

---

### 1. Scaling And Alb {#section-1}

> **📁 Topic: ECS**

# 1️⃣ How ALB Knows About ECS Tasks?
## Step 1: Target Group Registration
- ALB does not directly communicate with ECS tasks.
- Instead, it sends traffic to a Target Group (TG).
- ECS tasks (containers) register with the Target Group when they start.
- ALB forwards requests to the Target Group, which then routes traffic to healthy tasks.
```
User Request 🌎  
   │  
   ▼  
ALB (Application Load Balancer)  
   │  
   ▼  
Target Group (Holds ECS Tasks)  
   │  
   ├── Task A (Running on EC2 Instance 1)  
   ├── Task B (Running on EC2 Instance 2)  
   ├── Task C (Running on EC2 Instance 3)  
```

## Step 2: ECS Handles Task Registration Automatically
###  When a new ECS task is launched:
- ECS registers the task's IP/Port with the Target Group.
- ALB knows about this new task because the Target Group updates automatically.
- ALB starts sending traffic to the new task.
```
New Task X Started  
   ├── ECS registers Task X (IP: 10.0.1.12, Port: 8080) with Target Group  
   ├── ALB sees the new target in the group  
   └── ALB starts routing traffic to Task X 🚀  
```
## Step 3: Health Checks & Deregistration
- ALB performs health checks on all tasks.
- If a task fails (e.g., crashes, high latency), ALB removes it from the Target Group.
- ECS also deregisters tasks when they stop (e.g., scale down).
```
Task Y Crashes ❌  
   ├── ALB health check fails  
   ├── Task Y removed from Target Group  
   └── ALB stops sending traffic to Task Y  
```

# 2️⃣ Two Ways ALB Routes Traffic to ECS Tasks
## 1. Dynamic Port Mapping (Best for EC2 Launch Type)
- Each ECS task gets a random port on an EC2 instance.
- ALB uses a Target Group in "Instance Mode" to register tasks with their dynamic port.
```
EC2 Instance 1  
   ├── Task A (IP: 10.0.1.10, Port: 32768)  
   ├── Task B (IP: 10.0.1.10, Port: 32769)  
```
- The Target Group maps EC2 instance + port dynamically.
- ALB forwards traffic to the correct instance and port.
## 2. IP Mode (Best for Fargate)
- Each task gets its own private IP.
- ALB uses a Target Group in "IP Mode" and registers task IPs.
```
Task A (IP: 10.0.2.5, Port: 80)  
Task B (IP: 10.0.2.6, Port: 80)  
Task C (IP: 10.0.2.7, Port: 80)  
```
- ALB routes requests directly to task IPs.

# 3️⃣ Summary - How ALB Connects to ECS
- ✔ ALB uses a Target Group to track ECS tasks.
- ✔ ECS automatically registers tasks in the Target Group.
- ✔ ALB sends traffic based on Target Group health checks.
- ✔ Dynamic Port Mapping (EC2) → Routes via instance IP + port.
- ✔ IP Mode (Fargate) → Routes directly to task IP.

---

### 1. Scaling Scenerio {#section-1}

> **📁 Topic: ECS**

# ECS Cluster Architecture (EC2 Launch Type)

## 1️⃣ ECS Cluster with Multiple EC2 Instances  
ECS Cluster is a **parent** that manages EC2 instances.  
Each **EC2 instance** can run **multiple tasks**, depending on available resources.

```
ECS Cluster
│
├── EC2 Instance 1
│ ├── Task A 🟢 (Running)
│ ├── Task B 🟢 (Running)
│ └── Task C 🟢 (Running)
│
├── EC2 Instance 2
│ ├── Task D 🟢 (Running)
│ ├── Task E 🟢 (Running)
│ └── Task F 🟢 (Running)
│
└── EC2 Instance 3
├── Task G 🟢 (Running)
└── Task H 🟢 (Running)
```

---

## 2️⃣ Task Scheduling - How ECS Places Tasks on EC2 Instances  
- **Step 1:** ECS checks if an instance has enough **CPU & RAM**.  
- **Step 2:** If an instance has space, the task is placed there.  
- **Step 3:** If no instance has space, **ECS Auto Scaling triggers a new EC2 instance**.  
```
ECS Cluster
│
├── EC2 Instance 1 (80% CPU)
│ ├── Task A 🟢
│ ├── Task B 🟢
│ ├── Task C 🟢
│ └── Task X ❌ (FAILED: No CPU left)
│
├── EC2 Instance 2 (75% CPU)
│ ├── Task D 🟢
│ ├── Task E 🟢
│ ├── Task F 🟢
│ └── Task Y ❌ (FAILED: No CPU left)
│
└── Auto Scaling Triggers New Instance! 🚀
├── EC2 Instance 4 (New)
│ ├── Task X 🟢 (Now Running)
│ ├── Task Y 🟢 (Now Running)
│ └── More tasks can be added...

```

---

## 3️⃣ Load Balancer & Traffic Routing  
- ALB (Application Load Balancer) **distributes traffic across all running tasks**.  
- It **does NOT check CPU usage**, only spreads the request load.  
- If tasks are overloaded, **CloudWatch triggers auto scaling**.  
```
User Requests 🌎
│
├── Load Balancer (ALB)
│ ├── Routes request to Task A (Instance 1)
│ ├── Routes request to Task D (Instance 2)
│ ├── Routes request to Task G (Instance 3)
│ ├── If one instance is too slow, another task handles the request
│ └── New tasks auto-register with ALB
```

---

## 4️⃣ Auto Scaling - Adding & Removing EC2 Instances  
### **🔼 Scaling Up (More Traffic, CPU > 80%)**  
- **CloudWatch detects high CPU** usage on all tasks.  
- **EC2 Auto Scaling Group adds new instances**.  
- **New ECS tasks start** on new instances.  

### 🚀 High Traffic! Scaling Up...
```
ECS Cluster
│
├── EC2 Instance 1 (90% CPU)
├── EC2 Instance 2 (95% CPU)
├── EC2 Instance 3 (88% CPU)
└── EC2 Instance 4 (NEW) 🆕 → Starts handling new tasks!
```

### **🔽 Scaling Down (Low Traffic, CPU < 30%)**  
- ECS **removes extra tasks** first.  
- If an EC2 instance is **empty**, **EC2 Auto Scaling removes it**.  
### 🛑 Low Traffic! Scaling Down...
```
ECS Cluster
│
├── EC2 Instance 1 (20% CPU)
├── EC2 Instance 2 (25% CPU)
└── EC2 Instance 3 (Empty) ❌ → Terminated to save cost
```

---

### **🔑 Key Takeaways**
✔ **ECS Cluster manages multiple EC2 instances.**  
✔ **Each EC2 instance can run multiple tasks, depending on CPU/RAM.**  
✔ **ECS schedules tasks on instances with enough resources.**  
✔ **If no space, ECS Auto Scaling triggers a new EC2 instance.**  
✔ **ALB distributes traffic, but CloudWatch handles auto scaling.**  
✔ **When traffic drops, ECS & EC2 scale down to optimize cost.**  

---

---

### 1. Ex Lambds {#section-1}

> **📁 Topic: Lambda**

## Using a Singleton Approach (Recommended)
- A singleton pattern ensures that the database connection is created once and reused across multiple invocations in a warm Lambda container.
```js
const { Sequelize } = require("sequelize");

// Initialize outside the handler to enable connection reuse
const sequelize = new Sequelize("database", "username", "password", {
  host: "your-db-host",
  dialect: "mysql",
  pool: {
    max: 5, // Max number of connections in pool
    min: 0, // Min number of connections
    acquire: 30000, // Max time (ms) to get a connection
    idle: 10000, // Max idle time (ms) before releasing
  },
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
}

exports.handler = async (event) => {
  try {
    await connectDB(); // Ensures connection is available

    // Simulate a DB query
    const result = await sequelize.query("SELECT NOW() as currentTime");
    
    return {
      statusCode: 200,
      body: JSON.stringify({ time: result[0] }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
```

## Using a Class-Based Approach
- A class-based approach allows better encapsulation and modularity, which can be helpful for larger projects.
```js
const { Sequelize } = require("sequelize");

class Database {
  constructor() {
    if (!Database.instance) {
      this.sequelize = new Sequelize("database", "username", "password", {
        host: "your-db-host",
        dialect: "mysql",
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      });

      Database.instance = this;
    }
    return Database.instance;
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log("Database connected");
    } catch (error) {
      console.error("Database connection error:", error);
      throw error;
    }
  }

  async query(sql) {
    return this.sequelize.query(sql);
  }
}

const db = new Database();

exports.handler = async (event) => {
  try {
    await db.connect();
    const result = await db.query("SELECT NOW() as currentTime");

    return {
      statusCode: 200,
      body: JSON.stringify({ time: result[0] }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
```
# Template:
```yml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: SQS triggered Lambda example with SAM

Globals:
  Function:
    Runtime: nodejs18.x

Resources:
  CommonDependenciesLayer:
    Type: AWS::Serverless::LayerVersion
    Properties:
      LayerName: CommonDependencies
      ContentUri: layers/common # Store layers separately
      CompatibleRuntimes:
        - nodejs18.x
      RetentionPolicy: Retain
    Metadata:
      BuildMethod: nodejs18.x

  ProcessAccounts:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: functions/sdk-process-accounts
      Handler: index.handler
      Runtime: nodejs18.x
      Timeout: 15
      Environment:
        Variables:
          DB_PASSWORD: name
          DB_USERNAME: name
          DB_NAME: name
          DB_HOST:name
      Layers:
        - !Ref CommonDependenciesLayer
    Metadata:
      SamResourceId: ProcessAccounts
```

---

### 2. Aws Cicd {#section-2}

> **📁 Topic: CICD**

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

---

### 2. Aws Target Group How Failure Handles {#section-2}

> **📁 Topic: TagretGroup+ALB+ECS**

# ✅ ECS + ALB Health Check Behavior: Failure Handling Scenarios

This document explains how **ECS** interacts with **ALB** during **container health check failures** in two main scenarios: during a **new deployment** and when **live tasks fail**.

---

## 🔹 Scenario 1: New Deployment Fails (Blue Tasks Fail Health Checks)

When deploying a **new version** (e.g., blue/green or rolling update):

1. ECS launches **new tasks** based on the **new task definition**.
2. These tasks are registered with the **ALB Target Group**.
3. **ALB performs health checks** on the new tasks.
4. If enough tasks become **healthy**:
   - ECS **shifts traffic** to the new tasks.
5. If the new tasks **fail health checks**:
   - ECS **marks deployment as failed**.
   - **Rolls back** to the **last stable task definition**.
   - ALB continues routing traffic to the **previous (healthy) tasks**.

> ✅ This mechanism ensures **bad deployments do not impact live traffic**.

---

## 🔸 Scenario 2: Live (Green) Tasks Fail

When already running (live) tasks fail:

1. **ALB detects failures** via health checks (e.g., `/health` endpoint returns 500).
2. ALB marks the tasks as **unhealthy** and **stops routing traffic** to them.
3. ECS service controller notices the unhealthy tasks.
4. ECS:
   - **Stops failing tasks**.
   - **Launches new tasks** using the **last known good task definition**.
5. New tasks are registered and **checked by ALB** before receiving traffic.

> ✅ ECS performs **self-healing** using health checks + desired count config.

---

## 💡 Real-World Optimization Tips

### 🛠 For Blue/Green Deployments
- Use **pre-traffic and post-traffic hooks** (in CodeDeploy) for validation tests.
- Tune ECS deployment config:
  - `minimumHealthyPercent`: controls how many old tasks stay during deploy.
  - `maximumPercent`: controls how many extra tasks can run during deploy.

### 📏 Health Check Best Practices
- Tune health check values:
  - `healthy threshold`: `2`
  - `interval`: `10s`
- Implement a `/health` endpoint in your **NestJS** app that checks:
  - DB connectivity
  - Redis/memory store
  - External APIs or queues

### ☁️ System Design Considerations
- Use **Auto Scaling** (target tracking on CPU/memory/requests).
- Deploy ECS tasks across **multiple AZs** for fault tolerance.
- Monitor using **CloudWatch Alarms** tied to ALB Target Health and ECS Task Status.

---

---

## Api Gateway



---

## CICD



---

## Cognito



---

## EC2



---

## ECS



---

### 999. How Ecs Instance Launched {#section-999}

> **📁 Topic: ECS**

## Launch Docker Container = Launch ECS Tasks on ECS Cluster

## Launch Types of ECS:
- Needs IAM Roles compulsory
- Define these ROLES in TASK Defination
- can Create Custom ROLES

### 1. EC2: launch type

- if u use ECS cluser with EC2 launch type : u need to maintain infrastructure


### 2. Fargate Launch Type: Serverless
- No manage of infrastructure No EC2 instance to manage
- TAsk Defination : managed by AWS itself

---

### 999. Suumaryof Ecs {#section-999}

> **📁 Topic: ECS**

In summary, every ECS instance should be registered with an ECS cluster,
and tasks are launched on these instances based on Task Definitions. 
Target groups are associated with ECS services and are used for 
routing traffic to the tasks running as part of those services.

---

### 999. Ecs {#section-999}

> **📁 Topic: ECS**

```
ECS : https://www.youtube.com/watch?v=ARGmrYFfv44
      https://www.youtube.com/watch?v=Oe7RlNRYEpI
      https://www.youtube.com/watch?v=ARGmrYFfv44
```
### 1) Cluster : have infrastructure - EC2 or Fargate ( like OS for running Code)
### 2) Services : are associated with TASK Defination 
- is always part of cluster
- One Task Defination for One Service 
- Can run multiple instances of container based on Task Defination's Image
- The service manages the lifecycle of tasks, ensuring that the desired number of tasks based on the specified task definition is running at all times.
### 3) Task : is always part of cluster only and run based on task Defination
- One Task Defination for one Task
- can run only one container
- The service handles tasks' deployment, scaling, and recovery
> VIMP:  task are responsible for running containers [ Image, Container Id]
 
- Task 1 :
- Task 2 :  -> Service ( Creates multiple Task based on Task Defination )
- Task 3 :


### - Task Defination : same for Task and Service 
-  but The difference lies in how tasks are managed and orchestrated, with services providing a higher-level abstraction for scalable and reliable deployment of containers.
- While the task definition structure is the same, when you use it within the context of a service, ECS provides additional capabilities for managing the deployment, scaling, and maintenance of tasks. The service handles the orchestration of tasks based on the specified task definitio
### - VIMP: 
1) if using Fargate : can not find releated container where it is running
2) if using EC2 : can find where it is running : cluser-> services-> Task -> selecet Task --> Ec2 Id
3) ECS uses Task for launching container to run on EC2 or ECS
  [ ONE TASK ==> ONE Container ]
4) clusters are used for orchestration ( auto deployment, creating Task,Service etc )

---

## Lambda



---

### 999. Lambda Awsapigateway {#section-999}

> **📁 Topic: Lambda**

## 1) When you create serverless application and deploy it on aws lambda you have to integrate awsApiGateWay to your lambda service : 
>### Execution steps
```  
   > deploy on lambda
   > integrate with awsApiGateWay => 
   > configure awsApiGateWay 
   > Automatic APIs generated by awsApiGateWay
   > have to specify HTTP method and ROutes and corresponding lambda Fucntion
   > client makes request to awsApiGateWay endpoint which is EVENT and each request will trigger corresponding labmda Fucntion
```
## 2) awsApiGateWay will provide API endpoint for each API automatically and you can use
- these endpoint URLS to call respective lambda functions 

## 3) in awsApiGateWay you have to 
-------------------------------------------------
##           IAM ROLE and Lambda Fucntion

### Q1) Do each lambda Fucntion needs IAM Role ?
         yes 
### Q2) what are the ways to assign IAM role to lambda function >
   - 2 ways:
   1. `IAM Execution Role`:
       -  You can assign an IAM execution role to your Lambda function.
       - This role is automatically assumed by the Lambda service when it executes your function. 
       - By attaching IAM policies to this role,
       - you grant specific permissions to the Lambda function to access other AWS services. 
       - For example, if your Lambda function needs to read data from DynamoDB,
     you can attach an IAM policy to the IAM execution role that allows read access 
     to the relevant DynamoDB tables.

   2. `Inline Policies:` 
        - Instead of using an IAM execution role, you can define IAM policies directly in the serverless.yml file (or equivalent when using other deployment methods) for each Lambda function. 
        - These policies are referred to as inline policies and are attached directly to the function, granting it specific permissions to access AWS services. 
        - This method is less common than using an IAM execution role but can be useful for fine-grained control when different Lambda functions require different permissions.
     
       - Example for inline:
       ```aws
       functions:
         myLambdaFunction:
           handler: handler.myFunction
           events:
             - http:
                 path: /myendpoint
                 method: get
       
           # Inline IAM policy for the Lambda function
           iamRoleStatements:
             - Effect: Allow
               Action:
                 - dynamodb:GetItem
                 - dynamodb:PutItem
               Resource: "arn:aws:dynamodb:us-east-1:123456789012:table/MyTable"
       ```
-------

- if you configure your AWS Lambda functions with their respective HTTP events and paths in the serverless.yml file, the Serverless Framework will automatically integrate those functions with AWS API Gateway and create the respective routes.

- The Serverless Framework is a popular tool for deploying serverless applications to AWS Lambda,and it abstracts away much of the AWS configuration complexity. When you define your AWS Lambda functions and their HTTP event triggers in the serverless.yml file, the framework takes care of creating the necessary AWS resources, including the API Gateway routes, during deployment.

---------

### When you deploy a Lambda function through AWS Lambda, you have the option to integrate it with API Gateway. 
- AWS Lambda and API Gateway work together seamlessly to create a serverless architecture for your microservices.

> Here's how it works:

1. `Create Lambda Function:` 
   - First, you create your serverless microservice as a Lambda function.
   This function contains the code that performs the specific task or service you want to offer.

2. `Integration with API Gateway:`
   -  When creating the Lambda function or through the AWS Management Console,you can configure it to be integrated with API Gateway.
   - This integration defines how API Gateway will invoke the Lambda function when it receives incoming API requests.

3. `API Gateway Configuration: `
    - AWS API Gateway provides a straightforward interface to create APIs, define endpoints, set up request/response mappings, and configure various other aspects of the API,such as authentication, caching, throttling, etc.

4. `Automatic API Generation:` 
    - Once you integrate your Lambda function with API Gateway and define the API configuration, AWS automatically generates the necessary API endpoints based on your settings. 
     - These endpoints are accessible through a public URL.

5. `HTTP Methods and Routes:` 
     - You can specify which HTTP methods (GET, POST, PUT, DELETE, etc.) are supported by each endpoint and define the route patterns that correspond to specific Lambda functions. 
     - This allows you to create different APIs for different microservices or functions.

6. `Execution of Lambda Functions`:
   -  When a client makes an API request to one of the API Gateway endpoints, API Gateway triggers the associated Lambda function, passing the request data as an input to the function.
   - The Lambda function processes the request and generates a response, which is then returned to the client via API Gateway.

7. `Scalability and Security:` 
   - AWS API Gateway automatically scales to handle any number of API requests. 
   = It also provides various security features, such as API keys, IAM (Identity and Access Management) authorization, and integration with AWS Cognito for user authentication and authorization.

- By using AWS Lambda with API Gateway, you can create a serverless microservices architecture that scales efficiently and
allows you to focus on your application logic without managing the underlying infrastructure.
The combination of AWS Lambda and API Gateway enables developers to build powerful, scalable,
and secure microservices-based applications easily.
------
## [ SERVERLESS.YML ]
Event types:

1) `httpApi`: for handling http request ( awsApiGateWay creates the routse/ enpoints automatically)
2) `schedule` : it will make labmda function to work like a CRON JOB so it will run at every specific time intervel
3) `webscoket` :
4) `sns` :
5) `strem` : for dynamoDB
6) `sqs` : triggered by corresponding simple queue service which is configure using ARN of SQS

---

### 999. Lambda Serverlessyml {#section-999}

> **📁 Topic: Lambda**

## serverless.yml Templete

1. org: testOrg                               //org: Specifies the organization name. In this case, it is set to "testOrg."
2. app: testApp                               //app: Defines the application name. In this case, it is set to "testApp."
3. service: testService                       //service: Indicates the service name. Here, it is set to "testService."
                      // The service name is crucial for deployment and is used to create and manage AWS resources related to the service.
4.  plugins:
  - serverless-plugin-tracing
                      // plugins: Lists the plugins used for the Serverless Framework.
                      // In this case, it includes the "serverless-plugin-tracing" plugin,
                      // which helps with distributed tracing to monitor and trace function invocations.
5, provider:
  name: aws
  - tracing:
    - lambda: false
    - apiGateway: false
  - runtime: nodejs14.x
  region: us-west-2
  //# timeout: 60
  - iam:              //iam: Configures the IAM (Identity and Access Management- role used by the Lambda functions.
    - role: "${self:custom.IAM_ROLE_ARN}"         //This IAM role determines what permissions the Lambda functions have.
      
  - vpc:              //Configures the Virtual Private Cloud (VPC- settings for the Lambda functions
    - securityGroupIds:      //Specifies the IDs of the security groups associated with the Lambda functions.
      - "${self:custom.VPC_SECURITY__GROUP}"
      #- !Ref LambdaSecurityGroup
    - subnetIds:           //: Lists the IDs of the private subnets in the VPC where the Lambda functions will be deployed.
      [
        "${self:custom.SERV_VPC_SUBNET_PRIVATE_A}",
        "${self:custom.SERV_VPC_SUBNET_PRIVATE_B}",
      ]
  - environment:
-custom
-functions
-resources:
 - sqsResource
 - dynamoDBResource
#

---

## SQS



---

### 999. Sqs Sam {#section-999}

> **📁 Topic: SQS**

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

---

## TagretGroup+ALB+ECS



---

### 999. Aws Target Group Health Check Rolback {#section-999}

> **📁 Topic: TagretGroup+ALB+ECS**

# Target Groups: 
## 1. ALB uses for Load Balancing
## 2. For helath checks :

## 🔁 How ALB Health Checks Work (ECS Context)

When you attach an **Application Load Balancer (ALB)** to an **ECS service** (via a **target group**), the health check configuration controls how ALB determines whether your tasks (containers) are healthy and should receive traffic.

---

### 🔹 Key Parameters

| Parameter            | Meaning                                 | Default          |
|----------------------|------------------------------------------|------------------|
| **Interval**         | How often to run health check            | `30 sec`         |
| **Timeout**          | How long ALB waits for a response        | `5 sec`          |
| **Healthy threshold**   | Number of successful checks before marking healthy | `5`              |
| **Unhealthy threshold** | Number of failed checks before marking unhealthy  | `2`              |
| **Path**             | HTTP path to check (e.g., `/health`)     | `/` (can be customized) |
| **Port**             | Which container port to hit              | e.g., `3000`     |

---

### 📌 Notes:
- The health check runs on the container instances (tasks) that are registered with the target group.
- If a task fails health checks based on the above thresholds, ALB stops routing traffic to it.
- The health check path should ideally return a `200 OK` status for healthy responses (e.g., from a `/health` endpoint).

## 3. `Supporting Blue/Green Deployments `
   - When using CodeDeploy with ECS:
     - One target group is for the current (live) version
     - Another is for the new version being tested
     - Once tests pass, traffic shifts to the new target group (green), and the old becomes inactive (blue).
```scss
                 ┌────────────────────────┐
                 │     Application LB     │
                 └──────────┬─────────────┘
                            │
         ┌──────────────────┴──────────────────┐
         │                                     │
 ┌───────▼────────┐                   ┌────────▼────────┐
 │ Target Group A │                   │ Target Group B  │
 │   (prod)       │                   │   (blue)        │
 └───────┬────────┘                   └────────┬────────┘
         │ ECS tasks (v1)                     │ ECS tasks (v2)
         ▼                                    ▼
      Receives Traffic            Validated, Promoted if healthy
```

---

## 🎯 Summary

This comprehensive guide covers all aspects of aws services, providing practical examples and best practices for real-world implementation.

## 🔗 Related Topics

- [All Categories](/categories/)
- [Technical Collections](/collections/)
- [Latest Posts](/)

---

*📝 **Note:** This guide consolidates multiple learning materials into a single comprehensive resource. Each section represents hands-on learning and practical implementation experience.*
