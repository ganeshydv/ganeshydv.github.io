---
layout: post
title: "Layers & Deployment"
date: 2025-07-21
categories: [aws, 3-sam-layers-md]
tags: [aws, javascript]
author: "GGurkhude"
excerpt: "Learning notes on layers & deployment"
original_path: "0_AWS_SAM/3_sam_layers.md"
---

# Layers & Deployment 

> ## Do node_modules function also gets deployed/uploaded while creating lambda function using SAM or serverless?
> Yes, node_modules gets deployed when using AWS SAM or Serverless Framework, but how it is handled depends on your setup

## 1️⃣ AWS SAM: Does node_modules Get Deployed?
- ###  ✅ By Default: YES (node_modules is included in the package)
  - If you use CodeUri in your template.yaml, AWS SAM packages everything inside the specified folder, including node_modules.
This means that all dependencies are uploaded to AWS Lambda unless you configure SAM to exclude them.
  - When running sam build && sam deploy, everything inside function/, including node_modules, is zipped and uploaded to S3.

 ## 2️⃣ How to Optimize & Reduce Package Size?
  - Since large node_modules folders can increase cold starts and slow deployments, you can optimize the deployment:

  - `🔹 Option 1: Use package.json Instead of node_modules (Recommended)`
    - Instead of packaging node_modules, you can tell AWS SAM to only include package.json, and AWS Lambda will install dependencies automatically.
    - Add a package.json file (without node_modules) inside your  function folder.
    - In template.yaml, use NodejsFunctionProps.PackageType: Zip
    - AWS Lambda will install the required dependencies when deploying.
  - `🔹 Option 2: Use Lambda Layers for Common Dependencies (Best for Multiple Functions)`
    - If multiple Lambda functions use the same dependencies, package them into a Lambda Layer instead of including node_modules in every function.
    > 1. Create a Layer:
    ```sh
    mkdir -p my-layer/nodejs
    cd my-layer/nodejs
    npm init -y
    npm install axios lodash
    ```
    > 2. Define the Layer in template.yaml:
    ```yaml
    Resources:
      MyCommonLayer:
        Type: AWS::Serverless::LayerVersion
        Properties:
          LayerName: CommonNodeModules
          ContentUri: my-layer
          CompatibleRuntimes:
            - nodejs18.x
    ```
    > 3. Attach it to your functions:

    ```yaml
    Resources:
       MyLambdaFunction:
         Type: AWS::Serverless::Function
         Properties:
           Handler: index.handler
           Runtime: nodejs18.x
           Layers:
             - !Ref MyCommonLayer
    ```
## 📝 Summary  

| ❓ **Question** | ✅ **Answer** |
|---------------|-------------|
| **Does `node_modules` get uploaded in AWS SAM?** | ✅ Yes, by default. |
| **Can I avoid uploading `node_modules`?** | ✅ Yes, by excluding it & using `package.json`. |
| **Best way to handle dependencies for multiple functions?** | ✅ Use **Lambda Layers** to reduce size & improve performance. |
| **Does Serverless Framework also upload `node_modules`?** | ✅ Yes, unless excluded manually. |
