# Accessing AWS RDS using AWS SDK v2 and v3

## Overview
Amazon Relational Database Service (RDS) is a managed relational database service supporting multiple database engines such as MySQL, PostgreSQL, and MariaDB.

AWS provides SDKs to interact with RDS, with notable differences between **aws-sdk v2** and **aws-sdk v3**.

---

## 1. Installing Dependencies

### AWS SDK v2
```sh
npm install aws-sdk mysql2 pg
```

### AWS SDK v3
```sh
npm install @aws-sdk/client-rds mysql2 pg
```

---

## 2. Importing Required Modules

### AWS SDK v2
```javascript
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const rds = new AWS.RDS();
```

### AWS SDK v3
```javascript
const { RDSClient, CreateDBInstanceCommand, DeleteDBInstanceCommand, DescribeDBInstancesCommand } = require("@aws-sdk/client-rds");

const client = new RDSClient({ region: "us-east-1" });
```

---

## 3. Creating an RDS Instance

### AWS SDK v2
```javascript
const params = {
  DBInstanceIdentifier: "mydbinstance",
  AllocatedStorage: 20,
  DBInstanceClass: "db.t3.micro",
  Engine: "mysql",
  MasterUsername: "admin",
  MasterUserPassword: "mypassword",
  PubliclyAccessible: true,
};

rds.createDBInstance(params, (err, data) => {
  if (err) console.error("Error", err);
  else console.log("RDS Instance Created", data);
});
```

### AWS SDK v3
```javascript
const params = {
  DBInstanceIdentifier: "mydbinstance",
  AllocatedStorage: 20,
  DBInstanceClass: "db.t3.micro",
  Engine: "mysql",
  MasterUsername: "admin",
  MasterUserPassword: "mypassword",
  PubliclyAccessible: true,
};

const command = new CreateDBInstanceCommand(params);
client.send(command)
  .then(data => console.log("RDS Instance Created", data))
  .catch(error => console.error("Error", error));
```

---

## 4. Describing an RDS Instance

### AWS SDK v2
```javascript
const params = { DBInstanceIdentifier: "mydbinstance" };

rds.describeDBInstances(params, (err, data) => {
  if (err) console.error("Error", err);
  else console.log("Instance Info", data);
});
```

### AWS SDK v3
```javascript
const params = { DBInstanceIdentifier: "mydbinstance" };

const command = new DescribeDBInstancesCommand(params);
client.send(command)
  .then(data => console.log("Instance Info", data))
  .catch(error => console.error("Error", error));
```

---

## 5. Deleting an RDS Instance

### AWS SDK v2
```javascript
const params = {
  DBInstanceIdentifier: "mydbinstance",
  SkipFinalSnapshot: true
};

rds.deleteDBInstance(params, (err, data) => {
  if (err) console.error("Error", err);
  else console.log("Instance Deleted", data);
});
```

### AWS SDK v3
```javascript
const params = {
  DBInstanceIdentifier: "mydbinstance",
  SkipFinalSnapshot: true
};

const command = new DeleteDBInstanceCommand(params);
client.send(command)
  .then(data => console.log("Instance Deleted", data))
  .catch(error => console.error("Error", error));
```

---

## 6. Connecting to an RDS Database

### MySQL
```javascript
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: "your-rds-endpoint",
  user: "admin",
  password: "mypassword",
  database: "mydatabase"
});

connection.connect(err => {
  if (err) console.error("Error connecting", err);
  else console.log("Connected to MySQL RDS");
});
```

### PostgreSQL
```javascript
const { Client } = require('pg');

const client = new Client({
  host: "your-rds-endpoint",
  user: "admin",
  password: "mypassword",
  database: "mydatabase"
});

client.connect()
  .then(() => console.log("Connected to PostgreSQL RDS"))
  .catch(err => console.error("Error connecting", err));
```

---

## 7. Differences Between AWS SDK v2 and v3

| Feature                | AWS SDK v2                      | AWS SDK v3                      |
|------------------------|--------------------------------|--------------------------------|
| Installation          | `npm install aws-sdk`          | `npm install @aws-sdk/client-rds` |
| Modular Imports      | No                              | Yes (Reduces bundle size)      |
| Method Calls         | Callback-based API             | Promise-based API (async/await) |
| Performance          | Loads entire SDK               | Loads only required modules    |

---

## 8. Best Practices
- **Use SDK v3** for better performance and modularity.
- **Enable Multi-AZ Deployments** for high availability.
- **Use IAM Authentication** instead of storing credentials in the application.
- **Enable Automated Backups** to prevent data loss.
- **Restrict Public Access** to enhance security.

---

## 9. Conclusion
AWS SDK v3 is more modular, efficient, and uses promises, making it a better choice for new applications. However, SDK v2 is still widely used and supported.

---

