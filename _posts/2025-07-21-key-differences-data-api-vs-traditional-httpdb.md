---
layout: post
title: "Key Differences: Data API vs. Traditional HTTPDB Request"
date: 2025-07-21
categories: [databases, rds-api-1-md]
tags: [aws, database, networking]
author: "GGurkhude"
excerpt: "Learning notes on key differences: data api vs. traditional httpdb request"
original_path: "4_DataBase_RDS_DynamoDB/RDS_API_1.md"
---

1. Traditional HTTP API: ORM--> RDS
2. DATA API: 
   - Data API maximum concurrent requests: 500 concurrent Requests
   - Data API maximum result set size: 1MB (The maximum size of the database result set that can be returned by the Data API.)
   - Data API maximum size of JSON response string: 10MB (The maximum size of the simplified JSON response string returned by the RDS Data API.)
   - Data API requests per second: 1,000 per second(The maximum number of requests to the Data API per second allowed in this account in the current AWS Region)
## Key Differences: Data API vs. Traditional HTTP-DB Request

| Feature            | Traditional HTTP API (Backend + DB) | AWS RDS Data API |
|--------------------|-----------------------------------|------------------|
| **Database Connection** | Direct (Persistent Pooling) | Connectionless (HTTPS) |
| **Latency** | Low (~ms) (direct DB call) | Higher (100-300ms) |
| **Scalability** | Can hit DB connection limits | Auto-Scales |
| **Security** | Manages DB credentials | Uses IAM & Secrets Manager |
| **SQL Support** | Full SQL (Transactions, Joins, CTEs) | Limited SQL |
| **Use Case** | Microservices, OLTP, High-performance apps | Serverless, event-driven apps |

#