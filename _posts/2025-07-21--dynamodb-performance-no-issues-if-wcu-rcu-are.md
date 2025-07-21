---
layout: post
title: "✅ DynamoDB Performance: No Issues If WCU & RCU Are Sufficient"
date: 2025-07-21
categories: [databases, dynamodb]
tags: [aws, dynamodb, database, networking]
author: "GGurkhude"
excerpt: "Learning notes on ✅ dynamodb performance: no issues if wcu & rcu are sufficient"
original_path: "4_DataBase_RDS_DynamoDB/DynamoDB/DynamoDB_1.2_limit.md"
---

## ✅ DynamoDB Performance: No Issues If WCU & RCU Are Sufficient
- If you provision enough Write Capacity Units (WCU) and Read Capacity Units (RCU), DynamoDB will not throttle your requests. It will scale to handle the load efficiently.

  - On-Demand Mode: Scales automatically but costs more at high traffic.
  - Provisioned Mode: Needs manual scaling but can be optimized for cost.

# 🔗 Connection Limits in DynamoDB  

Unlike traditional databases (like **RDS, MySQL, PostgreSQL**), **DynamoDB is serverless** and does not have connection limits. Instead, it operates based on **API request limits**.  

| **Factor**               | **DynamoDB Limit**                  |
|--------------------------|------------------------------------|
| **Concurrent connections** | 🚀 Unlimited                     |
| **Max requests per second** | Depends on WCU/RCU               |
| **Max BatchWriteItem size** | 25 items (16MB total)           |
| **Max BatchGetItem size** | 100 items (16MB total)           |
| **Max Transaction size** | 25 items (4MB total)             |

## 💡 Why No Connection Limits?  
- DynamoDB uses **HTTP-based requests (REST API)**, so there are no persistent connections like in SQL databases.  
- Each request is **stateless and independent**.  
- AWS **manages connections internally**, so you don’t have to worry about **connection pooling** like in RDS.  

# 2. DynamoDB Item Size Limits

| Attribute            | Max Size                                      |
|----------------------|----------------------------------------------|
| **Single Item**      | 400KB (including metadata & attributes)      |
| **String Attribute** | 400KB                                        |
| **Binary Attribute** | 400KB                                        |
| **Number Attribute** | 38 digits                                    |


# 3. Indexing Limits
###  DynamoDB supports:
- >Primary Index (Partition Key + Optional Sort Key)
- >Global Secondary Index (GSI)
   - Allows querying by additional attributes.
   - Counts towards RCU/WCU of the table.
   - Max: 20 per table
- >Local Secondary Index (LSI)
   - Can only be created at table creation.
   - Max: 5 per table
   - Shares the partition key but has a different sort key.
### 🚨 Indexing Costs
- GSIs need their own RCUs and WCUs, so overusing GSIs can be costly.
- Querying GSIs returns eventually consistent results.