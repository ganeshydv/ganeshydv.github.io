---
layout: post
title: "Hibernate with JPA"
date: 2025-07-21
categories: [java, 3-1-1-hibernate-jpa--md]
tags: [java, database]
author: "GGurkhude"
excerpt: "Learning notes on hibernate with jpa"
original_path: "JAVA/3.1.1_Hibernate_JPA_.md"
---

## Hibernate with JPA

- `When using JPA, you do not need hibernate.cfg.xml. Instead, you configure everything through the persistence.xml file.`

## 1. Dependency
### which version to choose?
### `jakarta.persistence` vs `javax.persistence`
- Modern frameworks like Spring Boot 3 require jakarta.persistence.
- Older Spring Boot versions (e.g., 2.x) use javax.persistence.
- ### Namespace Change:

    - Starting with Jakarta EE 9, all Java EE APIs transitioned to the jakarta namespace to distinguish them from the older javax namespace.
    - For Hibernate, this means that if you're using a modern version (e.g., Hibernate 6.x), it typically aligns with Jakarta EE and uses jakarta.persistence.
- ### Compatibility:

    - If your project uses newer frameworks or libraries (e.g., Spring 6 or Hibernate 6), they are designed to work with jakarta.persistence.
    - Older projects using javax.persistence are compatible with Hibernate versions prior to 6.x.
- ### Dependency for `jakarta.persistence` for Hibernate vesrions >= 6 :
   - jakarta Persistence API: :
    ```xml
     <dependency>
        <groupId>jakarta.persistence</groupId>
        <artifactId>jakarta.persistence-api</artifactId>
        <version>3.1.0</version>
     </dependency>
    ```
    - For Hibernate 6 :
    ```xml
    <dependency>
      <groupId>org.hibernate.orm</groupId>
      <artifactId>hibernate-core</artifactId>
      <version>6.2.15.Final</version>
    </dependency>
    ```
- ### `Java EE (Legacy) Dependencies` :
   - javax persistence API :
    ```xml
    <dependency>
    <groupId>javax.persistence</groupId>
    <artifactId>javax.persistence-api</artifactId>
    <version>2.2</version>
    </dependency>
    ```
    - For Hibernate versions < 6:
     ```xml
    <dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-core</artifactId>
    <version>5.6.15.Final</version>
    </dependency>
    ```
- ### My SQL Connector : alway required - choose version based on ORM
    ```xml
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.32</version>
    </dependency>
    ```
## 2. Config : Switching from hibernate.cfg.xml to persistence.xml

## 3. Entity Registration
## 4. DB operations using ORM
