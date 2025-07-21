## 💡 Note on SQL Databases
- `Traditional SQL databases (PostgreSQL, MySQL) are not distributed by default, so CAP doesn’t apply directly.`

## CAP


| Letter | Stands For              | Meaning                                                                         |
| ------ | ----------------------- | ------------------------------------------------------------------------------- |
| C      | **Consistency**         | All nodes see the same data at the same time                                    |
| A      | **Availability**        | Every request receives a response (success or failure) — no timeouts            |
| P      | **Partition Tolerance** | The system continues to operate even if there’s a network failure between nodes |


## 📌 You must tolerate network partition in distributed systems (P is a given)
So you choose between:
- C + P: Strong consistency, but maybe temporarily unavailable
- A + P: Always responds, but may serve stale data (eventual consistency)


## 🔁 Real-World Analogy
Imagine 3 friends sharing a Google Sheet from different cities.
Now network between them breaks (Partition happens).
### You can now:

- `❌ Block everyone from editing (for consistency)`
- `✅ Allow everyone to edit independently (but with potential conflicts)`. Needs  to resolve leter (like find last updated and keep that one in Primary Write DB)
- `✅ Accept network is broken, but ensure either consistent or available behavior` - means N1,N2 are not connected anymore so It's they will not be updated as soons as data is updated in Write DB. This will make data stale. 

> You can’t have all 3 perfectly at once.

## 📊 Breakdown of CAP Combinations
| Combo  | Behavior                                                                | Example Systems                          |
| ------ | ----------------------------------------------------------------------- | ---------------------------------------- |
| **CP** | Strong consistency, tolerates partitions, but may become unavailable    | MongoDB (in CP config), HBase, Bigtable  |
| **AP** | High availability, tolerates partitions, but eventual/stale data        | Cassandra, DynamoDB, Couchbase           |
| **CA** | Consistent and Available, but not partition-tolerant (only theoretical) | Not possible in real distributed systems |


----
## 📦 Developer Takeaway
| Scenario                                   | Suggestion                      |
| ------------------------------------------ | ------------------------------- |
| ✅ Banking, orders, payments                | CP (use RDS, PostgreSQL, etc.)  |
| ✅ Analytics, user logs, feeds              | AP (DynamoDB, Cassandra)        |
| ✅ Real-time apps with flexible consistency | Hybrid (Cassandra, Redis, etc.) |
