---
layout: post
title: "AWS Lambda Container Reuse"
date: 2025-07-21
categories: [aws, lambda]
tags: [aws, javascript, database, networking]
author: "GGurkhude"
excerpt: "Learning notes on aws lambda container reuse"
original_path: "0_AWS/Lambda/0_how_lamdba_works_.md"
---

# AWS Lambda Container Reuse

- For SAM and Lambda:check sam deployment
## How Lambda Containers Work

### Cold Start
When an AWS Lambda function is invoked for the first time (or after a long period of inactivity), AWS creates a new container to execute the function. This process involves:

- Initializing the runtime environment (e.g., Node.js, Python, etc.).
- Running any initialization code outside the handler function (e.g., setting up database connections, loading libraries, etc.).
- This process adds latency to the first invocation and is called a **cold start**.

### Warm Start
After the function completes execution, the container does not immediately shut down. Instead, AWS keeps it warm (active) for a period of time (typically a few minutes, though the exact duration is not guaranteed).

- If another request arrives while the container is still warm, AWS **reuses the same container** to handle the request.
- This avoids the overhead of reinitializing the runtime and the code, resulting in **faster execution**.
- This is called a **warm start**.

### Timeout and Shutdown
If no requests arrive for a while, AWS may terminate the container to free up resources. The next invocation will then trigger a **cold start**.

## Handler Code Execution
- The code inside the **handler function** runs for every invocation of the Lambda function.
- Any code outside the handler function is executed only once when the container is initialized (during cold start).

## Reusing Resources
To optimize performance, resources like database connections, HTTP clients, or in-memory caches can be initialized **outside the handler** and reused across multiple invocations within the same container.

## Benefits of Container Reuse
### 1. Improved Performance
- Avoids the overhead of reinitializing resources (e.g., database connections) for every invocation.
- **Warm starts** are significantly faster than cold starts.

### 2. Cost Efficiency
- Reduces the time spent on initialization, which can **lower execution costs**.

### 3. Resource Sharing
- Allows **sharing of resources** (e.g., database connections, caches) across multiple invocations within the same container, improving efficiency and responsiveness.

