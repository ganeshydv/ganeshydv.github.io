---
layout: post
title: "JPA : Java Persistence API"
date: 2025-07-21
categories: [java, 3-1-0-jpa--md]
tags: [java]
author: "GGurkhude"
excerpt: "Learning notes on jpa : java persistence api"
original_path: "JAVA/3.1.0_JPA_.md"
---

## JPA : Java Persistence API

- This is only kind of schemas, Interfaces but no solid implementation so if want to utilize need ORM which will use JPA to create query and then send it to DB.
- ### `API --> [ ORM (EX. Hibernate) <--> JPA (EX. jakarta Persistence) ] --> JDBC --> DB`
- Hibernate : `Hibernate is both a JPA implementation and a standalone ORM framework so no need for extra JPA`

- JPA is just a specification; `you need an implementation (e.g., Hibernate, EclipseLink) to use it effectively.`
- You can bypass JPA entirely and use Hibernate directly if you don't need the standardized interfaces.