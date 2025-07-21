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