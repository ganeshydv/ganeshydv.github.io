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

