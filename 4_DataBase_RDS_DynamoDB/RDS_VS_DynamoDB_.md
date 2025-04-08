## DynamoDB vs. RDS (MySQL Default) Comparison

| Feature             | DynamoDB                              | RDS (MySQL Default)                      |
|--------------------|-------------------------------------|-----------------------------------------|
| **Max Table Size** | No limit (scales automatically)   | 20 GiB (default), expandable up to 64 TiB |
| **Row/Item Size**  | 400KB per item (including metadata & attributes) | 64MB per row (InnoDB) |
| **Column Limit**   | No fixed limit (attribute-based)  | 4096 columns (MySQL InnoDB) |
| **Scaling**        | Fully managed, auto-scales        | Manual scaling (vertical scaling required) |
| **Storage Type**   | SSD-based (key-value, NoSQL)      | SSD (Relational DB, SQL-based)         |
| **Data Model**     | Key-Value, Document DB            | Relational (structured tables)         |
| **Throughput**     | Provisioned (Auto/On-demand)      | Limited by instance type               |

#