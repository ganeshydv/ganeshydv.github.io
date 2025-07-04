## 💡 Key Concepts That Make AP Possible:
### 🔁 1. Eventual Consistency
- After partition heals, all nodes converge to the same state
- Merging may use:
  - Timestamps (Last Write Wins)
  - CRDTs (Conflict-free Replicated Data Types)
  - Custom merge logic

### 🛑 2. No Single Leader
- In CP systems, there's usually a single write leader
- In AP systems, all nodes are equal and can accept writes

### 🗃️ 3. Quorum Not Needed
- Writes don't wait for a majority
- This allows better availability, especially in geo-distributed systems
 
## 🚦 Tradeoffs in AP 
| Pros                                 | Cons                                 |
| ------------------------------------ | ------------------------------------ |
| ✅ Highly available                   | ❌ Stale or conflicting data possible |
| ✅ Good for offline/disconnected apps | ❌ Harder to reason about correctness |
| ✅ Scales easily across regions       | ❌ Requires careful conflict handling |

 
## ✅ Example: PostgreSQL with read replicas
- One primary node handles all writes
- All replicas replicate asynchronously or synchronously
- If primary goes down:
   - Promotion (manual or auto) happens
   - Guarantees consistency (at some cost to availability)
## ✅ Real Example 1: DynamoDB (AP)
- If network is slow or partitioned, DynamoDB still responds
- May return slightly stale data
- Uses eventual consistency by default, but offers strong consistency if explicitly asked (ReadConsistency.STRONG)
- Why AP?
  - Highly available for global scale
  - Trades off strict consistency to avoid downtime
  
## 📦 Real Databases That Use AP  

| DB            | Characteristics                                                                 |
| ------------- | ------------------------------------------------------------------------------- |
| **DynamoDB**  | Eventually consistent by default, supports strongly consistent reads optionally |
| **Cassandra** | Peer-to-peer, tunable consistency using `QUORUM`, `ONE`, `ALL`, etc.            |
| **Riak**      | AP-focused, uses **vector clocks** for conflict resolution                      |
| **CouchDB**   | AP by design, works offline-first (good for mobile apps)                        |
