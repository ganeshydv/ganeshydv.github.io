---
layout: post
title: "How data is stored in DynamoDB"
date: 2025-07-21
categories: [databases, dynamodb]
tags: [dynamodb, database]
author: "GGurkhude"
excerpt: "Learning notes on how data is stored in dynamodb"
original_path: "4_DataBase_RDS_DynamoDB/DynamoDB/DynamoDB_0.2_How_Data_Stored_.md"
---


# How data is stored in DynamoDB
- This PK will divide data in Partitions
- Max size of Partition is 10 GB
# 1️⃣ Basic Case: Table with Only a `Partition Key (Primary Key)`
- If a table has only a Partition Key (PK), DynamoDB stores items based on the hash value of the partition key.

### 🔹 Example Table: Users (PK = userId)
```yml
Partition 1   |  Partition 2  | Partition 3  | Partition 4
-----------------------------------------------------------
userId: U100  | userId: U104  | userId: U107 | userId: U110
name: Alice   | name: Bob     | name: Eve    | name: Charlie
age: 25       | age: 30       | age: 22      | age: 28
-----------------------------------------------------------
```
### 💡 How data is stored?

- DynamoDB hashes userId and distributes data across multiple partitions.
- Each partition can store up to 10GB of data.
### 🔍 Querying
  - GetItem works efficiently (must specify exact userId).
  - Query is not useful (because there’s no sort key).

# 2️⃣ Composite Key: Partition Key + Sort Key
- If a table has both a Partition Key (PK) and a Sort Key (SK), DynamoDB stores items in sorted order within each partition.

### 🔹 Example Table: Orders (PK = customerId, SK = orderDate)

```yaml
Partition 1 (customerId: C100)
-------------------------------------------------
customerId: C100 | orderDate: 2023-01-01 | total: $100
customerId: C100 | orderDate: 2023-02-15 | total: $150
customerId: C100 | orderDate: 2023-03-10 | total: $200
-------------------------------------------------

Partition 2 (customerId: C200)
-------------------------------------------------
customerId: C200 | orderDate: 2023-01-05 | total: $80
customerId: C200 | orderDate: 2023-03-20 | total: $220
-------------------------------------------------
```
### 💡 How data is stored?

- DynamoDB partitions data by customerId, so all orders for C100 are stored in the same partition.
- Within each partition, items are sorted by orderDate.
### 🔍 Querying

- Efficient queries: Get all orders for C100 between two dates (Query with BETWEEN).
- Requires partition key: You must provide customerId to query.

 
# 3️⃣ Global Secondary Index (GSI)
- GSIs allow querying data using an alternative key structure by copying data from the base table.
- best for reads but costs new WCUs and RCUs
### 🔍 Think of GSI as a "View" of Your Data
- > GSI works as VIEWS in SQL DBs
- It does not replace the original table but copies specific attributes.
- It acts as a new table with a different PK and SK, optimized for specific queries.
- It is `always eventually consistent`, meaning updates to the original table may take a moment to reflect in the GSI.
- > This will create copy of original not modifes anything so eventual consistent
### 🔹 Example Table: Orders (PK = orderId, SK = customerId)

```yaml
Base Table (Primary Index: orderId, customerId)
---------------------------------------------------------
orderId: O100 | customerId: C100 | total: $100 | status: SHIPPED
orderId: O200 | customerId: C200 | total: $80  | status: PENDING
orderId: O300 | customerId: C100 | total: $200 | status: SHIPPED
---------------------------------------------------------

GSI: Index on `customerId` (PK = customerId, SK = orderId)
---------------------------------------------------------
customerId: C100 | orderId: O100 | total: $100 | status: SHIPPED
customerId: C100 | orderId: O300 | total: $200 | status: SHIPPED
customerId: C200 | orderId: O200 | total: $80  | status: PENDING
---------------------------------------------------------
```
### 💡 How data is stored?

- The base table stores data based on orderId.
- The GSI reorders data by customerId, allowing efficient queries on customers.
### 🔍 Querying

- Query all orders for C100 (without needing orderId).
- GSIs consume extra WCU & RCU, since they store copies of the data.

# 4️⃣ Local Secondary Index (LSI)
- LSIs allow querying data on the same partition but using a different sort key.
- `can be Strong Consistent or Eventual Consistent`

### 🔹 Example Table: Messages (PK = chatId, SK = timestamp)

```yaml

Base Table (Primary Index: chatId, timestamp)
---------------------------------------------------------
chatId: CHAT1 | timestamp: 2024-03-01 10:00 | sender: A | text: "Hello"
chatId: CHAT1 | timestamp: 2024-03-01 10:05 | sender: B | text: "Hi!"
chatId: CHAT1 | timestamp: 2024-03-01 10:10 | sender: A | text: "How are you?"
---------------------------------------------------------

LSI: Index on `chatId` but Sort Key = sender
---------------------------------------------------------
chatId: CHAT1 | sender: A | timestamp: 2024-03-01 10:00 | text: "Hello"
chatId: CHAT1 | sender: A | timestamp: 2024-03-01 10:10 | text: "How are you?"
chatId: CHAT1 | sender: B | timestamp: 2024-03-01 10:05 | text: "Hi!"
---------------------------------------------------------
```
### 💡 How data is stored?

- LSI keeps data in the same partition as the base table but adds a new way to sort it.
- Unlike GSIs, LSIs do not consume extra WCU, but do consume RCU.
## 🔍 Querying
- Find all messages in CHAT1 sent by user A (without scanning timestamps).

# 🚀 Key Takeaways
- Partition Key Only → Efficient lookups but no sorting.
- Partition + Sort Key → Allows sorting and range queries.
- GSI (Global Secondary Index) → Alternative key structure (supports multiple partitions).
- LSI (Local Secondary Index) → Alternative sorting within the same partition.
Multi-Partition Queries → Best done using BatchGetCommand or GSIs, avoid ScanCommand unless necessary.