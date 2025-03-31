# 🛠 Best Practices for System Design
## 1. Avoid Hot Partitions:
- Use a high-cardinality partition key (e.g., userId + timestamp).
- Avoid using sequential IDs (e.g., auto-incremented numbers).
## 2. Optimize Read/Write Costs:
- Prefer eventual consistency where possible.
- Use batch operations to reduce request count.
## 3. Minimize Scans:
Design queries to use Query, not Scan.
Use secondary indexes wisely (but not excessively).
## 4. Optimize Large Item Storage:
- Store large objects in S3 and keep a reference in DynamoDB.
## 5. Use Caching:
- Use DAX (DynamoDB Accelerator) or Redis to reduce DynamoDB reads.
## 6. Monitor & Tune Capacity:
- Enable Auto Scaling in provisioned mode.
- Use CloudWatch Alarms to detect high utilization.