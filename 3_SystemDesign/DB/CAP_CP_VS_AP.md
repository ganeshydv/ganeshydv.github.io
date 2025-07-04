## 🔁 Quick Comparison: CP vs AP
| Feature             | CP System                    | AP System                    |
| ------------------- | ---------------------------- | ---------------------------- |
| Write Location      | Single leader                | Any node                     |
| Network Partition   | Blocks writes or reads       | Allows ops, may return stale |
| Conflict Resolution | Not needed (linearizable)    | Needed (merge on sync)       |
| Example             | PostgreSQL, MongoDB (strict) | Cassandra, DynamoDB, CouchDB |
