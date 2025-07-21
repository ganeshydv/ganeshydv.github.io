---
layout: post
title: "Link [GSI VS LSI](https://www.dynamodbguide.com/localorglobalchoosingasecondaryindextypeindynamodb/)"
date: 2025-07-21
categories: [databases, dynamodb]
tags: [dynamodb, networking]
author: "GGurkhude"
excerpt: "Learning notes on link [gsi vs lsi](https://www.dynamodbguide.com/localorglobalchoosingasecondaryindextypeindynamodb/)"
original_path: "4_DataBase_RDS_DynamoDB/DynamoDB/DynamoDB_0.1.1_GSI_VS_LSI_.md"
---

## Link [GSI VS LSI](https://www.dynamodbguide.com/local-or-global-choosing-a-secondary-index-type-in-dynamo-db/)

# 🚀 Quick Comparison Table: GSI vs LSI in DynamoDB

| **Feature**              | **GSI (Global Secondary Index)**   | **LSI (Local Secondary Index)** |
|--------------------------|----------------------------------|----------------------------------|
| **Scope**               | Across all partitions (**Global**) | Within a single partition (**Local**) |
| **Partition Key (PK)**  | Can have a different PK than the main table | Must have the **same PK** as the main table |
| **Sort Key (SK)**       | Can have a new SK | Can have a different SK from the main table |
| **Storage**            | Stored separately (**replicated data**) | Stored within the **same partition** as the main table |
| **Consistency**        | **Eventually consistent** (slight delay) | **Strongly consistent** (immediate update) |
| **Write Performance Impact** | Extra WCU cost (since data is copied) | Lower WCU cost (since it stays in the same partition) |
| **Read Performance**   | Can query **across partitions** | Queries are **restricted to a single partition** |
| **Limitations**        | No strict limits on number of GSIs | Max **5 LSIs** per table |
| **Use Case**          | Query by **different attributes** not in the main table | Query data using **multiple sort keys per partition** |

---


## 📌 How Does This Affect Storage & Performance?

### 🚀 **GSI (Global Secondary Index)**
- Stores a **copy of selected attributes** separately (**i.e., in a different partition**).
- **Consumes additional storage** (since it's duplicating data).
- **Slower writes** due to **eventual consistency** (**data takes time to update**).
- **Can query across all partitions**, making it useful for **global lookups**.

### 🚀 **LSI (Local Secondary Index)**
- **Does not duplicate** the partition key (**only adds a new sort key**).
- **Stored in the same partition** as the main table, meaning **no extra WCU cost for writes**.
- **Faster reads** with **strong consistency** (**reads are always up-to-date**).
- **Limited to querying within the same partition**, so **not useful for global lookups**.

# 📌 When to Use GSI vs LSI?

| **Use Case**                          | **Use GSI** ✅ | **Use LSI** ✅ |
|----------------------------------------|---------------|---------------|
| Query across multiple partitions       | ✅ Yes        | ❌ No         |
| Need strong consistency                | ❌ No         | ✅ Yes        |
| Need to add a different sort key       | ✅ Yes        | ✅ Yes        |
| Minimize write costs                   | ❌ No (extra WCU cost) | ✅ Yes (no extra WCU) |
| Limited index count                     | ✅ No (unlimited GSIs) | ❌ Yes (max 5 LSIs) |

---