---
layout: post
title: "DynamoDB Command Support Matrix"
date: 2025-07-21
categories: [databases, dynamodb]
tags: [aws, dynamodb]
author: "GGurkhude"
excerpt: "Learning notes on dynamodb command support matrix"
original_path: "4_DataBase_RDS_DynamoDB/DynamoDB/DynamoDB_5_cmd_.md"
---

## DynamoDB Command Support Matrix

| Command                      | Supports Eventual Read? | Supports Strong Read? | Supports Transactional Read? | Supports Standard Write? | Supports Transactional Write? |
|------------------------------|------------------------|----------------------|--------------------------|----------------------|--------------------------|
| **GetItemCommand**           | ✅ Yes (default)       | ✅ Yes (`ConsistentRead: true`) | ✅ Yes (`TransactGetItemsCommand`) | ❌ No | ❌ No |
| **QueryCommand**             | ✅ Yes (default)       | ✅ Yes (`ConsistentRead: true`) | ❌ No | ❌ No | ❌ No |
| **PutItemCommand**           | ❌ No                  | ❌ No                | ❌ No                     | ✅ Yes | ❌ No |
| **BatchWriteCommand**        | ❌ No                  | ❌ No                | ❌ No                     | ✅ Yes | ❌ No |
| **TransactWriteItemsCommand** | ❌ No                  | ❌ No                | ❌ No                     | ❌ No | ✅ Yes |

#

## 📌 Batch Size Limits in DynamoDB :BatchWriteCommand & BatchWriteItemCommand
### Maximum Items per Batch Request:
- Up to 25 items per BatchWriteItemCommand or BatchWriteCommand request.
### Maximum Batch Size (Total Data per Request):
- 16 MB total for a BatchWrite request.
- 400 KB max per individual item.
### If You Exceed These Limits?
- More than 25 items? → You must split into multiple batch requests.
- More than 16MB total size? → You must split into multiple batch requests.
- Items over 400KB? → DynamoDB will reject them.

# 🔥 Summary  

| Feature | `BatchWriteItemCommand` (@aws-sdk/client-dynamodb) | `BatchWriteCommand` (@aws-sdk/lib-dynamodb) |
|---------|--------------------------------------------------|--------------------------------------------|
| **Max items per request** | 25 | 25 |
| **Max total batch size** | 16 MB | 16 MB |
| **Max size per item** | 400 KB | 400 KB |
| **If more than 25 items?** | Must split into multiple batches | Must split into multiple batches |
| **If item is over 400 KB?** | DynamoDB rejects it | DynamoDB rejects it |

🚀 **Both have the same batch size limit, but `BatchWriteCommand` is easier to use!**  
