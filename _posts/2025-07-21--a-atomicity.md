---
layout: post
title: "⚙ A — Atomicity"
date: 2025-07-21
categories: [system-design, db]
tags: [database, transactions]
author: "GGurkhude"
excerpt: "Learning notes on ⚙ a — atomicity"
original_path: "3_SystemDesign/DB/ACID_1_.md"
---

# ⚙ A — Atomicity
### 🔹 What It Means:
“All-or-nothing.” If a transaction has multiple steps (e.g., inserting into multiple tables), and any step fails, the entire operation rolls back.
- DB is the ultimate enforcer of atomicity.
- But actual enforcement is done by DB’s transaction engine.

### 🔐 Internals: How does DB ensure atomicity?
1. Transaction Log / Undo log:
   - DB keeps a log of what changed before committing.
   - If a failure occurs, it rolls back to the state before the transaction.
2. Locks or MVCC (see isolation below):
   - Ensures no other process sees the transaction in an inconsistent half-done state.

# ⚙ C — Consistency
### 🔹 What It Means:
"DB moves from one valid state to another."

- The `rules` and `constraints` defined in schema must always hold true — before and after a transaction.

### ✅ Examples of Consistency:
- Foreign key: A Posts.author_id must match a Users.user_id.
- Unique constraint: No two users with the same email.
- Check constraints: account_balance >= 0.

### 🔐 How DB enforces it?
- Constraint enforcement at the engine level.
- DB validates all constraints before COMMIT.
- If a constraint is violated → ROLLBACK is triggered automatically.
- Even if you try bypassing with raw SQL, DB will reject the operation.

# ⚙ I — Isolation
### 🔹 What It Means:
"Concurrent transactions shouldn't interfere."

### 🔐 Techniques Used:
1. Locking
   - Pessimistic strategy
   - Example: If one transaction is updating row A, another must wait or fail.
   ```sql
   SELECT * FROM posts WHERE id = 1 FOR UPDATE;
   ```
   - Prevents others from reading/updating the same row.

2. MVCC (Multi-Version Concurrency Control) — Used by PostgreSQL, MySQL InnoDB
   - DB keeps multiple versions of data.
   - Readers get a consistent snapshot, even if someone else is writing.

✅ Great for performance (no waiting), but leads to “snapshot isolation” and possible write conflicts on commit.

# ⚙ D — Durability
🔹 What It Means:
"Once a transaction is committed, it will never be lost, even on crash."
### 🔐 How It's Ensured: WAL (Write-Ahead Logging)
Used in PostgreSQL, MySQL (InnoDB), etc.
### 🧱 WAL Process:
1. When you make a change:
    - DB does not write directly to table files.
2. Instead, it writes to a WAL (log file) first.
    - Contains all changes to be made (insert/update/delete).
3. Once WAL is safely written to disk:
    - Only then the COMMIT is acknowledged.
4. Actual changes to tables may happen later (called checkpointing).

### 🔄 On Crash:
- During restart, DB replays WAL logs that were not flushed to data files yet.
- Ensures no committed data is lost.
### 💡 Common Assumption (Your Thought):
“Commit” means:
- ✅ Data is written to table files (disk)
- ✅ Operation is fully done
- ✅ App is told “success” only after all data is written
### ❗Reality in Modern Databases:
✅ "COMMIT" means:
➤ All changes have been written to the WAL (Write-Ahead Log)
➤ NOT necessarily flushed to the table’s data files yet
➤ But the DB can guarantee it can recover the changes — so it sends COMMIT OK to the app
### 🔄 Why? Because of Performance
Flushing entire table pages to disk is:

- 🔻 Slow (can take milliseconds or more)
- 🔄 Not required immediately, since WAL guarantees recovery


So DBs follow this optimized path:

| Step | What Happens                            | Is it durable? | Sent to App? |
| ---- | --------------------------------------- | -------------- | ------------ |
| 1    | Start TX                                | ❌              | No           |
| 2    | Update in memory (buffers)              | ❌              | No           |
| 3    | Write changes to WAL (sequential write) | ✅              | No           |
| 4    | Flush WAL to disk                       | ✅              | ✅ YES        |
| 5    | Send `COMMIT OK` to app                 | ✅              | ✅ YES        |
| 6    | Write actual table files later          | ✅ (deferred)   | Already done |


## Summary
| Property    | Enforced By     | Mechanism                      | Notes                                  |
| ----------- | --------------- | ------------------------------ | -------------------------------------- |
| Atomicity   | DB engine       | Undo logs, transactional scope | ORM helps start it, but DB enforces it |
| Consistency | DB schema/rules | Constraints, FK, validations   | Rejected if rule violated              |
| Isolation   | DB engine       | Locks or MVCC                  | Based on isolation level               |
| Durability  | DB engine       | WAL or journaling              | Survives crashes                       |
