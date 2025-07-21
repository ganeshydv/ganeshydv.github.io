---
layout: post
title: "� Getting Data from DynamoDB: Two Main Methods"
date: 2025-07-21
categories: [databases, dynamodb]
tags: [aws, dynamodb, java, javascript]
author: "GGurkhude"
excerpt: "Learning notes on � getting data from dynamodb: two main methods"
original_path: "4_DataBase_RDS_DynamoDB/DynamoDB/DynamoDB_2.1_get_.md"
---

# 📌 Getting Data from DynamoDB: Two Main Methods  

Yes! In DynamoDB, there are **two primary ways** to fetch data:  

| **Method**       | **When to Use?** | **Key Requirement** | **Max Items per Request** | **Consistency** | **Performance** |
|------------------|-----------------|----------------------|--------------------------|----------------|---------------|
| **GetItem** (Single Item) | Fetch a single item | Must know Partition Key (and Sort Key, if applicable) | 1 Item | Strong or Eventual | Fast (~1-10ms) |
| **BatchGetItem** | Fetch multiple items by key | Must know Partition Key for each item | 100 items (16MB max) | Eventual | Faster than multiple GetItem calls |
| **Query** | Fetch multiple items from the same partition | Must know Partition Key (can filter by Sort Key) | Paginated (1MB per response) | Strong or Eventual | Fast (~10-50ms) |
| **Scan** | Fetch ALL items (full table scan) | No keys required (reads entire table) | Paginated (1MB per response) | Eventual | Slowest (~100ms+ per scan) |

---

# 🛠️ Querying Methods in DynamoDB  

## 1️⃣ **BatchGetItem – Best for Fetching Specific Records**  
- You must **know the exact Partition Key(s)** of the records.  
- Fetch up to **100 items in one API call** (**faster** than making multiple **GetItem** calls).  
- **No filters**, only **exact key matches**.  

🔹 **Example: Fetch 3 students by ID**  

```javascript
import { BatchGetCommand } from "@aws-sdk/lib-dynamodb";

const batchGet = new BatchGetCommand({
  RequestItems: {
    Students: {
      Keys: [
        { studentId: "S1" },
        { studentId: "S2" },
        { studentId: "S3" }
      ]
    }
  }
});

const response = await client.send(batchGet);
console.log(response.Responses.Students);
```
- ✅ Fast (better than calling GetItem 3 times)
- ❌ Limited (must know exact IDs, max 100 items per request)

## 2️⃣ Query – Best for Fetching Multiple Items in a Partition
- Requires Partition Key (but can filter by Sort Key).
- Returns all matching records for a given partition.
- Supports pagination (1MB per response).
### 🔹 Example: Fetch all courses for a student

```javascript
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

const query = new QueryCommand({
  TableName: "Enrollments",
  KeyConditionExpression: "studentId = :sid",
  ExpressionAttributeValues: { ":sid": "S1" }
});

const response = await client.send(query);
console.log(response.Items);
```
-  ✅ Efficient for partitioned data
-  ❌ Requires a well-structured partition key design

## 🚀 `What About Fetching 10K+ Records?`
- BatchGetItem is limited to 100 items.
- Query has a 1MB response limit.
- Solution? Use pagination!
### 🔹 Example: Paginate a Query for large data sets

```javascript
async function fetchAllItems(studentId) {
    let lastEvaluatedKey = null;
    let allItems = [];

    do {
        const query = new QueryCommand({
            TableName: "Enrollments",
            KeyConditionExpression: "studentId = :sid",
            ExpressionAttributeValues: { ":sid": studentId },
            ExclusiveStartKey: lastEvaluatedKey
        });

        const response = await client.send(query);
        allItems.push(...response.Items);
        lastEvaluatedKey = response.LastEvaluatedKey; // Continue pagination

    } while (lastEvaluatedKey);

    return allItems;
}
```
- ✅ Scales for large datasets
- ✅ Handles 10K+ records efficiently

