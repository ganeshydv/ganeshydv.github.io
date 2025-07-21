---
layout: post
title: "Launch Docker Container = Launch ECS Tasks on ECS Cluster"
date: 2025-07-21
categories: [aws, ecs]
tags: [aws, docker]
author: "GGurkhude"
excerpt: "Learning notes on launch docker container = launch ecs tasks on ecs cluster"
original_path: "0_AWS/ECS/How_ECS_instance_launched.md"
---


## Launch Docker Container = Launch ECS Tasks on ECS Cluster

## Launch Types of ECS:
- Needs IAM Roles compulsory
- Define these ROLES in TASK Defination
- can Create Custom ROLES

### 1. EC2: launch type

- if u use ECS cluser with EC2 launch type : u need to maintain infrastructure


### 2. Fargate Launch Type: Serverless
- No manage of infrastructure No EC2 instance to manage
- TAsk Defination : managed by AWS itself