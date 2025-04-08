
## 1. Storage Limits
- Maximum Storage per DB Instance:
   - General Purpose (gp2/gp3), Provisioned IOPS (io1/io2): Up to 64 TiB
   - Magnetic storage (deprecated): Up to 4 TiB
- Minimum Storage per DB Instance: 20 GiB
- Storage Auto Scaling: Automatically increases storage if enabled, up to the max limit.

## 2. Compute (Instance Size) Limits
- RDS instances are based on Amazon EC2. The instance types vary in:

    - vCPU: 1 to 128 vCPUs
    - Memory: 1 GB to 24 TB RAM
    - Network Performance: Scales with instance type, from low to 100 Gbps
    - IOPS (Input/Output Operations Per Second):
      - General Purpose (gp3): 3,000 IOPS baseline, can be configured up to 16,000 IOPS
      - Provisioned IOPS (io2/io1): Supports up to 256,000 IOPS

## 3. Row & Table Size Limits
- >Maximum Row Size:

   - MySQL: 65,535 bytes (excluding BLOBs/TEXT fields stored separately)
   - PostgreSQL: 1.6 GB per row
   - SQL Server: 8,060 bytes per row (excludes BLOBs stored separately)
   - A single row in MySQL/PostgreSQL cannot exceed ~65 KB.
       - If your table has many columns (e.g., 4,000 columns), but each row’s total size remains under 65 KB, you’re fine.
       - `Large text fields (e.g., TEXT, BLOB, JSON fields) don't count toward the 65 KB limit directly—they are stored separately, and only a pointer is stored in the row.`
- >Maximum Table Size:
  - Limited by storage size (64 TiB per instance)
  - Innodb (MySQL) limit: 16 TB per table
- >Maximum Columns per Table:

  - MySQL: 4096
  - PostgreSQL: 1600
  - SQL Server: 1024
## 4. Connection Limits in RDS

Each RDS instance has a max connection limit based on instance type.  

## Examples:

| Engine      | Formula for Max Connections            | Example (db.r5.large, 16GB RAM) |
|------------|--------------------------------------|--------------------------------|
| **MySQL**      | `max_connections = (RAM in GB * 125) + 1000` | **3000** |
| **PostgreSQL** | `max_connections = RAM in GB * 50`          | **800**  |
| **SQL Server** | Limited by licensing (Standard: 32,000)    | **32,767** |


#
### Workarounds for Connection Limits:
- **Use RDS Proxy** for connection pooling.
- **Use read replicas** to distribute read load.

## 5. Read/Write Requests (IO & Throughput)
 ### Maximum Read/Write IOPS:

- gp3 storage: 16,000 IOPS
- io2 storage: 256,000 IOPS
 ### Maximum Throughput:

- gp3: Up to 1000 MB/s
- io2: Up to 4000 MB/s
 ### Read/Write Query Limits:

- No hard limit, but performance depends on CPU, memory, and IOPS.
- Use Read Replicas to scale reads.

## 6. Read Replicas & Multi-AZ Limits
### Read Replicas per Primary DB:

- MySQL, MariaDB, PostgreSQL: Up to 15 read replicas
- SQL Server: Not supported (use Always On for HA)
### Multi-AZ Deployment:

- Supports only ONE standby replica (used for failover, not direct reads).
- Write operations are synchronous to standby → adds latency.

## 7. Query Execution Time Limits
- No built-in query timeout, but:
  - MySQL default wait timeout: 28800 sec (8 hours)
  - PostgreSQL statement_timeout: Can be configured.
Use application-side timeouts to avoid long queries.

## 8. Scaling & Failover Limits
### Vertical Scaling (Instance Upgrade):
- Causes downtime (unless using Aurora which supports online scaling).
### Horizontal Scaling (Read Replicas):
- Eventual consistency for reads (may cause lag).
### Failover Time (Multi-AZ):
- 30 to 60 seconds typically.

# RDS Limitations

| **Category**         | **Limitation**                                  |
|----------------------|-----------------------------------------------|
| **Storage**         | 64 TiB max per instance                        |
| **Compute**         | vCPU: 1 to 128, RAM: 1GB to 24TB               |
| **Row Size**        | MySQL: 65KB, PostgreSQL: 1.6GB                 |
| **Table Size**      | Limited by storage                             |
| **Connections**     | MySQL: `RAM * 125 + 1000`, PostgreSQL: `RAM * 50` |
| **Read/Write IOPS** | gp3: 16K IOPS, io2: 256K IOPS                  |
| **Read Replicas**   | MySQL/PostgreSQL: Up to 15                     |
| **Multi-AZ**       | Only one standby, no read scaling              |
| **Query Limits**    | No built-in timeout, but dependent on engine settings |
| **Backup Limits**   | Automated backups: 1-35 days                   |
| **Scaling**        | Vertical scaling needs downtime                |
| **Failover**       | Multi-AZ failover takes 30-60 seconds          |

#

# The RDS types with max_connections limit:

1. t2.micro 66
1. t2.small 150
1. m3.medium 296
1. t2.medium 312
1. m3.large 609
1. t2.large 648
1. m4.large 648
1. m3.xlarge 1237
1. r3.large 1258
1. m4.xlarge 1320
1. m2.xlarge 1412
1. m3.2xlarge 2492
1. r3.xlarge 2540