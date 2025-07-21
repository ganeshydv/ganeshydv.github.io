---
layout: post
title: "Max Execution Time: 900 sec = 15 min"
date: 2025-07-21
categories: [aws, lambda]
tags: [aws, dynamodb, networking, concurrency]
author: "GGurkhude"
excerpt: "Learning notes on max execution time: 900 sec = 15 min"
original_path: "0_AWS/Lambda/0_lambda_limits_0.md"
---



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
