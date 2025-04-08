# Accessing AWS S3 using AWS SDK v2 and v3

## Overview
Amazon Simple Storage Service (S3) is an object storage service that offers scalability, security, and performance. AWS provides SDKs to interact with S3, with notable differences between **aws-sdk v2** and **aws-sdk v3**.

---

## 1. Installing Dependencies

### AWS SDK v2
```sh
npm install aws-sdk
```

### AWS SDK v3
```sh
npm install @aws-sdk/client-s3
```

---

## 2. Importing Required Modules

### AWS SDK v2
```javascript
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const s3 = new AWS.S3();
```

### AWS SDK v3
```javascript
const { S3Client, CreateBucketCommand, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const client = new S3Client({ region: "us-east-1" });
```

---

## 3. Creating an S3 Bucket

### AWS SDK v2
```javascript
const params = { Bucket: "my-bucket" };

s3.createBucket(params, (err, data) => {
  if (err) console.error("Error", err);
  else console.log("Bucket Created", data);
});
```

### AWS SDK v3
```javascript
const command = new CreateBucketCommand({ Bucket: "my-bucket" });
client.send(command)
  .then(data => console.log("Bucket Created", data))
  .catch(error => console.error("Error", error));
```

---

## 4. Uploading a File to S3

### AWS SDK v2
```javascript
const params = {
  Bucket: "my-bucket",
  Key: "myfile.txt",
  Body: "Hello, S3!"
};

s3.putObject(params, (err, data) => {
  if (err) console.error("Error", err);
  else console.log("File Uploaded", data);
});
```

### AWS SDK v3
```javascript
const command = new PutObjectCommand({
  Bucket: "my-bucket",
  Key: "myfile.txt",
  Body: "Hello, S3!"
});

client.send(command)
  .then(data => console.log("File Uploaded", data))
  .catch(error => console.error("Error", error));
```

---

## 5. Retrieving a File from S3

### AWS SDK v2
```javascript
const params = { Bucket: "my-bucket", Key: "myfile.txt" };

s3.getObject(params, (err, data) => {
  if (err) console.error("Error", err);
  else console.log("File Retrieved", data.Body.toString());
});
```

### AWS SDK v3
```javascript
const command = new GetObjectCommand({ Bucket: "my-bucket", Key: "myfile.txt" });
client.send(command)
  .then(data => {
    data.Body.transformToString().then(content => console.log("File Retrieved", content));
  })
  .catch(error => console.error("Error", error));
```

---

## 6. Deleting a File from S3

### AWS SDK v2
```javascript
const params = { Bucket: "my-bucket", Key: "myfile.txt" };

s3.deleteObject(params, (err, data) => {
  if (err) console.error("Error", err);
  else console.log("File Deleted", data);
});
```

### AWS SDK v3
```javascript
const command = new DeleteObjectCommand({ Bucket: "my-bucket", Key: "myfile.txt" });
client.send(command)
  .then(data => console.log("File Deleted", data))
  .catch(error => console.error("Error", error));
```

---

## 7. Differences Between AWS SDK v2 and v3

| Feature                | AWS SDK v2                      | AWS SDK v3                      |
|------------------------|--------------------------------|--------------------------------|
| Installation          | `npm install aws-sdk`          | `npm install @aws-sdk/client-s3` |
| Modular Imports      | No                              | Yes (Reduces bundle size)      |
| Method Calls         | Callback-based API             | Promise-based API (async/await) |
| Performance          | Loads entire SDK               | Loads only required modules    |

---

## 8. Best Practices
- **Use SDK v3** for better performance and modularity.
- **Enable Server-Side Encryption** to secure stored objects.
- **Use Lifecycle Policies** to manage storage costs.
- **Implement IAM Policies** to restrict unauthorized access.
- **Enable Versioning** to track object changes.

---

## 9. Conclusion
AWS SDK v3 is more modular, efficient, and uses promises, making it a better choice for new applications. However, SDK v2 is still widely used and supported.

---

