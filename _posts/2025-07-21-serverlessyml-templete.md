---
layout: post
title: "serverless.yml Templete"
date: 2025-07-21
categories: [aws, lambda]
tags: [aws, dynamodb, javascript]
author: "GGurkhude"
excerpt: "Learning notes on serverless.yml templete"
original_path: "0_AWS/Lambda/Lambda_serverlessYml.md"
---

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


 
