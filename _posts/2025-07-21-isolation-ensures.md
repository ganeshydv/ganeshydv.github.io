---
layout: post
title: "Isolation ensures:"
date: 2025-07-21
categories: [system-design, db]
tags: [dynamodb, database, transactions]
author: "GGurkhude"
excerpt: "Learning notes on isolation ensures:"
original_path: "3_SystemDesign/DB/ACID_2_Isolation_levels_1.md"
---


# 🔒 Isolation ensures:
Multiple transactions running concurrently do not interfere with each other’s data in a way that would lead to inconsistency.

## 🎯 Why Isolation is Important
Imagine two users booking the last available seat:

- T1: Checks available seats (sees 1)
- T2: Also checks (sees 1)
- Both try to book → if no isolation → 2 bookings made = Data corruption
- Isolation ensures one transaction sees a consistent snapshot, or waits/blocks accordingly.

## 🔍 Isolation Phenomena

| Issue                   | Description                                        | Example                                                                    |
| ----------------------- | -------------------------------------------------- | -------------------------------------------------------------------------- |
| **Dirty Read**          | Read **uncommitted** data from another transaction | T1 writes → T2 reads → T1 rolls back                                       |
| **Non-repeatable Read** | Re-reading gives **different result**              | T1 reads → T2 updates → T1 reads again                                     |
| **Phantom Read**        | New rows **appear/disappear** in repeated query    | T1: `SELECT * WHERE age > 30` → T2 inserts → T1 runs again, gets more rows |


## Types of Isolation Levels

| Isolation Level      | Prevents                     | Allows                                           |
| -------------------- | ---------------------------- | ------------------------------------------------ |
| **Read Uncommitted** | Nothing                      | Dirty Reads, Non-repeatable Reads, Phantom Reads |
| **Read Committed**   | Dirty Reads                  | Allows: Non-repeatable, Phantom                  |
| **Repeatable Read**  | Dirty + Non-repeatable Reads | Allows: Phantom Reads                            |
| **Serializable**     | All anomalies prevented      | Slowest, highest locking                         |



## Overview

| Level                | Dirty Reads | Non-repeatable Reads | Phantom Reads |
| -------------------- | ----------- | -------------------- | ------------- |
| **Read Uncommitted** | ❌ Allowed   | ❌ Allowed            | ❌ Allowed     |
| **Read Committed**   | ✅ Prevented | ❌ Allowed            | ❌ Allowed     |
| **Repeatable Read**  | ✅ Prevented | ✅ Prevented          | ❌ Allowed     |
| **Serializable**     | ✅ Prevented | ✅ Prevented          | ✅ Prevented   |

## Use cases

| Use Case                                | Recommended Isolation                           |
| --------------------------------------- | ----------------------------------------------- |
| **User profile read/update**            | Repeatable Read                                 |
| **Order placement / inventory booking** | Serializable or careful locking                 |
| **Analytics dashboards**                | Read Committed                                  |
| **Log ingestion / telemetry**           | Read Uncommitted (if write latency is critical) |

## 💡 How RDBMS Enforce Isolation
- Depending on the DB engine:
    - MVCC (Multi-Version Concurrency Control) — PostgreSQL, InnoDB (MySQL)
        - Readers don’t block writers
        - Writers don't block readers (mostly)
        - Each transaction sees a snapshot of the data
    - Locking-based isolation — Oracle, SQL Server
        - Explicit locks to block other transactions

## How to Set Isolation Level (Examples)
### 🧵 MySQL:
```sql
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION;
-- your queries here
COMMIT;
```

### 🧵 PostgreSQL:
```sql
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- your queries
COMMIT;
```

### 🔥 Tips for System Design
- Avoid using Serializable for everything → can slow system down (locking, contention).
- In DynamoDB, you don’t set isolation levels — it provides eventual or strongly consistent reads, and transactional writes via APIs.
- Use Optimistic Locking (e.g., version numbers) in REST APIs (e.g., update profile if version hasn't changed).
- Cache invalidation must respect isolation → don't cache data mid-transaction.

## 🧠 Final Summary

| Concept                   | Description                                   |
| ------------------------- | --------------------------------------------- |
| **Isolation**             | Ensures transactions don't interfere          |
| **Types**                 | RU < RC < RR < Serializable                   |
| **Common Bugs Prevented** | Dirty reads, lost updates, phantom reads      |
| **Performance vs Safety** | Higher isolation = safer, but slower          |
| **In MVCC systems**       | Snapshots used for isolation instead of locks |
