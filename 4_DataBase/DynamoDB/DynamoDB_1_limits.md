
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
