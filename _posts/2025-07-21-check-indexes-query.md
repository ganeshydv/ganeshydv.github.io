---
layout: post
title: "Check indexes Query:"
date: 2025-07-21
categories: [databases, sql--md]
tags: [database]
author: "GGurkhude"
excerpt: "Learning notes on check indexes query:"
original_path: "4_DataBase_RDS_DynamoDB/SQL_.md"
---

## Check indexes Query:
```sql
SELECT index_name, table_name
FROM information_schema.statistics
WHERE table_schema = 'database_name';
```

## Copy Table Data to NEW Table
```sql
CREATE TABLE table_name as Select * from table_2;
```
## Change Column Data Type
```sql
ALTER TABLE table_name
MODIFY column_name NEW_DATA_TYPE;
```

## Change Column to AutoIncrement
```sql
ALTER TABLE table_name MODIFY COLUMN column_name INT AUTO_INCREMENT;
```

## Query to display the SQL statement that was used to create the Table 
```sql
SHOW CREATE TABLE table_name;
```