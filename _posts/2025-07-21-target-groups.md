---
layout: post
title: "Target Groups:"
date: 2025-07-21
categories: [aws, tagretgroup-alb-ecs]
tags: [networking]
author: "GGurkhude"
excerpt: "Learning notes on target groups:"
original_path: "0_AWS/TagretGroup+ALB+ECS/AWS_Target_Group_Health_check_Rolback.md"
---


# Target Groups: 
## 1. ALB uses for Load Balancing
## 2. For helath checks :

## 🔁 How ALB Health Checks Work (ECS Context)

When you attach an **Application Load Balancer (ALB)** to an **ECS service** (via a **target group**), the health check configuration controls how ALB determines whether your tasks (containers) are healthy and should receive traffic.

---

### 🔹 Key Parameters

| Parameter            | Meaning                                 | Default          |
|----------------------|------------------------------------------|------------------|
| **Interval**         | How often to run health check            | `30 sec`         |
| **Timeout**          | How long ALB waits for a response        | `5 sec`          |
| **Healthy threshold**   | Number of successful checks before marking healthy | `5`              |
| **Unhealthy threshold** | Number of failed checks before marking unhealthy  | `2`              |
| **Path**             | HTTP path to check (e.g., `/health`)     | `/` (can be customized) |
| **Port**             | Which container port to hit              | e.g., `3000`     |

---

### 📌 Notes:
- The health check runs on the container instances (tasks) that are registered with the target group.
- If a task fails health checks based on the above thresholds, ALB stops routing traffic to it.
- The health check path should ideally return a `200 OK` status for healthy responses (e.g., from a `/health` endpoint).

## 3. `Supporting Blue/Green Deployments `
   - When using CodeDeploy with ECS:
     - One target group is for the current (live) version
     - Another is for the new version being tested
     - Once tests pass, traffic shifts to the new target group (green), and the old becomes inactive (blue).
```scss
                 ┌────────────────────────┐
                 │     Application LB     │
                 └──────────┬─────────────┘
                            │
         ┌──────────────────┴──────────────────┐
         │                                     │
 ┌───────▼────────┐                   ┌────────▼────────┐
 │ Target Group A │                   │ Target Group B  │
 │   (prod)       │                   │   (blue)        │
 └───────┬────────┘                   └────────┬────────┘
         │ ECS tasks (v1)                     │ ECS tasks (v2)
         ▼                                    ▼
      Receives Traffic            Validated, Promoted if healthy
```