---
layout: post
title: "� DynamoDB Read & Write Operations  Full Comparison Table"
date: 2025-07-21
categories: [databases, dynamodb]
tags: [dynamodb]
author: "GGurkhude"
excerpt: "Learning notes on � dynamodb read & write operations  full comparison table"
original_path: "4_DataBase_RDS_DynamoDB/DynamoDB/DynamoDB_2.0_read_write_cmds_.md"
---

# 🔹 DynamoDB Read & Write Operations - Full Comparison Table

| **Operation**         | **Type**         | **Use Case**                          | **PK Required?** | **Size Limit**        | **Pros**                                         | **Cons**                                               | **Capacity Cost (RCU/WCU)**         | **Best Practices** |
|----------------------|-----------------|---------------------------------------|-----------------|----------------------|-------------------------------------------------|-------------------------------------------------|------------------------------------|----------------|
| **GetItem**         | Read (Single)    | Fetch a single item by primary key   | ✅ Yes         | 400KB per item       | ✅ Fast (O(1))                                  | ❌ Requires exact PK                              | 1 RCU (4KB per strongly consistent read) | Use only when PK is known. Avoid for bulk reads. |
| **BatchGetItem**    | Read (Batch)     | Fetch multiple items by primary keys | ✅ Yes         | 100 items or 16MB    | ✅ Reduces network calls                        | ❌ Max 100 items per batch                        | 1 RCU per 4KB of data per item      | Use parallel batch requests for larger datasets. |
| **Query**          | Read (Filtered)  | Fetch items with the same PK         | ✅ Yes         | 1MB per call         | ✅ Efficient for range queries                  | ❌ Requires PK and only one partition per query | 1 RCU per 4KB of data               | Use sort key filtering for better efficiency. |
| **Scan**           | Read (Full Table) | Fetch all items in a table           | ❌ No          | 1MB per call         | ✅ Retrieves everything                         | ❌ Very expensive, ❌ Slow, ❌ Doesn't use indexes | 1 RCU per 4KB of data               | Use ProjectionExpression, Pagination, or GSIs to optimize. |
| **PutItem**        | Write (Single)   | Insert or replace a single item      | ✅ Yes         | 400KB per item       | ✅ Simple and fast                              | ❌ Overwrites existing item (no merge)          | 1 WCU per 1KB of data                | Use only when sure about replacing items. |
| **BatchWriteItem**  | Write (Batch)    | Insert or delete up to 25 items      | ✅ Yes         | 25 items or 16MB     | ✅ Reduces API calls                            | ❌ No support for UpdateItem                     | 1 WCU per 1KB per item               | Use batching to reduce WCU usage. |
| **UpdateItem**      | Write (Update)   | Modify specific attributes of an item | ✅ Yes         | 400KB per item       | ✅ Updates only specific attributes             | ❌ Slower than PutItem                           | 1 WCU per 1KB of updated data        | Use conditional writes to avoid overwrites. |
| **DeleteItem**      | Write (Delete)   | Remove a single item                 | ✅ Yes         | 400KB per item       | ✅ Efficient for single deletes                 | ❌ Cannot delete multiple items in one call     | 1 WCU per item                       | Use BatchWriteItem for bulk deletes. |
| **TransactionWrite** | Write (Atomic)  | Write multiple items atomically      | ✅ Yes         | 25 items or 4MB      | ✅ Ensures atomicity & consistency             | ❌ Slower, ❌ Expensive                         | 2x standard WCU per item             | Use only when strict atomicity is needed. |
| **TransactionGet**  | Read (Atomic)   | Fetch multiple items atomically      | ✅ Yes         | 25 items or 4MB      | ✅ Ensures consistent reads                     | ❌ Slower than BatchGetItem                      | 2x standard RCU per item             | Use only when consistent batch reads are required. |

---

## 🔹 Additional Considerations

### 1️⃣ Read Capacity (RCU) Calculation
- **Eventual Consistency** → `1 RCU = 2 x 4KB reads`
- **Strong Consistency** → `1 RCU = 1 x 4KB read`
- **Transactional Read** → `1 RCU = 2 x Strongly Consistent Read`

### 2️⃣ Write Capacity (WCU) Calculation
- **Standard Write** → `1 WCU = 1KB of data per item`
- **Transactional Write** → `2 WCU per item`

### 3️⃣ Query vs Scan Performance
- **Query** → 🚀 **Fast** (reads only a specific partition).
- **Scan** → 🐢 **Slow & expensive** (reads everything).

---

## 🔹 When to Use Each Operation

| **Use Case**                          | **Best Operation**         |
|---------------------------------------|----------------------------|
| Get a single item by ID              | `GetItem`                  |
| Get multiple items by ID list        | `BatchGetItem`             |
| Fetch all orders by customer ID      | `Query`                    |
| Fetch all records in a table         | `Scan` (if necessary)      |
| Insert/update a single item          | `PutItem` or `UpdateItem`  |
| Insert/update multiple items         | `BatchWriteItem`           |
| Delete a single item                 | `DeleteItem`               |
| Delete multiple items                | `BatchWriteItem`           |
| Perform atomic write across items    | `TransactionWrite`         |

---

## 🔹 Key Takeaways

✅ **Prefer `Query` over `Scan`** to improve performance.  
✅ **Use `Batch` operations** to reduce API calls and optimize capacity usage.  
✅ **Transactions** are **slower and more expensive** but ensure **atomicity**.  
✅ **Indexing with GSIs and LSIs** can improve read performance.  
✅ **Optimize WCU/RCU** consumption by using **ProjectionExpression, pagination, and batching**.  

