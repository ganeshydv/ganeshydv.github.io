---
layout: post
title: "� How Scaling Works in ECS with EC2 (Launch Type)"
date: 2025-07-21
categories: [aws, ecs]
tags: []
author: "GGurkhude"
excerpt: "Learning notes on � how scaling works in ecs with ec2 (launch type)"
original_path: "0_AWS/ECS/0_How_ECS_auto_scales_.md"
---

# 🚀 How Scaling Works in ECS with EC2 (Launch Type)
## 1️⃣ Each ECS Task Runs on an EC2 Instance

- ECS schedules tasks (containers) on EC2 instances based on available CPU/RAM.
- Different tasks can have different CPU usage.
## 2️⃣ Load Balancer (ALB) Diverts Traffic

- ALB does NOT monitor CPU utilization directly.
- ALB only distributes traffic based on request load and health checks.
- If a task is overloaded (CPU > 80%), ALB does NOT "move" traffic by itself. Instead:
   - The task may respond slower due to high CPU usage.
   - ECS autoscaling must be triggered to add more capacity.
## 3️⃣ CloudWatch & ECS Auto Scaling Kick In

- CloudWatch monitors CPU utilization **`it takes data from ECS or EC2`** 
- If CPU > 80% for 2 minutes:
- CloudWatch Alarm triggers ECS Service Auto Scaling.
- ECS scales tasks (adds new containers).
- If new tasks don’t fit on existing instances, then:
   - EC2 Auto Scaling Group (ASG) triggers a new EC2 instance.
   - ECS places new tasks on the new instance.
## 4️⃣ Scaling Down (Reducing Instances or Tasks)

- If CPU < 30% for a certain time:
  - ECS Service Auto Scaling removes extra tasks.
  - If instances are underutilized, EC2 Auto Scaling may terminate instances (but only if tasks can be rescheduled elsewhere).
- Key point:
  - ECS will never scale down if all running tasks are using > 80% CPU.
  - Only when CPU remains low for some time, it removes tasks/instances.