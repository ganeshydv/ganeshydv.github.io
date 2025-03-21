# SAM: Serverless Aplication Model [IaC - Infrastructure as Code]

- Open source framework simplifies development, deployment, and management of serverless applications on AWS.
- It extends AWS CloudFormation by providing a simplified syntax for defining AWS Lambda functions, API Gateway, DynamoDB tables, S3 buckets, and other resources.
- ✅ Local Development & Testing:
  - Run Lambda functions locally using sam local invoke.
  - Simulate API Gateway with sam local start-api.
- ✅ Fast & Easy Deployment:
  - Uses sam build and sam deploy to package and deploy applications quickly.
  - Supports CI/CD pipelines with AWS CodePipeline, GitHub Actions, etc.

## How SAM works?

### Step 1: Define Infrastructure (template.yaml)
- In SAM templates, you define AWS resources like Lambda, API Gateway, DynamoDB, etc.
```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31

Resources:
  MyLambdaFunction:
    Type: AWS::Serverless::Function
    Properties:
      FunctionName: MyFunction
      Handler: app.lambdaHandler
      Runtime: nodejs18.x
      MemorySize: 256
      Timeout: 10
      Policies:
        - AWSLambdaBasicExecutionRole
      Events:
        ApiEvent:
          Type: Api
          Properties:
            Path: /hello
            Method: GET
```
### Step 2: Develop & Test Locally
- Run your Lambda function locally using the SAM CLI.
```sh
sam build  # Builds the application
sam local invoke MyLambdaFunction  # Runs the function locally
sam local start-api  # Starts a local API Gateway to test endpoints
```
### Step 3: Deploy to AWS
After testing, deploy it to AWS:
```sh
sam deploy --guided
```

# Docker & SAM in Local

### When Do You NEED Docker? 🐳
### ✅ 1. Local Testing of Lambda Functions (sam local invoke)
- If you want to run Lambda functions locally on your machine using sam local invoke, SAM uses Docker to simulate the AWS Lambda execution environment.
```sh
sam local invoke MyLambdaFunction
```
- Without Docker, you'll get an error like:
```txt
Error: Running AWS Lambda functions locally requires Docker. Please install Docker and try again.
```
### ✅ 2. Local API Gateway Testing (sam local start-api)
- If your application includes an API Gateway, you can use:
```sh
sam local start-api
```
- This mimics API Gateway on your local machine.
- Requires Docker to run the API Gateway environment.
### ✅ 3. Local Testing for Event Sources (sam local generate-event)
- If you want to generate and test AWS events (e.g., S3 upload, SNS message), Docker is needed.
```sh
sam local generate-event s3 put | sam local invoke MyLambdaFunction
```
### Do I Need to Install Docker?
- ➡️ If you want to test Lambda functions locally: Yes, install Docker.
- ➡️ If you only want to deploy to AWS: No, Docker is not needed.