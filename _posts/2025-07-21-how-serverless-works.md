---
layout: post
title: "How Serverless works?"
date: 2025-07-21
categories: [aws, 0-sls--md]
tags: [aws, javascript]
author: "GGurkhude"
excerpt: "Learning notes on how serverless works?"
original_path: "0_AWS_Serverless/0_sls_.md"
---

## How Serverless works?
### 1️⃣ Does Each Function Get a Different S3 Bucket in Serverless Framework?
- No, all functions in a Serverless Framework project share the same S3 bucket.

### How Does It Work?
- When you deploy using Serverless Framework, it packages the entire service (all functions) into a single deployment package and uploads it to one S3 bucket.
- This S3 bucket is automatically created for you (unless you specify a custom one).
- Then, each Lambda function extracts only the relevant files needed for its execution.
### 📌 Example Flow:
1. `Package the service:`
   - This zips the function code and dependencies into .serverless/ locally.
   ```sh
   serverless package
   ```
2. `Upload the package to an S3 bucket`
   - The ZIP file is uploaded to one shared S3 bucket.
    ```sh
    serverless deploy
    ```
### 2️⃣ How Does package.json Work in Serverless Framework?
- By default, Serverless Framework will look for package.json in the same folder where serverless.yml is located and install dependencies from there.

- ### How Dependencies Are Handled in Serverless Framework?
   - If node_modules exists in the project folder:
   - It includes node_modules in the package and deploys it along with the function.
   - If node_modules is missing but package.json is present:
   - AWS Lambda installs dependencies at runtime.
   
## 📝 Summary  

| ❓ **Question** | ✅ **Answer** |
|---------------|-------------|
| **Does each function get a separate S3 bucket?** | ❌ No, all functions share **one S3 bucket per service**. |
| **Where is the `package.json` file expected to be?** | 📍 In the **same folder as `serverless.yml`**. |
| **Does Serverless Framework include `node_modules` in deployment?** | ✅ Yes, by default, unless excluded manually. |
| **Can I exclude `node_modules` & use `package.json` instead?** | ✅ Yes, use `exclude: - node_modules/**` in `serverless.yml`. |
| **Best way to manage dependencies for multiple functions?** | ✅ Use **Lambda Layers** for shared dependencies. |
