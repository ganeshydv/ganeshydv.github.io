---
layout: post
title: "Using a Singleton Approach (Recommended)"
date: 2025-07-21
categories: [aws, lambda]
tags: [aws, javascript, database]
author: "GGurkhude"
excerpt: "Learning notes on using a singleton approach (recommended)"
original_path: "0_AWS/Lambda/1_ex_lambds.md"
---

## Using a Singleton Approach (Recommended)
- A singleton pattern ensures that the database connection is created once and reused across multiple invocations in a warm Lambda container.
```js
const { Sequelize } = require("sequelize");

// Initialize outside the handler to enable connection reuse
const sequelize = new Sequelize("database", "username", "password", {
  host: "your-db-host",
  dialect: "mysql",
  pool: {
    max: 5, // Max number of connections in pool
    min: 0, // Min number of connections
    acquire: 30000, // Max time (ms) to get a connection
    idle: 10000, // Max idle time (ms) before releasing
  },
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
}

exports.handler = async (event) => {
  try {
    await connectDB(); // Ensures connection is available

    // Simulate a DB query
    const result = await sequelize.query("SELECT NOW() as currentTime");
    
    return {
      statusCode: 200,
      body: JSON.stringify({ time: result[0] }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
```

## Using a Class-Based Approach
- A class-based approach allows better encapsulation and modularity, which can be helpful for larger projects.
```js
const { Sequelize } = require("sequelize");

class Database {
  constructor() {
    if (!Database.instance) {
      this.sequelize = new Sequelize("database", "username", "password", {
        host: "your-db-host",
        dialect: "mysql",
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      });

      Database.instance = this;
    }
    return Database.instance;
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log("Database connected");
    } catch (error) {
      console.error("Database connection error:", error);
      throw error;
    }
  }

  async query(sql) {
    return this.sequelize.query(sql);
  }
}

const db = new Database();

exports.handler = async (event) => {
  try {
    await db.connect();
    const result = await db.query("SELECT NOW() as currentTime");

    return {
      statusCode: 200,
      body: JSON.stringify({ time: result[0] }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
```
# Template:
```yml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: SQS triggered Lambda example with SAM

Globals:
  Function:
    Runtime: nodejs18.x

Resources:
  CommonDependenciesLayer:
    Type: AWS::Serverless::LayerVersion
    Properties:
      LayerName: CommonDependencies
      ContentUri: layers/common # Store layers separately
      CompatibleRuntimes:
        - nodejs18.x
      RetentionPolicy: Retain
    Metadata:
      BuildMethod: nodejs18.x

  ProcessAccounts:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: functions/sdk-process-accounts
      Handler: index.handler
      Runtime: nodejs18.x
      Timeout: 15
      Environment:
        Variables:
          DB_PASSWORD: name
          DB_USERNAME: name
          DB_NAME: name
          DB_HOST:name
      Layers:
        - !Ref CommonDependenciesLayer
    Metadata:
      SamResourceId: ProcessAccounts
```