## Sharding and Consistent Hashing Explained

### **1. What is Sharding?**
**Sharding** is a technique used to **split** a large dataset into smaller parts (shards) and distribute them across multiple servers.

#### **Example: Basic Sharding**
Imagine you are running a **video streaming service** and storing video metadata in a database. You have **three database servers**, and you decide to shard the data **based on user ID**.

| User ID | Shard Formula (User ID % 3) | Stored in Server |
|---------|---------------------------|----------------|
| 101     | 101 % 3 = 2                | Server 2      |
| 102     | 102 % 3 = 0                | Server 0      |
| 103     | 103 % 3 = 1                | Server 1      |
| 104     | 104 % 3 = 2                | Server 2      |

🔹 **Problem with this approach?**  
If you add a new server (Server 3), the formula **(User ID % 3)** becomes invalid, and you must re-distribute the data.

---

### **2. What is Consistent Hashing?**
**Consistent hashing** solves the problem of **rebalancing** when adding or removing servers in a sharded system.

#### **Example: Consistent Hashing**
- Imagine you have **four cache servers** for storing video thumbnails.
- Instead of using `mod` operation, we:
  1. Assign a **hash** to each server (e.g., `hash(Server IP)`).
  2. Place them on a **circular hash ring**.
  3. Use a **hash function** (like MD5) to assign each **video ID** to a point on the ring.
  4. Each video is stored on the **next server in the clockwise direction**.

**Step-by-step illustration:**
1. Assume servers get placed at hash positions:
   - Server A → **10**
   - Server B → **30**
   - Server C → **50**
2. A video with ID **102** hashes to **28**, so it gets stored in **Server B**.
3. A video with ID **205** hashes to **48**, so it gets stored in **Server C**.

🔹 **Benefit?**
- If a **server fails or is added**, **only a small portion of data is affected**, rather than redistributing everything.

---

### **3. How Are They Related?**
- **Sharding** is the act of **dividing data** across multiple servers.
- **Consistent hashing** is a **smart way** to assign data to shards dynamically.
- **Without consistent hashing**, adding/removing shards requires **reshuffling all data**.
- **With consistent hashing**, only **a small portion** of data moves when adding/removing servers.

---

### **4. Consistent Hashing in Simple Terms**
It’s a **smart way to assign inputs (data, requests, cache keys, etc.)** to different **databases, caches, load balancers, or servers** in a distributed system.

#### **How It Works?**
1. Imagine a **circular ring** (like a clock).
2. Each **server (DB, cache, etc.)** is placed on this ring at a specific point.
3. When **a new request/data comes**, we:
   - Compute a **hash** of the input (e.g., user ID, video ID, cache key).
   - Find the **nearest** server **clockwise** on the ring.
   - Store/process the data there.

#### **Why Use It?**
- ✅ **Handles scaling easily** – If we add/remove servers, only a small portion of data moves.
- ✅ **Avoids reassigning all data** – Unlike `mod(n)`, where adding a new server shifts everything.
- ✅ **Common in caching & databases** – Used in Redis, Cassandra, DynamoDB, etc.

---

### **5. Real-World Use Cases**
✅ **Database Sharding** → MySQL, PostgreSQL use **consistent hashing** to distribute data across multiple databases.  
✅ **Distributed Caching** → Redis, Memcached use **consistent hashing** to store cache efficiently.  
✅ **Load Balancing** → Nginx, HAProxy use **consistent hashing** to route requests to the correct server.  

---

### **6. Code Example: Consistent Hashing in JavaScript**
Here’s a simple JavaScript implementation of **consistent hashing**:

```javascript
class ConsistentHashing {
  constructor() {
    this.ring = new Map();
    this.sortedKeys = [];
  }

  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) % 100;
    }
    return hash;
  }

  addServer(server) {
    const hash = this.hash(server);
    this.ring.set(hash, server);
    this.sortedKeys.push(hash);
    this.sortedKeys.sort((a, b) => a - b);
  }

  getServer(key) {
    const hash = this.hash(key);
    for (let h of this.sortedKeys) {
      if (hash <= h) return this.ring.get(h);
    }
    return this.ring.get(this.sortedKeys[0]); // Wrap around
  }
}

const ch = new ConsistentHashing();
ch.addServer("ServerA");
ch.addServer("ServerB");
ch.addServer("ServerC");

console.log("Key 102 maps to:", ch.getServer("102"));
console.log("Key 205 maps to:", ch.getServer("205"));
```

This implementation:
- Uses a **simple hash function**.
- Stores servers in a **sorted ring**.
- Finds the nearest server **clockwise** on the ring.

Would you like further improvements or optimizations? 🚀

