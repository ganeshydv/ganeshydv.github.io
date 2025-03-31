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
