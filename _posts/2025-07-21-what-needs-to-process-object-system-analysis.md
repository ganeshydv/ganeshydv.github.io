---
layout: post
title: "What needs to process?  object, system analysis"
date: 2025-07-21
categories: [system-design, batchprocessing]
tags: [aws, dynamodb, database]
author: "GGurkhude"
excerpt: "Learning notes on what needs to process?  object, system analysis"
original_path: "3_SystemDesign/BatchProcessing/0_Analysis_.md"
---

## What needs to process? - object, system analysis
- total objects : ?
- Size of each object: ?
- System Consumption[CPU/RAM] to process different Objects: ?
- If Lambda used then find timeout limit for max objects and for single object it's behaviour

- > QUEUE: 
   - Is used find it's max capacity that system can handle
   1. Size: limit
   1. Time: limit fot that size 
   1. Retry Mechanism
   1. Error Handling for particular cases
   1. TimeOut: for how long lamda function should run- max 15 min - 900s
   1. Batch Size? : no of itams to process at one time from queue
   1. Reserved concurrency?: how many labda should run in parallel
   1. Visibility TimeOut: for how long msg should disappear: should be maxmium than total time lambda takes to process iteam 
   1. maximum Batching window: Wait time before invoking lamda
       1. BatchSize: size of queue
       2. maximumBatchingWindow: time to wait for total items of batchSize to be in SQS
- > RDS [SQL]:
    1. Connection limits
    2. Effect on shards if sharding is done
    3. Table Size :
    4. Query time 
    5. Row Size to find max response size and find time for response
- > DynamoDB: 
    1. Size: limit 
    2. Connection: Limit 
- > Lambda:
    1. reservedConcurrency: how many lambdas in parallel
    2. timeout: one lamda will execute for this time max: 15min -900s
    2. Lambda processing limit : size

- > Concurrency: if processing elements in parallel then System may exhaust
    1. DB max connection reached
    2. Server limit - CPU/RAM
    3. Lambda may timeout
    4. SQS - iteams might not be processed

- > Analysis of each Service 
  - How can find limit of RDS/Lambda/SQS?
  - How cost is going to increase?