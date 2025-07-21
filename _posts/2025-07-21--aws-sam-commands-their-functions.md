---
layout: post
title: "� AWS SAM Commands & Their Functions"
date: 2025-07-21
categories: [aws, 3-2-sam-cmd--md]
tags: [aws]
author: "GGurkhude"
excerpt: "Learning notes on � aws sam commands & their functions"
original_path: "0_AWS_SAM/3.2_sam_cmd_.md"
---

# 🔹 AWS SAM Commands & Their Functions

| **Command**                          | **What It Does?**                                           |
|--------------------------------------|-------------------------------------------------------------|
| `sam build`                          | 🔹 Packages Lambda function & dependencies.                 |
| `sam local start-api`                | 🔹 Runs Lambda functions locally with API Gateway (without LocalStack). |
| `sam local invoke <FunctionName>`    | 🔹 Invokes a specific Lambda function locally.              |
| `sam deploy --config-env local`      | 🔹 Deploys Lambda + SQS inside LocalStack.                  |
| `sam validate`                        | 🔹 Validates the `template.yaml` for errors.                |
| `sam package --s3-bucket <Bucket>`   | 🔹 Packages & uploads code to an S3 bucket for deployment.  |
| `sam deploy --guided`                | 🔹 Deploys to AWS interactively, prompting for parameters.  |
| `sam logs -n <FunctionName>`         | 🔹 Fetches logs from AWS CloudWatch for a Lambda function.  |
| `sam delete`                         | 🔹 Removes the deployed stack & associated resources.       |

---

## 🔹 Key Takeaways:
- **For Local Testing:** Use `sam local start-api` or `sam local invoke`.
- **For Deployment:** Use `sam build` → `sam deploy --config-env local`.
- **For Debugging:** Use `sam logs` to view CloudWatch logs.

🚀 **Need help with a complete SAM template for SQS + Lambda?** Let me know! 😊

