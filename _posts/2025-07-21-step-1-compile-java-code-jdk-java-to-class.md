---
layout: post
title: "Step 1: Compile java code (JDK)  .java to .class (bytecode)"
date: 2025-07-21
categories: [java, adv-java]
tags: [java, concurrency]
author: "GGurkhude"
excerpt: "Learning notes on step 1: compile java code (jdk)  .java to .class (bytecode)"
original_path: "JAVA/Adv_Java/0.2_How_Java_code_runs_.md"
---


## Step 1: Compile java code (JDK) --> .java to .class (bytecode)
- Java compiler (part of JDK) compiles code
- java c abc.java
## Step 2: Run .class code
- JVM (JIT) coverts .class (bytecode) to bitcode
- java abc.class
- When run cmd: `java file1` - For Each Program New JVM instance get started

> Each JVM --> Stores Byte code in Code Segment --> Validates --> Creates Process --> Starts Main thread to excute ByteCOde line by line

> If you want to compile .java → .class → you need the JDK, because it includes javac.

> If you only want to run a .class file → the JRE or JVM is enough.

## 🔍 Breakdown:

| Component                          | Includes                                   | Purpose                                               |
| ---------------------------------- | ------------------------------------------ | ----------------------------------------------------- |
| **JDK (Java Development Kit)**     | `javac`, `java`, `javadoc`, `javap`, tools | For **developers**: Write, compile, run Java programs |
| **JRE (Java Runtime Environment)** | `java` - JVM + core libraries (no compiler)         | For **running** already-compiled Java programs        |
| **JVM (Java Virtual Machine)**     | Part of JRE                                | For **executing bytecode** at runtime                 |

## 

| Task                   | Can JRE Do It? | Notes                       |
| ---------------------- | -------------- | --------------------------- |
| Run a `.class` file    | ✅ Yes          | Uses `java ClassName`       |
| Run a `.jar` file      | ✅ Yes          | Uses `java -jar myapp.jar`  |
| Compile a `.java` file | ❌ No           | Needs `javac` → only in JDK |


## 

| Feature             | JRE   | JDK   |
| ------------------- | ----- | ----- |
| Has `java`          | ✅ Yes | ✅ Yes |
| Has `javac`         | ❌ No  | ✅ Yes |
| Can run `.class`    | ✅ Yes | ✅ Yes |
| Can run `.jar`      | ✅ Yes | ✅ Yes |
| Can compile `.java` | ❌ No  | ✅ Yes |
