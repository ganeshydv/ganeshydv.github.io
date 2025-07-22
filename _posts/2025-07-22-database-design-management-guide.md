---
layout: post
title: "Database Design & Management Guide"
categories: ["System Design & Architecture", "Database Design"]
tags: [database-design, complete-guide]
date: 2025-07-22
author: "GGurkhude"
description: "Complete database guide covering RDS, DynamoDB, SQL optimization, and database architecture"
toc: true
---

# Database Design & Management Guide

Complete database guide covering RDS, DynamoDB, SQL optimization, and database architecture

## 📚 Table of Contents

- [📝 **0.** Rds 0](#section-0)
  - [📝 **0-1.** Dynamodb 0.1 Keys](#section-0-1)
  - [📝 **0-1-1.** Dynamodb 0.1.1 Gsi Lsi](#section-0-1-1)
  - [📝 **0-1-1.** Dynamodb 0.1.1 Gsi Vs Lsi](#section-0-1-1)
  - [📝 **0-1-2.** Dynamodb 0.1.2 Questions](#section-0-1-2)
  - [📝 **0-2.** Dynamodb 0.2 How Data Stored](#section-0-2)
  - [📝 **0-2-1.** Dynamodb 0.2.1 Internals](#section-0-2-1)

### 📖 Core Topics
- [📝 **1.** Rds API 1](#section-1)
  - [📝 **1.** Dynamodb 1 Limits](#section-1)
  - [📝 **1-2.** Dynamodb 1.2 Limit](#section-1-2)

### 📖 DynamoDB
  - [📝 **2-0.** Dynamodb 2.0 Read Write Cmds](#section-2-0)
  - [📝 **2.** Dynamodb 2 Rcu Wcu Cal](#section-2)
  - [📝 **2-1.** Dynamodb 2.1 Get](#section-2-1)
  - [📝 **2-2.** Dynamodb 2.2 Update Batchwrite Vs Transaction](#section-2-2)

### 📖 DynamoDB
  - [📝 **3.** Dynamodb 3 Sd](#section-3)

### 📖 DynamoDB
  - [📝 **4.** Dynamodb 4 Cost](#section-4)

### 📖 DynamoDB
  - [📝 **5.** Dynamodb 5 Cmd](#section-5)
- [📝 **999.** Rds Vs Dynamodb](#section-999)
- [📝 **999.** SQL](#section-999)

---

*💡 **Quick Navigation Tip:** Click any section title to jump directly to that topic. Use 'Back to TOC' links to return to this overview.*



## 0. Rds 0 {#section-0}

*📖 [← Back to Table of Contents](#-table-of-contents)*

## 1. Storage Limits
- Maximum Storage per DB Instance:
   - General Purpose (gp2/gp3), Provisioned IOPS (io1/io2): Up to 64 TiB
   - Magnetic storage (deprecated): Up to 4 TiB
- Minimum Storage per DB Instance: 20 GiB
- Storage Auto Scaling: Automatically increases storage if enabled, up to the max limit.

## 2. Compute (Instance Size) Limits
- RDS instances are based on Amazon EC2. The instance types vary in:

    - vCPU: 1 to 128 vCPUs
    - Memory: 1 GB to 24 TB RAM
    - Network Performance: Scales with instance type, from low to 100 Gbps
    - IOPS (Input/Output Operations Per Second):
      - General Purpose (gp3): 3,000 IOPS baseline, can be configured up to 16,000 IOPS
      - Provisioned IOPS (io2/io1): Supports up to 256,000 IOPS

## 3. Row & Table Size Limits
- >Maximum Row Size:

   - MySQL: 65,535 bytes (excluding BLOBs/TEXT fields stored separately)
   - PostgreSQL: 1.6 GB per row
   - SQL Server: 8,060 bytes per row (excludes BLOBs stored separately)
   - A single row in MySQL/PostgreSQL cannot exceed ~65 KB.
       - If your table has many columns (e.g., 4,000 columns), but each row’s total size remains under 65 KB, you’re fine.
       - `Large text fields (e.g., TEXT, BLOB, JSON fields) don't count toward the 65 KB limit directly—they are stored separately, and only a pointer is stored in the row.`
- >Maximum Table Size:
  - Limited by storage size (64 TiB per instance)
  - Innodb (MySQL) limit: 16 TB per table
- >Maximum Columns per Table:

  - MySQL: 4096
  - PostgreSQL: 1600
  - SQL Server: 1024
## 4. Connection Limits in RDS

Each RDS instance has a max connection limit based on instance type.  

## Examples:

| Engine      | Formula for Max Connections            | Example (db.r5.large, 16GB RAM) |
|------------|--------------------------------------|--------------------------------|
| **MySQL**      | `max_connections = (RAM in GB * 125) + 1000` | **3000** |
| **PostgreSQL** | `max_connections = RAM in GB * 50`          | **800**  |
| **SQL Server** | Limited by licensing (Standard: 32,000)    | **32,767** |


#
### Workarounds for Connection Limits:
- **Use RDS Proxy** for connection pooling.
- **Use read replicas** to distribute read load.

## 5. Read/Write Requests (IO & Throughput)
 ### Maximum Read/Write IOPS:

- gp3 storage: 16,000 IOPS
- io2 storage: 256,000 IOPS
 ### Maximum Throughput:

- gp3: Up to 1000 MB/s
- io2: Up to 4000 MB/s
 ### Read/Write Query Limits:

- No hard limit, but performance depends on CPU, memory, and IOPS.
- Use Read Replicas to scale reads.

## 6. Read Replicas & Multi-AZ Limits
### Read Replicas per Primary DB:

- MySQL, MariaDB, PostgreSQL: Up to 15 read replicas
- SQL Server: Not supported (use Always On for HA)
### Multi-AZ Deployment:

- Supports only ONE standby replica (used for failover, not direct reads).
- Write operations are synchronous to standby → adds latency.

## 7. Query Execution Time Limits
- No built-in query timeout, but:
  - MySQL default wait timeout: 28800 sec (8 hours)
  - PostgreSQL statement_timeout: Can be configured.
Use application-side timeouts to avoid long queries.

## 8. Scaling & Failover Limits
### Vertical Scaling (Instance Upgrade):
- Causes downtime (unless using Aurora which supports online scaling).
### Horizontal Scaling (Read Replicas):
- Eventual consistency for reads (may cause lag).
### Failover Time (Multi-AZ):
- 30 to 60 seconds typically.

# RDS Limitations

| **Category**         | **Limitation**                                  |
|----------------------|-----------------------------------------------|
| **Storage**         | 64 TiB max per instance                        |
| **Compute**         | vCPU: 1 to 128, RAM: 1GB to 24TB               |
| **Row Size**        | MySQL: 65KB, PostgreSQL: 1.6GB                 |
| **Table Size**      | Limited by storage                             |
| **Connections**     | MySQL: `RAM * 125 + 1000`, PostgreSQL: `RAM * 50` |
| **Read/Write IOPS** | gp3: 16K IOPS, io2: 256K IOPS                  |
| **Read Replicas**   | MySQL/PostgreSQL: Up to 15                     |
| **Multi-AZ**       | Only one standby, no read scaling              |
| **Query Limits**    | No built-in timeout, but dependent on engine settings |
| **Backup Limits**   | Automated backups: 1-35 days                   |
| **Scaling**        | Vertical scaling needs downtime                |
| **Failover**       | Multi-AZ failover takes 30-60 seconds          |

#

# The RDS types with max_connections limit:

1. t2.micro 66
1. t2.small 150
1. m3.medium 296
1. t2.medium 312
1. m3.large 609
1. t2.large 648
1. m4.large 648
1. m3.xlarge 1237
1. r3.large 1258
1. m4.xlarge 1320
1. m2.xlarge 1412
1. m3.2xlarge 2492
1. r3.xlarge 2540

---

## 1. Rds API 1 {#section-1}

*📖 [← Back to Table of Contents](#-table-of-contents)*

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

---

## 999. Rds Vs Dynamodb {#section-999}

## DynamoDB vs. RDS (MySQL Default) Comparison

| Feature             | DynamoDB                              | RDS (MySQL Default)                      |
|--------------------|-------------------------------------|-----------------------------------------|
| **Max Table Size** | No limit (scales automatically)   | 20 GiB (default), expandable up to 64 TiB |
| **Row/Item Size**  | 400KB per item (including metadata & attributes) | 64MB per row (InnoDB) |
| **Column Limit**   | No fixed limit (attribute-based)  | 4096 columns (MySQL InnoDB) |
| **Scaling**        | Fully managed, auto-scales        | Manual scaling (vertical scaling required) |
| **Storage Type**   | SSD-based (key-value, NoSQL)      | SSD (Relational DB, SQL-based)         |
| **Data Model**     | Key-Value, Document DB            | Relational (structured tables)         |
| **Throughput**     | Provisioned (Auto/On-demand)      | Limited by instance type               |

#

---

## 999. SQL {#section-999}

## Check indexes Query:
```sql
SELECT index_name, table_name
FROM information_schema.statistics
WHERE table_schema = 'database_name';
```

## Copy Table Data to NEW Table
```sql
CREATE TABLE table_name as Select * from table_2;
```
## Change Column Data Type
```sql
ALTER TABLE table_name
MODIFY column_name NEW_DATA_TYPE;
```

## Change Column to AutoIncrement
```sql
ALTER TABLE table_name MODIFY COLUMN column_name INT AUTO_INCREMENT;
```

## Query to display the SQL statement that was used to create the Table 
```sql
SHOW CREATE TABLE table_name;
```

---

### 0-1. Dynamodb 0.1 Keys {#section-0-1}

> **📁 Topic: DynamoDB**

## How Partion key, composite key, sort key, GSI and LSI is used
> Partion Key- Primary Key
  - Divides data in partitions 
> Sort Key - Secondary Key:
- if after dividing data in partionsm, data is sorted based on sort key in those partitions
> Composite Key: PK +SK
- **This is also A Primary key**
- Why? makes query fast only used if sort key is also present
> GSI:
- GSI = new PK + new SK
- max can be 20 per table
- This creates new copy of data not modifies original so there will be eventual consistency
- This is Like VIEWS in SQL DBs
- GSI used for read cases why because it creates new copy based on new Partiton (Primarty) key and sort(secondary) key

> LSI:
- Can only create when table is created
- Risky : why? it adds more data to Origingal Table - Local secondary indexes add an item collection size limit
- If you add a local secondary index, there is a 10GB limit to any given item collection (all partitons).
# GSI vs LSI

- With a local secondary index, you have the same options as with a base table. By default, all reads from a local secondary index are eventually consistent. 
- However, you may opt into a strongly consistent read if you need it. With a global secondary index, you don't have this option. All reads from a global secondary index are eventually consistent.

---

### 0-1-1. Dynamodb 0.1.1 Gsi Lsi {#section-0-1-1}

> **📁 Topic: DynamoDB**

# 1️⃣ How Does LSI Work?
- LSI uses the **same Partition Key (PK)** but allows a different **Sort Key (SK)**.
- LSI **does NOT copy data** to a separate location. Instead, it extends the existing partition.
- All data remains within the **original partition**, just with another way to query and sort.
- When you query an LSI, DynamoDB fetches data **only from a single partition** (since the PK must match).

## 🔹 Example of LSI in Action
Let's say we have a **Users** table where:  

- **PK = userId**  
- **SK = loginTimestamp** (to track user logins)  
- We also create an **LSI with SK = userEmail**  

| userId (PK) | loginTimestamp (SK) | userEmail (LSI SK)  | role  |
|------------|------------------|------------------|-------|
| U100      | 2024-02-10 10:00  | user1@email.com  | Admin |
| U100      | 2024-02-12 15:00  | user1@email.com  | Admin |
| U200      | 2024-02-11 14:30  | user2@email.com  | Member |

### ❓ How does LSI affect partitions?
- Since `userId` is the **Partition Key**, all records for `U100` are stored **in the same partition**.
- Normally, we can only **sort by loginTimestamp**, but with the **LSI**, we can also **sort by userEmail**.
- **No extra copy of data** is stored, just an additional **Sort Key reference inside the same partition**.

### ✅ Benefits of LSI
- 🚀 **No additional storage costs** (data stays in the same partition).  
- ✅ **Strongly consistent reads** (queries are immediately updated).  
- 🔍 **Can query within a single partition using the new SK**.  

### ❌ Limitations of LSI
- 🚫 **Cannot query across partitions** (must know the PK to use it).  
- ⚠️ **Max 5 LSIs per table** (hard limit).  

---

# 2️⃣ How Does GSI Work?
- GSI allows a **completely new Partition Key (PK) and Sort Key (SK)**.
- GSI **copies the relevant data** to a **separate location** (so it's independent of the original table's partitioning).
- Queries can access **data across all partitions** (because GSI data is **not tied to the original PK**).
- **Eventual consistency** (since it takes time to replicate data to the GSI).

## 🔹 Example of GSI in Action
Let's say we have the same **Users** table, but now we want to **query by email** instead of `userId`.  
We create a **GSI with**:  

- **PK = userEmail**  
- **SK = loginTimestamp**  

| userEmail (GSI PK) | loginTimestamp (GSI SK) | userId | role  |
|------------------|------------------|-------|-------|
| user1@email.com | 2024-02-10 10:00  | U100  | Admin |
| user1@email.com | 2024-02-12 15:00  | U100  | Admin |
| user2@email.com | 2024-02-11 14:30  | U200  | Member |

### ❓ How does GSI affect partitions?
- Data is **duplicated into a new partition** based on `userEmail` instead of `userId`.
- If `user1@email.com` has records **in different partitions in the original table**, all their records will **now be in the same partition in the GSI**.
- This allows **fast global lookups**, but **increases storage and WCU costs**.

### ✅ Benefits of GSI
- 🌎 **Can query across partitions** (without knowing the original PK).  
- 🚀 **No restriction on number of items per partition** (unlike LSI).  
- 🔧 **Can be added to an existing table without affecting writes**.  

### ❌ Limitations of GSI
- 💰 **Extra storage cost** (since it copies data).  
- ⏳ **Eventual consistency** (updates take time).  
- ⚠️ **Max 20 GSIs per table** (can be increased by AWS Support).  

---

# 📌 Summary of Key Differences  

| Feature               | LSI (Local Secondary Index) | GSI (Global Secondary Index) |
|----------------------|--------------------------|--------------------------|
| **Partition Key (PK)** | Same as main table       | Can be different from main table |
| **Sort Key (SK)**     | Different SK, but same PK | Different SK and PK       |
| **Data Storage**      | Stored in the same partition | Copied to a separate partition |
| **Read Consistency**  | Strongly consistent      | Eventually consistent      |
| **Query Scope**       | Only within a partition  | Across all partitions      |
| **Storage Cost**      | No extra cost            | Extra cost (due to data duplication) |
| **Performance Impact**| Low (uses same partition) | Higher WCU cost (separate storage) |
| **Maximum Limit**     | 5 per table              | 20 per table (can be increased) |

---

# 🛠️ When to Use LSI vs GSI?

| Use Case                                            | Use LSI ✅ | Use GSI ✅ |
|-----------------------------------------------------|-----------|-----------|
| Query by a different sort key within the same PK   | ✅ Yes    | ❌ No     |
| Query by a completely different attribute as a new PK | ❌ No     | ✅ Yes    |
| Ensure strongly consistent reads                   | ✅ Yes    | ❌ No     |
| Avoid extra storage costs                          | ✅ Yes    | ❌ No     |
| Query across all partitions                        | ❌ No     | ✅ Yes    |

---

🚀 **LSI is best when you need an additional Sort Key within the same partition**  
🌍 **GSI is best when you need to query across multiple partitions using a new PK**

---

### 0-1-1. Dynamodb 0.1.1 Gsi Vs Lsi {#section-0-1-1}

> **📁 Topic: DynamoDB**

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

---

### 0-1-2. Dynamodb 0.1.2 Questions {#section-0-1-2}

> **📁 Topic: DynamoDB**

# 1️⃣ What If an Item Doesn’t Have a Sort Key?
- If your table has only a **Partition Key (PK)** (i.e., a **simple primary key**), all queries will be based **only on the PK**.
- If your table has a **PK + SK schema** (i.e., a **composite primary key**), but **some items don’t have an SK**, then:
  - ✅ **DynamoDB still stores the item**.
  - ⚠️ However, when querying, it **might not appear** in results unless explicitly handled.

## ✅ Example: Table with Optional Sort Key
Imagine a **Users** table with:

- **PK = userId**
- **SK = lastLoginTimestamp** (optional)

| userId (PK) | lastLoginTimestamp (SK) | name  |
|------------|------------------|------|
| U100      | 2024-02-10 10:00  | Alice |
| U101      | (null)            | Bob   |

### ❓ How does this affect queries?
- If you query for `userId = U101` and expect a **sort key condition** (e.g., `lastLoginTimestamp > someDate`), **it will not be returned**.
- If you only **query by PK** (without SK condition), you **will still get the item**.

---

# 2️⃣ What If an Item Doesn’t Have an LSI?
- **LSI is optional**, so if an item **doesn’t have the LSI attribute**, it **simply won’t be included in LSI queries**.
- The item still **exists in the main table** but **won't be retrieved** when querying via LSI.

## ✅ Example: Table with LSI (Optional Field)
Imagine a **Products** table:

- **PK = productId**
- **SK = createdAt**
- **LSI = category**

| productId (PK) | createdAt (SK) | category (LSI SK) |
|---------------|--------------|----------------|
| P100         | 2024-02-10   | Electronics   |
| P101         | 2024-02-12   | (null)        |

### ❓ How does this affect queries?
- If you query by `category = Electronics` on the **LSI**, you'll only get **P100**, **NOT P101**.
- If you query by `productId = P101` in the **base table**, it **still exists** and will be returned.

---

# 3️⃣ Can We Insert Data Without a Partition Key?
❌ **No! Every item must have a Partition Key**.

- **DynamoDB requires a PK for every item** to ensure data is **properly distributed across partitions**.
- If a table has a **PK + SK**, you can **skip the SK**, but **not the PK**.

## ❌ What Happens If You Try to Insert Without a PK?
You'll get an error like:

```json
{
  "error": "ValidationException",
  "message": "One or more parameter values were invalid: Missing the key attribute in the item"
}

---

### 0-2. Dynamodb 0.2 How Data Stored {#section-0-2}

> **📁 Topic: DynamoDB**

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

---

### 0-2-1. Dynamodb 0.2.1 Internals {#section-0-2-1}

> **📁 Topic: DynamoDB**

# DynamoDB Query Processing: Hashing & Indexing Explained

## 1️⃣ Partition Key (PK) Lookup – Uses Hashing (HashMap-like Structure)
When you query an item using the **Partition Key (PK)**, DynamoDB performs a **hash lookup**, similar to a **hashmap** (but distributed across partitions).

### ✅ How It Works:
1. DynamoDB applies a **hash function** on the Partition Key.
2. This determines **which physical partition** (server) holds the data.
3. The lookup is **O(1) time complexity** (constant time).
4. Once the partition is found, the item is retrieved **quickly**.

### 🔹 Example: Simple Primary Key Table
| **PK (UserID)** | **Name** |
|-------------|------|
| U100       | Alice |
| U200       | Bob   |

### 🔍 Lookup Process:
1. User requests **U100**.
2. DynamoDB applies a **hash function** to `U100` → Gets a **partition number**.
3. Retrieves the item from that **partition** in **O(1) time**.

✔ **Fast retrieval if querying by Partition Key.**

---

## 2️⃣ Sort Key (SK) Lookup – Uses B-Tree Indexing
If a table has **both PK and SK (composite key)**, DynamoDB:
1. First, **uses hashing** on the **Partition Key** to find the partition.
2. Then, within that partition, **Sort Key values are indexed using a B-Tree** (or similar ordered structure).

### 🔹 Example: Composite Primary Key Table (PK + SK)
| **PK (OrderID)** | **SK (Timestamp)** | **Item**  |
|--------------|------------------|-------|
| O100        | 2024-01-01        | Laptop |
| O100        | 2024-02-10        | Phone  |
| O100        | 2024-03-05        | Tablet |

### 🔍 Lookup Process:
1. User requests **O100** and needs the **latest order**.
2. **Hashing finds the partition** for `O100`.
3. **B-Tree indexing** is used to **sort orders by Timestamp**.
4. Retrieves the latest order **efficiently** in **O(log n) time**.

✔ **Fast range queries due to B-Tree indexing.**

---

## 3️⃣ Global Secondary Index (GSI) – Also Uses Hashing
When a **Global Secondary Index (GSI)** is created:
- A **new table-like structure** is formed with a **new Partition Key**.
- The **same hashing mechanism** is applied for **quick lookups**.

### 🔹 Example: Using GSI for Faster Queries
| **PK (UserID)** | **Name** | **GSI: Email** |
|-------------|------|----------------|
| U100       | Alice | alice@email.com |
| U200       | Bob   | bob@email.com   |

### 🔍 Lookup Process for GSI (Email-based search):
1. User searches by **email** (`alice@email.com`).
2. **GSI hashes** `alice@email.com` to find the **partition**.
3. Retrieves the **UserID (U100) efficiently**.

✔ **Fast alternate queries using GSIs.**

---

## 🔹 Summary Table: Hashing vs. B-Trees in DynamoDB

| **Feature**                     | **Uses Hashing (HashMap)?** | **Uses B-Trees?** |
|---------------------------------|----------------------|------------|
| **Partition Key (PK)**          | ✅ Yes (for fast lookups) | ❌ No     |
| **Sort Key (SK)**               | ❌ No                     | ✅ Yes (for sorting within partitions) |
| **Global Secondary Index (GSI)** | ✅ Yes (for fast lookups) | ❌ No     |
| **Local Secondary Index (LSI)**  | ✅ Yes (same PK)          | ✅ Yes (for sorting within partitions) |

---

## 🚀 Optimized Querying Strategy
✔ **Use PK** for fast lookups (**O(1)**).  
✔ **Use PK + SK** for range queries (**O(log n)**).  
✔ **Use GSI** for alternate fast lookups (**O(1)**).  

---

🚀 **Would you like a deeper dive into how DynamoDB partitions work at scale?**

---

### 1. Dynamodb 1 Limits {#section-1}

> **📁 Topic: DynamoDB**

# 1. Capacity & Throughput Limits
- 1. on demand - auto scale
- 2. Provisioned
## Capacity:
- > DynamoDB tables don't have any limit for storage but depends on tier
- For free tier: 25GB with 25 WCU and 25 RCU
###  DynamoDB Read & Write Limits

| Operation                  | RCU/WCU Required         | Formula |
|----------------------------|-------------------------|------------------------------------------------|
| **Strongly Consistent Read** | 1 RCU per 4KB item      | `RCUs = (Item Size / 4KB) * Reads per second`  |
| **Eventually Consistent Read** | 0.5 RCU per 4KB       | Half of strongly consistent read              |
| **Transactional Read**      | 2 RCU per 4KB           | Twice the strongly consistent read            |
| **Standard Write**          | 1 WCU per 1KB item      | `WCUs = (Item Size / 1KB) * Writes per second` |
| **Transactional Write**     | 2 WCU per 1KB item      | Twice the standard write                      |


#

### 🚀 Example Calculation:

- If you're reading 100 items per second, each 2KB in size, eventually consistent:
   - > RCUs = (2KB / 4KB) * (100) * 0.5 = 25 RCUs
- If you're writing 50 items per second, each 500 bytes:
   - > WCUs = (500B / 1KB) * 50 = 25 WCUs
### 📌 Max RCUs & WCUs
- Per table: 40,000 RCUs & 40,000 WCUs
- Per account: Unlimited (but soft limits apply)

#
# 2. DynamoDB Item Size Limits

| Attribute            | Max Size                                      |
|----------------------|----------------------------------------------|
| **Single Item**      | 400KB (including metadata & attributes)      |
| **String Attribute** | 400KB                                        |
| **Binary Attribute** | 400KB                                        |
| **Number Attribute** | 38 digits                                    |

🚨 **Implication:** Avoid storing large blobs (e.g., images, videos) directly in DynamoDB. Store them in **S3** and keep references (URLs) in DynamoDB.

# 3. Partition & Scaling Limits
- DynamoDB partitions data across multiple storage nodes automatically.

### Partitioning Basics
- Each partition provides:
   - 3,000 RCUs (12,000 eventually consistent reads)
   - 1,000 WCUs
   - 10GB storage
### 💡 Partition Formula

- **`Total Partitions = (RCUs / 3000) OR (WCUs / 1000) OR (Total Size / 10GB)`**
### 🚀 Partitioning Example
- If your table has 15,000 RCUs, 5,000 WCUs, and 200GB data, then:
   - RCU Partitions: 15,000 / 3,000 = 5
   - WCU Partitions: 5,000 / 1,000 = 5
   - Size Partitions: 200GB / 10GB = 20
   - 🚀 DynamoDB will create 20 partitions (max of the three).
### 📌 Partition Performance Considerations
- Hot partitions can slow down your table (avoid skewed access patterns).
- Always use evenly distributed partition keys (e.g., userId + timestamp).

# 4. Indexing Limits
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
# 5. DynamoDB Query & Scan Limits

| Operation       | Max Item Size Read  | Best Practices                                      |
|----------------|--------------------|----------------------------------------------------|
| **Query**      | 1MB                 | Use pagination (`LastEvaluatedKey`)               |
| **Scan**       | 1MB                 | Avoid full table scans (expensive & slow)         |
| **BatchGetItem** | 100 items or 16MB  | Use parallelization                               |
| **BatchWriteItem** | 25 items or 16MB | Handle throttling with retries                   |

#

# 6. TTL (Time-to-Live) Limits
- Can be set for auto-expiring items.
- Deletes are not immediate (eventually removed).
- TTL attribute must be a number (epoch timestamp in seconds).
- Does not consume WCU/RCU (but triggers DynamoDB Streams).

# 7. DynamoDB Streams
- Captures item-level changes in the table.
- Can be consumed by Lambda or Kinesis.
- Stream Record Retention: 24 hours.
### 🚀 Use Case:
- Event-driven architecture (e.g., syncing with Elasticsearch, triggering notifications)

# 8. Strong vs Eventual Consistency
- Strongly Consistent Reads (Slower, costs more RCUs).
- Eventually Consistent Reads (Default, cheaper).
- Transactional Reads/Writes (ACID-compliant but doubles the RCU/WCU cost).

# 9. Throttling & Rate Limits
- DynamoDB will throttle when RCU/WCU limits are exceeded.
- Avoid hot partitions (common with monotonous keys like timestamps).
- Use exponential backoff for retries.

# 10. Multi-Region Replication (Global Tables)
- Automatic multi-region replication.
- Adds latency but improves availability.
- Writes are replicated asynchronously.

---

### 1-2. Dynamodb 1.2 Limit {#section-1-2}

> **📁 Topic: DynamoDB**

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

---

### 2-0. Dynamodb 2.0 Read Write Cmds {#section-2-0}

> **📁 Topic: DynamoDB**

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

---

### 2. Dynamodb 2 Rcu Wcu Cal {#section-2}

> **📁 Topic: DynamoDB**

# DynamoDB RCU & WCU Calculation

### Example
- **Get** : Query- eventual :Q1: size: 1kb x 32 = 32kb : 1 req. 
- **Archive**: Update-standard: Q2: 1kb x 32 =32 kb (max) : 1 req. 
- **Delete**: BatchWrite-Standard: Q3: 0.5kb x 25 =12.5kb (max) -  1 req.
- **PUT**: BatchWrite-Standard: Q4:  1kb x 25 = 25 kb (max)  - 1 req. 

## 1. Get (Query - Eventual) → Q1  
📌 **QueryCommand with Eventual Consistency**  

- **Size per item:** 1 KB  
- **Number of items:** 32  
- **Total size:** 1 KB × 32 = 32 KB  

- ## RCU Calculation
  - **Eventual Consistency RCU Formula:**  
    - **Formula:**
       - RCU = Σ ⌈ Total Size / 4KB ⌉ × 0.5
  - **Example Calculation:**
     - RCU = Σ ⌈ 32 / 4 ⌉ × 0.5 = ⌈ 8 ⌉ × 0.5 = 4 RCU
  - ✅ **RCU Used = 4**  

---

## 2. Archive (Update - Standard) → Q2  
📌 **UpdateCommand with Standard Write**  

- **Size per item:** 1 KB  
- **Number of items:** 32  
- **Total size:** 1 KB × 32 = 32 KB  

- ## WCU Calculation
   - **Standard Write WCU Formula:**  
      - **Formula:**  
         - WCU = Σ ⌈ Total Size / 1KB ⌉ × 1  
   
   - **Example Calculation:**  
      - WCU = Σ ⌈ 32 / 1 ⌉ × 1 = 32 WCU  
   
   - ✅ **WCU Used = 32**  

---

## 3. Delete (BatchWrite - Standard) → Q3  
📌 **BatchWriteCommand with Standard Write**  

- **Size per item:** 0.5 KB  
- **Number of items:** 25  
- **Total size:** 0.5 KB × 25 = 12.5 KB  

- ## WCU Calculation

- **Standard Write WCU Formula:**  
   - **Formula:**  
     - WCU = Σ ⌈ Each Item Size / 1KB ⌉  

   - Each item (0.5 KB) rounds up to **1 WCU**  

- **Example Calculation:**  
   - 25 items × 1 WCU = **25 WCU**  
   - ✅ **WCU Used = 25**  

---

## 4. PUT (BatchWrite - Standard) → Q4  
📌 **BatchWriteCommand with Standard Write**  

- **Size per item:** 1 KB  
- **Number of items:** 25  
- **Total size:** 1 KB × 25 = 25 KB  

- ## Write Capacity Unit (WCU) Calculation
    - **Standard Write WCU Formula:**  
       - WCU = Sum (Ceil(Each Item Size / 1KB))
    - Each item (1 KB) rounds up to **1 WCU**  
       - Calculation for 25 items:  
          - **25 items × 1 WCU = 25 WCU**
   - ✅ **WCU Used = 25**  

#

# Final Summary

| Operation  | Type       | Total Size | Read Type  | Write Type | RCU Used | WCU Used |
|------------|------------|------------|------------|------------|------------|------------|
| **Q1 - Get**  | Query       | 32 KB      | Eventual   | -          | 4 RCU      | -          |
| **Q2 - Update** | Update     | 32 KB      | -          | Standard   | -          | 32 WCU     |
| **Q3 - Delete** | BatchWrite | 12.5 KB    | -          | Standard   | -          | 25 WCU     |
| **Q4 - PUT**    | BatchWrite | 25 KB      | -          | Standard   | -          | 25 WCU     |


#


## Scaling to 1000 Queries Per Operation

| Operation            | Single Req. RCU/WCU | 1000 Requests RCU/WCU |
|----------------------|--------------------|-----------------------|
| **Q1 - Get (Query)**  | 4 RCU              | 4000 RCU             |
| **Q2 - Update**       | 32 WCU             | 32,000 WCU           |
| **Q3 - Delete (BatchWrite)** | 25 WCU     | 25,000 WCU           |
| **Q4 - PUT (BatchWrite)**    | 25 WCU     | 25,000 WCU           |

#

---

### 2-1. Dynamodb 2.1 Get {#section-2-1}

> **📁 Topic: DynamoDB**

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

---

### 2-2. Dynamodb 2.2 Update Batchwrite Vs Transaction {#section-2-2}

> **📁 Topic: DynamoDB**

# 🛠️ Why Both Transactions and BatchWriteItem in DynamoDB?  

DynamoDB provides both **Transactions (TransactWriteItems)** and **BatchWriteItem (BatchWriteCommand)**, but they serve different purposes based on **consistency, performance, and use case**.  

| **Feature**            | **Transactions (TransactWriteItems)** | **BatchWriteItem (BatchWriteCommand)** |
|------------------------|--------------------------------------|--------------------------------------|
| **Atomicity**         | ✅ Yes (all succeed or all fail) | ❌ No (some writes may succeed while others fail) |
| **Consistency**       | ✅ Strong consistency across multiple tables | ❌ Eventual consistency (no guarantee all writes are applied together) |
| **Use Case**          | When multiple related updates must succeed or fail together (e.g., financial transactions, order processing) | When writing multiple unrelated items where failures can be retried individually |
| **Max items per request** | 25 items (or 4MB total size) | 25 items (or 16MB total size) |
| **Performance**       | ⏳ Slower (ACID overhead) | ⚡ Faster (No transaction validation) |
| **Cost**             | **2x WCU per item** (transactional writes are more expensive) | **1x WCU per item** |

---

## 🚀 When to Use Each?  

### ✅ Use **BatchWriteItem** for **Speed**  
- When inserting bulk, independent items (**e.g., logs, analytics data**).  
- If some items failing is acceptable (**since it's not atomic**).  
- **Example:** Inserting multiple students into a DynamoDB table.  

### ✅ Use **Transactions** for **Reliability**  
- When updating **multiple related items** (**e.g., transferring funds between accounts**).  
- If **all operations must either succeed or fail** (**ACID requirement**).  
- **Example:** Assigning a course to a student while updating **two tables atomically**.  

---

## ⏳ Response Time Comparison  

| **Operation**          | **Expected Response Time** |
|------------------------|--------------------------|
| **BatchWriteItem**    | ⚡ Faster (~10ms - 50ms per request) (**DynamoDB handles writes in parallel**) |
| **Transaction Write**  | ⏳ Slower (~50ms - 150ms per request) (**Ensures atomicity across multiple tables**) |

🚀 **BatchWriteItem** is faster because it **does not validate relationships** or ensure all operations succeed together.  
⏳ **Transactions** take longer because they require an **all-or-nothing guarantee**.

---

### 3. Dynamodb 3 Sd {#section-3}

> **📁 Topic: DynamoDB**

# 🛠 Best Practices for System Design
## 1. Avoid Hot Partitions:
- Use a high-cardinality partition key (e.g., userId + timestamp).
- Avoid using sequential IDs (e.g., auto-incremented numbers).
## 2. Optimize Read/Write Costs:
- Prefer eventual consistency where possible.
- Use batch operations to reduce request count.
## 3. Minimize Scans:
Design queries to use Query, not Scan.
Use secondary indexes wisely (but not excessively).
## 4. Optimize Large Item Storage:
- Store large objects in S3 and keep a reference in DynamoDB.
## 5. Use Caching:
- Use DAX (DynamoDB Accelerator) or Redis to reduce DynamoDB reads.
## 6. Monitor & Tune Capacity:
- Enable Auto Scaling in provisioned mode.
- Use CloudWatch Alarms to detect high utilization.

---

### 4. Dynamodb 4 Cost {#section-4}

> **📁 Topic: DynamoDB**

## DynamoDB
### Example
- Get : Query- eventual :Q1: size: 1kb x 32 = 32kb : 1 req. 
- Archive: Update-standard: Q2: 1kb x 32 =32 kb (max) : 1 req. 
- Delete-BatchWrite-Standard: Q3: 0.5kb x 25 =12.5kb (max) -  1 req.
- PUT- BatchWrite-Standard: Q4:  1kb x 25 = 25 kb (max)  - 1 req. 

## 📌 AWS Pricing (as of latest AWS pricing updates)
### DynamoDB has two pricing models:

1. On-Demand Mode (Pay per request)
2. Provisioned Mode (Pay per reserved RCU/WCU)
- Since you're handling large-scale queries, I'll calculate based on On-Demand 
# Pricing:
📌 AWS Pricing (as of latest AWS pricing updates)
## DynamoDB has two pricing models:

1. On-Demand Mode (Pay per request)
1. Provisioned Mode (Pay per reserved RCU/WCU)
Since you're handling large-scale queries, I'll calculate based on On-Demand Pricing:
## DynamoDB Pricing: Capacity Units (on 03/2025)

| Capacity Type                | Price per Unit             |
|------------------------------|----------------------------|
| **RCU (Read Capacity Unit)**  | $0.00013 per RCU          |
| **WCU (Write Capacity Unit)** | $0.00065 per WCU          |


# DynamoDB RCU & WCU Calculation

## 1. Get (Query - Eventual) → Q1  
📌 **QueryCommand with Eventual Consistency**  

- **Size per item:** 1 KB  
- **Number of items:** 32  
- **Total size:** 1 KB × 32 = 32 KB  

- ## RCU Calculation
  - **Eventual Consistency RCU Formula:**  
    - **Formula:**
       - RCU = Σ ⌈ Total Size / 4KB ⌉ × 0.5
  - **Example Calculation:**
     - RCU = Σ ⌈ 32 / 4 ⌉ × 0.5 = ⌈ 8 ⌉ × 0.5 = 4 RCU
  - ✅ **RCU Used = 4**  

---

## 2. Archive (Update - Standard) → Q2  
📌 **UpdateCommand with Standard Write**  

- **Size per item:** 1 KB  
- **Number of items:** 32  
- **Total size:** 1 KB × 32 = 32 KB  

- ## WCU Calculation
   - **Standard Write WCU Formula:**  
      - **Formula:**  
         - WCU = Σ ⌈ Total Size / 1KB ⌉ × 1  
   
   - **Example Calculation:**  
      - WCU = Σ ⌈ 32 / 1 ⌉ × 1 = 32 WCU  
   
   - ✅ **WCU Used = 32**  

---

## 3. Delete (BatchWrite - Standard) → Q3  
📌 **BatchWriteCommand with Standard Write**  

- **Size per item:** 0.5 KB  
- **Number of items:** 25  
- **Total size:** 0.5 KB × 25 = 12.5 KB  

- ## WCU Calculation

- **Standard Write WCU Formula:**  
   - **Formula:**  
     - WCU = Σ ⌈ Each Item Size / 1KB ⌉  

   - Each item (0.5 KB) rounds up to **1 WCU**  

- **Example Calculation:**  
   - 25 items × 1 WCU = **25 WCU**  
   - ✅ **WCU Used = 25**  

---

## 4. PUT (BatchWrite - Standard) → Q4  
📌 **BatchWriteCommand with Standard Write**  

- **Size per item:** 1 KB  
- **Number of items:** 25  
- **Total size:** 1 KB × 25 = 25 KB  

- ## Write Capacity Unit (WCU) Calculation
    - **Standard Write WCU Formula:**  
       - WCU = Sum (Ceil(Each Item Size / 1KB))
    - Each item (1 KB) rounds up to **1 WCU**  
       - Calculation for 25 items:  
          - **25 items × 1 WCU = 25 WCU**
   - ✅ **WCU Used = 25**  

#

# Final Summary

| Operation  | Type       | Total Size | Read Type  | Write Type | RCU Used | WCU Used |
|------------|------------|------------|------------|------------|------------|------------|
| **Q1 - Get**  | Query       | 32 KB      | Eventual   | -          | 4 RCU      | -          |
| **Q2 - Update** | Update     | 32 KB      | -          | Standard   | -          | 32 WCU     |
| **Q3 - Delete** | BatchWrite | 12.5 KB    | -          | Standard   | -          | 25 WCU     |
| **Q4 - PUT**    | BatchWrite | 25 KB      | -          | Standard   | -          | 25 WCU     |

#

## Scaling to 1000 Queries Per Operation

| Operation            | Single Req. RCU/WCU | 1000 Requests RCU/WCU |
|----------------------|--------------------|-----------------------|
| **Q1 - Get (Query)**  | 4 RCU              | 4000 RCU             |
| **Q2 - Update**       | 32 WCU             | 32,000 WCU           |
| **Q3 - Delete (BatchWrite)** | 25 WCU     | 25,000 WCU           |
| **Q4 - PUT (BatchWrite)**    | 25 WCU     | 25,000 WCU           |

# WCU 📊 Cost Calculation for 1000 Accounts (1M Students)

| Operation | Total RCU/WCU | Price per Unit | Total Cost |
|-----------|--------------|---------------|------------|
| Q1 - Get (Query - Eventual) | 4,000,000 RCU | $0.00013 per RCU | $520 |
| Q2 - Update (Standard Write) | 32,000,000 WCU | $0.00065 per WCU | $20,800 |
| Q3 - Delete (BatchWrite - Standard) | 25,000,000 WCU | $0.00065 per WCU | $16,250 |
| Q4 - PUT (BatchWrite - Standard) | 25,000,000 WCU | $0.00065 per WCU | $16,250 |
| **Total Cost (RCU + WCU)** |  |  | **$53,820** |

---

## 📉 How to Optimize Cost?  
### 🚀 Optimizations to Reduce DynamoDB Costs  

### 1️⃣ 🚀 Reduce Reads (RCU) with `ProjectionExpression`  
If you only fetch necessary attributes, you reduce RCU by **~50-70%**  

✅ **New Cost (after optimization)** → **$150-$250** (instead of $520)  

---

### 2️⃣ 🚀 Reduce Writes (WCU) using **DynamoDB Streams**  
Instead of direct updates (**Q2 - Update**), store changes in **DynamoDB Streams** and batch process them.  
Can reduce **WCU by ~50%**  

✅ **New Cost (after optimization)** → **~$10,400** (instead of $20,800)  

---

### 3️⃣ 🚀 Use **TTL (Time to Live) for Deletes**  
Instead of manually deleting items (**Q3 - Delete**), set **TTL (Time to Live)** on items.  
Deletes become **free** instead of using **25M WCU ($16,250)**  

✅ **New Cost (after optimization)** → **$0** (instead of $16,250)  

---

### 4️⃣ 🚀 Write in Larger Batches  
**BatchWriteItem** can handle **25 items per request**  
If you optimize **batch sizes**, you reduce WCU by **~30%**  

✅ **New Cost (after optimization)** → **$11,375** (instead of $16,250)  

---

## 🔥 New Optimized Cost 🔥  

| Operation | Old Cost | New Optimized Cost |
|-----------|---------|--------------------|
| Q1 - Get (Query) | $520 | $200 |
| Q2 - Update | $20,800 | $10,400 |
| Q3 - Delete | $16,250 | $0 (TTL instead of WriteOps) |
| Q4 - PUT | $16,250 | $11,375 |
| **Total Cost** | **$53,820** | **$21,975 (🔥 60% savings)** |

---

### 5. Dynamodb 5 Cmd {#section-5}

> **📁 Topic: DynamoDB**

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

---

## DynamoDB



---

## 🎯 Summary

This comprehensive guide covers all aspects of database design, providing practical examples and best practices for real-world implementation.

## 🔗 Related Topics

- [All Categories](/categories/)
- [Technical Collections](/collections/)
- [Latest Posts](/)

---

*📝 **Note:** This guide consolidates multiple learning materials into a single comprehensive resource. Each section represents hands-on learning and practical implementation experience.*
