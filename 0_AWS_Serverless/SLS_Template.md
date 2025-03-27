
## 1) install serverless
## 2) connect serverless with aws
  cmd: `serverless config credentials --provider aws --key <key> --secret <secret-key>`

## 3) create serverless templete
  -  cmd : `serverless create -t projectName`
  - it give files: 1) serverless.yml

----------------------
# `Every serverless templete:`

# Serverless Framework Configuration  

## 1. Organization & Application Details  

These properties define the **project details** in the Serverless Framework.  

```yaml
org: my-org              # Organization name  
app: my-app              # Application name  
service: my-service      # Service name (used in AWS resource naming)  
```
### Explanation:
- org → The organization under which this project is managed.
- app → The specific application name, useful when working with multiple apps.
- service → The main service name, which is used for naming AWS resources like Lambda functions.

-----

## 2. Plugins  

Plugins extend the Serverless Framework functionality.  

```yaml
plugins:  
  - serverless-offline  
  - serverless-plugin-existing-s3  
```
### Explanation:
- plugins → This section lists all the plugins that enhance the Serverless Framework's capabilities.
- Example Plugins:
  - serverless-offline → Allows running Lambda functions locally.
  - serverless-plugin-existing-s3 → Helps manage existing S3 buckets instead of creating new ones.

------
## 3. Provider Configuration  

The `provider` section defines the cloud provider and configurations for deployment.  

```yaml
provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  iam:
    role: arn:aws:iam::123456789012:role/MyLambdaRole
  vpc:
    securityGroupIds:
      - sg-xxxxxxxx
    subnetIds:
      - subnet-xxxxxxxx
  environment:
    DB_HOST: mydb.example.com
    DB_USER: admin
    DB_PASSWORD: secretpassword
```
### Explanation:
1. name → Specifies the cloud provider (e.g., AWS).
1. runtime → Defines the runtime environment (e.g., nodejs18.x).
1. region → Specifies the AWS region for deployment (e.g., us-east-1).
1. iam → Configures IAM permissions for Lambda functions.
   - role → Specifies the IAM role that Lambda functions will assume.
1. vpc → Defines Virtual Private Cloud (VPC) settings:
   - securityGroupIds → List of security groups for network access control.
   - subnetIds → List of subnets where the Lambda functions will run.
1. environment → Defines environment variables accessible by Lambda functions.

----
## 4. Custom Variables  

The `custom` section allows defining user-specific configurations that can be reused throughout the `serverless.yml` file.  

```yaml
custom:
  SERV_VPC_ID: vpc-xxxxxxxx
  SQS_QUEUE_NAME: myQueue
  DYNAMODB_TABLE: myDynamoDBTable
```

### Explanation:
- SERV_VPC_ID → Stores the VPC ID, which can be referenced elsewhere in the file.
- SQS_QUEUE_NAME → Defines the name of the Amazon SQS queue.
- DYNAMODB_TABLE → Holds the name of the DynamoDB table for easy reference.

These variables can be accessed in serverless.yml using ${self:custom.VARIABLE_NAME}.
```yml
provider:
  vpc:
    VpcId: ${self:custom.SERV_VPC_ID}
```
## 5. Functions  

The `functions` section defines the Lambda functions in the Serverless Framework. Each function includes:  
- The **handler** (entry point of the function).  
- The **events** that trigger the function (e.g., HTTP API Gateway, SQS, DynamoDB).  
- The **IAM role permissions** (can be assigned per function or globally).  

### Example:  

```yaml
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

### Explanation:
- handler: handler.myFunction → Specifies the function's entry point (handler.js file and myFunction method).
- Events:
   - The function is triggered by an HTTP API Gateway event (/myendpoint on GET request).
- IAM Role (iamRoleStatements):
  - Allows the function to access DynamoDB with GetItem and PutItem actions.
  - Restricts access to a specific DynamoDB table (MyTable).


If multiple Lambda functions require the same permissions, IAM roles can be set at the provider level instead of per function.

----
## 6. Resources  

The `resources` section allows you to define additional AWS resources such as **DynamoDB tables, RDS proxies, Security Groups, and SQS queues**.  
These resources are created and managed via **AWS CloudFormation** when deploying the Serverless Framework.

### Example:

```yaml
resources:
  Resources:
    # 1. DynamoDB Table Definition
    PlaylistsDynamoDBTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: ExampleTableName
        AttributeDefinitions:
          - AttributeName: id
            AttributeType: S
          - AttributeName: key_2
            AttributeType: S
          - AttributeName: key_3
            AttributeType: S
          - AttributeName: key_4
            AttributeType: N
        KeySchema:
          - AttributeName: id
            KeyType: HASH
          - AttributeName: key_2
            KeyType: RANGE
        BillingMode: PAY_PER_REQUEST
        GlobalSecondaryIndexes:
          - IndexName: key_3-index
            KeySchema:
              - AttributeName: key_3
                KeyType: HASH
            Projection:
              ProjectionType: ALL
          - IndexName: key_4-index
            KeySchema:
              - AttributeName: key_4
                KeyType: HASH
            Projection:
              ProjectionType: ALL
```

### Explanation:
## 6.1. DynamoDB Table (PlaylistsDynamoDBTable)
   - Creates a DynamoDB table named ExampleTableName.
   - Uses id as the primary key and key_2 as the sort key.
   - Enables Global Secondary Indexes (GSI) to optimize queries for key_3 and key_4.
   - Uses PAY_PER_REQUEST billing mode to automatically scale.
## 6.2. RDS Proxy Definition:
```yml
    # RDS Proxy
    RDSProxy:
      Type: AWS::RDS::DBProxy
      Properties:
        DBProxyName: MyRDSProxy
        EngineFamily: MYSQL
        RoleArn: arn:aws:iam::123456789012:role/RDSProxyRole
        VpcSubnetIds:
          - subnet-abc123
          - subnet-def456
        SecurityGroups:
          - !Ref RDSSecurityGroup
```
### Explanation:
- DBProxyName → Defines an RDS Proxy named MyRDSProxy.
- EngineFamily → Specifies the database type (MySQL).
- RoleArn → Associates an IAM Role (RDSProxyRole) for managing access.
- VpcSubnetIds → Specifies the subnets where the proxy will be deployed.
- SecurityGroups → Links the proxy to an existing security group (RDSSecurityGroup).

## 6.3. Security Groups:
```yml
    # Lambda Security Group
    LambdaSecurityGroup:
      Type: AWS::EC2::SecurityGroup
      Properties:
        VpcId: ${self:custom.SERV_VPC_ID}
        SecurityGroupIngress:
          - IpProtocol: -1
            CidrIp: "0.0.0.0/0"
            Description: Allow all outbound traffic
        GroupDescription: "Security group for Lambdas"
        Tags:
          - Key: "Name"
            Value: "LambdaSecurityGroup"

    # RDS Security Group
    RDSSecurityGroup:
      Type: AWS::EC2::SecurityGroup
      Properties:
        GroupDescription: "Security group for RDS"
        VpcId: ${self:custom.SERV_VPC_ID}
        SecurityGroupIngress:
          - IpProtocol: tcp
            FromPort: 3306
            ToPort: 3306
            CidrIp: "0.0.0.0/0"
        Tags:
          - Key: "Name"
            Value: "RDSSecurityGroup"
```

### Explanation:
- Lambda Security Group (LambdaSecurityGroup)

   - Allows outbound traffic from Lambda functions.
   - Attached to all Lambdas that need secure VPC access.
- RDS Security Group (RDSSecurityGroup)

   -  Allows access to an RDS database on port 3306 (MySQL).
   -  Ensures that only specified resources can connect to the RDS instance.
------


## 6.4. SQS Queue:
```yml
    # SQS Queue
    receiverQueue:
      Type: AWS::SQS::Queue
      Properties:
        QueueName: ${self:custom.SQS_QUEUE_NAME}
        VisibilityTimeout: 900
        MaximumMessageSize: 2048
        RedrivePolicy: 
          deadLetterTargetArn: 
            Fn::GetAtt: 
              - "deadLetterQueue"
              - "Arn"
          maxReceiveCount: 5
``` 
### Explanation:
- QueueName → Sets a queue name dynamically using a custom variable.
- VisibilityTimeout → Configures how long a message is hidden after being received.
- MaximumMessageSize → Restricts message size to 2048 bytes.
- RedrivePolicy → Moves failed messages to a dead-letter queue after 5 failed attempts.

## 7. IAM Roles for Lambda Functions  

Each **Lambda function** in your Serverless application **requires an IAM Role** to define its permissions.  
You can specify IAM permissions **globally** for all functions or **individually** per function.

---

### 🔹 Global IAM Role for All Functions:

```yaml
provider:
  name: aws
  runtime: nodejs18.x
  iam:
    role:
      statements:
        - Effect: Allow
          Action:
            - dynamodb:GetItem
            - dynamodb:PutItem
          Resource: "arn:aws:dynamodb:us-east-1:123456789012:table/MyTable"

```
### 📌 Explanation:
- iam.role.statements → Defines a list of permissions that apply to all Lambda functions.
- Effect: Allow → Grants access to the listed AWS services.
- Action → Specifies actions (e.g., GetItem, PutItem on DynamoDB).
- Resource → Restricts access to a specific DynamoDB table.


## 🔹 Inline IAM Role for a Specific Lambda Function:
```yml
functions:
  myLambdaFunction:
    handler: handler.myFunction
    events:
      - http:
          path: /myendpoint
          method: get

    # Inline IAM policy for this Lambda function only
    iamRoleStatements:
      - Effect: Allow
        Action:
          - s3:GetObject
          - s3:PutObject
        Resource: "arn:aws:s3:::my-serverless-bucket/*"
```

### 📌 Explanation:
- IAM Policy is scoped only to myLambdaFunction.
- Allows access to S3 (GetObject & PutObject) for a specific bucket.
- This IAM policy applies only to this function, ensuring least privilege access.

## 🔹 When to Use Global vs Inline IAM Roles? 🤔  

Choosing between **Global IAM Roles** and **Inline IAM Roles** is essential for security and access control in Serverless applications.  

| **IAM Type**         | **Use Case** |
|----------------------|-------------|
| **Global IAM Role**  | When all Lambda functions need similar permissions (e.g., accessing the same **DynamoDB table**). |
| **Inline IAM Role**  | When a specific Lambda function needs unique permissions (e.g., accessing an **S3 bucket**). |

### ✅ Best Practices:
- **Use Global IAM Roles** when functions share access to the same resources.  
- **Use Inline IAM Roles** for function-specific access to minimize security risks.  
- Always follow the **Principle of Least Privilege (PoLP)** to restrict permissions.  

---

Would you like to see IAM Role examples for **other AWS services** like SNS, SQS, or RDS? 🚀🔐  

