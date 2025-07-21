---
layout: post
title: "How Partion key, composite key, sort key, GSI and LSI is used"
date: 2025-07-21
categories: [databases, dynamodb]
tags: [database]
author: "GGurkhude"
excerpt: "Learning notes on how partion key, composite key, sort key, gsi and lsi is used"
original_path: "4_DataBase_RDS_DynamoDB/DynamoDB/DynamoDB_0.1_keys_.md"
---

## How Partion key, composite key, sort key, GSI and LSI is used
> Partion Key- Primary Key
  - Divides data in partitions 
> Sort Key - Secondary Key:
- if after dividing data in partionsm, data is sorted based on sort key in those partitions
> Composite Key: PK +SK
- **This is also A Primary key**
- Why? makes query fast only used if sort key is also present
> GSI:
- GSI = new PK + new SK
- max can be 20 per table
- This creates new copy of data not modifies original so there will be eventual consistency
- This is Like VIEWS in SQL DBs
- GSI used for read cases why because it creates new copy based on new Partiton (Primarty) key and sort(secondary) key

> LSI:
- Can only create when table is created
- Risky : why? it adds more data to Origingal Table - Local secondary indexes add an item collection size limit
- If you add a local secondary index, there is a 10GB limit to any given item collection (all partitons).
# GSI vs LSI

- With a local secondary index, you have the same options as with a base table. By default, all reads from a local secondary index are eventually consistent. 
- However, you may opt into a strongly consistent read if you need it. With a global secondary index, you don't have this option. All reads from a global secondary index are eventually consistent.
