---
layout: post
title: "DynamoDB Upsert (Update or Insert) Guide"
date: 2025-07-21
categories: [aws, dynamodb-upsert-guide-md]
tags: [aws, dynamodb, java, javascript, networking]
author: "GGurkhude"
excerpt: "Learning notes on dynamodb upsert (update or insert) guide"
original_path: "0_AWS_sdk_v2_v3/dynamodb_upsert_guide.md"
---


# DynamoDB Upsert (Update or Insert) Guide

In DynamoDB, **upsert** refers to the ability to **update an item if it exists**, or **insert a new item if it doesn’t**. This is commonly achieved using the `UpdateItem` operation.

---

## ✅ Using `UpdateItem` for Upsert

The `UpdateItem` operation allows you to **insert if not exists** and **update if it does**, all in one request.

### Syntax (AWS SDK v3 - Node.js)

```ts
UpdateItemCommand({
  TableName: "YourTableName",
  Key: {
    "PrimaryKey": { S: "value" },
  },
  UpdateExpression: "SET #attr1 = :val1, #attr2 = :val2",
  ExpressionAttributeNames: {
    "#attr1": "attribute1",
    "#attr2": "attribute2"
  },
  ExpressionAttributeValues: {
    ":val1": { S: "new value" },
    ":val2": { N: "42" }
  },
  ReturnValues: "ALL_NEW"
})
```

### Parameters

| Parameter | Description |
|----------|-------------|
| `TableName` | The name of your DynamoDB table. |
| `Key` | The primary key that identifies the item. |
| `UpdateExpression` | Specifies attributes to be updated or added. |
| `ExpressionAttributeNames` | Optional: Use to substitute attribute names (e.g. reserved words). |
| `ExpressionAttributeValues` | Values to use in `UpdateExpression`. |
| `ReturnValues` | Controls what is returned: `NONE`, `ALL_OLD`, `UPDATED_OLD`, `ALL_NEW`, `UPDATED_NEW`. |

### Example

```ts
const command = new UpdateItemCommand({
  TableName: "UserSessions",
  Key: { userId: { S: "123" } },
  UpdateExpression: "SET sessionData = :data, lastUpdated = :now",
  ExpressionAttributeValues: {
    ":data": { S: "session-info" },
    ":now": { S: new Date().toISOString() },
  },
  ReturnValues: "ALL_NEW",
});
```

---

## ❌ Insert Only (Fail if Exists)

If you want to **only insert if the item does not exist**, use `PutItem` with a condition:

```ts
const command = new PutItemCommand({
  TableName: "UserSessions",
  Item: {
    userId: { S: "123" },
    sessionData: { S: "new-data" },
    lastUpdated: { S: new Date().toISOString() },
  },
  ConditionExpression: "attribute_not_exists(userId)"
});
```

This throws an error if `userId` already exists.

---

## ⚙️ System Design Tips

- Prefer `UpdateItem` for **idempotent operations** (safe retries).
- Use `SET`, `ADD`, `REMOVE`, and `DELETE` in `UpdateExpression` for fine-grained control.
- If conditional logic is required (e.g., update only if timestamp is newer), use `ConditionExpression` with `UpdateItem`.

---

## ✅ Real-World Example with NestJS

```ts
@Injectable()
export class SessionService {
  constructor(private readonly db: DynamoDBClient) {}

  async upsertSession(userId: string, data: string) {
    const command = new UpdateItemCommand({
      TableName: "UserSessions",
      Key: {
        userId: { S: userId },
      },
      UpdateExpression: "SET sessionData = :data, lastUpdated = :now",
      ExpressionAttributeValues: {
        ":data": { S: data },
        ":now": { S: new Date().toISOString() },
      },
    });

    return this.db.send(command);
  }
}
```

---

## 📘 References

- [AWS Docs - UpdateItem](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html)
- [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/)

