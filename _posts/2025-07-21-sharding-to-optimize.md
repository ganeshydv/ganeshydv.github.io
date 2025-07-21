---
layout: post
title: "SHARDING : to Optimize"
date: 2025-07-21
categories: [system-design, db]
tags: [aws]
author: "GGurkhude"
excerpt: "Learning notes on sharding : to optimize"
original_path: "3_SystemDesign/DB/1_SHARDING__.md"
---


# SHARDING : to Optimize
  - Dividing DB

# Options : 
  1. Scale UP H/W - increases cost/effectiveness
  2. Add replicas : 
     - make copy of DB - Master --> Read replicas
     - Problems : when master is updated asyc read db is also updated 
       but it's async so it creates time delay which causes problem in consistency.    
     - Write Event : first to master then to Read Replicas but in this process if Read is done before update then it's not consistent
  3. Sharding : 
     - seperate data in different dbs
     - S1, S2, S3 : different DBS so running on Different Machines have different master
      - How Spereate Data ?
        - based on KEY --> HASH Function : to decide from which Shard DB to get data
     - Ex. instead of storing usr data in single db, divide it and store in 2 dbs
       - but how to decide which db stores user data - hash functions or simple another layer which helps in deciding db
     - PROS: 
       1. scale- horizontally
       2. availability : if one db down but another db is on means some usr can still use it
          fault tolerence-
     - CONS:
       1. Costly 
       2. complexity : partition mapping layer to map dbs +  routing layer for interacting with db
       3. non-uniformity : mens one db can be of more size than another - option: reshard but it inctrease complexity
       4. analytical : 


