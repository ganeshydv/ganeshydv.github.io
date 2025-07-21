---
layout: post
title: "� Quick Comparison: CP vs AP"
date: 2025-07-21
categories: [system-design, db]
tags: [dynamodb, javascript, database]
author: "GGurkhude"
excerpt: "Learning notes on � quick comparison: cp vs ap"
original_path: "3_SystemDesign/DB/CAP_CP_VS_AP.md"
---

## 🔁 Quick Comparison: CP vs AP
| Feature             | CP System                    | AP System                    |
| ------------------- | ---------------------------- | ---------------------------- |
| Write Location      | Single leader                | Any node                     |
| Network Partition   | Blocks writes or reads       | Allows ops, may return stale |
| Conflict Resolution | Not needed (linearizable)    | Needed (merge on sync)       |
| Example             | PostgreSQL, MongoDB (strict) | Cassandra, DynamoDB, CouchDB |
