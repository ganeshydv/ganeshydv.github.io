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
