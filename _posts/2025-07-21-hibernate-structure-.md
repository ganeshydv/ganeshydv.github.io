---
layout: post
title: "Hibernate Structure :"
date: 2025-07-21
categories: [java, 3-0-hibernate-arch--md]
tags: [java, database, concurrency]
author: "GGurkhude"
excerpt: "Learning notes on hibernate structure :"
original_path: "JAVA/3.0_Hibernate_Arch_.md"
---

!["Hibernate_str"](3.0_Hibernate_str.png)
## Hibernate Structure :
```
                     Java
                      ↕
    |           Persistent Object                |
                      ↕
    |               HIBERNATE                    |
    |   1. Config -> 2. Register.Class -->       |      
    |   3. SessionFactory --> 4. Session -->     |
    |   5. Transaction --> 6. Query -->          |
    |   7. Transaction close --> 8.Session Close | 
                     ↕
                 [DataBase]
```
### SessionFactory : `Thread Safe` & Initialize only once 
- start up and kept for later use.
### Session : `NOT Thread Safe` & Open-Close for each Transaction

### Transaction Object :
- Transactions in Hibernate are handled by an underlying transaction manager and transaction (from JDBC or JTA).

### Query Object :
- Query objects use SQL or Hibernate Query Language (HQL) string to retrieve data from the database and create objects.
- A Query instance is used to bind query parameters, limit the number of results returned by the query, and finally to execute the query.
### Persistent Classes :
- `Java classes whose objects or instances will be stored in database tables are called persistent classes in Hibernate`. 
- Hibernate works best if these classes follow some simple rules, also known as the Plain Old Java Object `(POJO)` programming model.
- Conditions :
   1. All Java classes that will be persisted need a default constructor.

