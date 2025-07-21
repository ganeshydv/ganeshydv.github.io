---
layout: post
title: "1️⃣ What If an Item Doesn’t Have a Sort Key?"
date: 2025-07-21
categories: [databases, dynamodb]
tags: [dynamodb]
author: "GGurkhude"
excerpt: "Learning notes on 1️⃣ what if an item doesn’t have a sort key?"
original_path: "4_DataBase_RDS_DynamoDB/DynamoDB/DynamoDB_0.1.2_Questions_.md"
---

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
