---
layout: post
title: "ECS Cluster Architecture (EC2 Launch Type)"
date: 2025-07-21
categories: [aws, ecs]
tags: []
author: "GGurkhude"
excerpt: "Learning notes on ecs cluster architecture (ec2 launch type)"
original_path: "0_AWS/ECS/1_Scaling_Scenerio.md"
---

# ECS Cluster Architecture (EC2 Launch Type)

## 1️⃣ ECS Cluster with Multiple EC2 Instances  
ECS Cluster is a **parent** that manages EC2 instances.  
Each **EC2 instance** can run **multiple tasks**, depending on available resources.

```
ECS Cluster
│
├── EC2 Instance 1
│ ├── Task A 🟢 (Running)
│ ├── Task B 🟢 (Running)
│ └── Task C 🟢 (Running)
│
├── EC2 Instance 2
│ ├── Task D 🟢 (Running)
│ ├── Task E 🟢 (Running)
│ └── Task F 🟢 (Running)
│
└── EC2 Instance 3
├── Task G 🟢 (Running)
└── Task H 🟢 (Running)
```

---

## 2️⃣ Task Scheduling - How ECS Places Tasks on EC2 Instances  
- **Step 1:** ECS checks if an instance has enough **CPU & RAM**.  
- **Step 2:** If an instance has space, the task is placed there.  
- **Step 3:** If no instance has space, **ECS Auto Scaling triggers a new EC2 instance**.  
```
ECS Cluster
│
├── EC2 Instance 1 (80% CPU)
│ ├── Task A 🟢
│ ├── Task B 🟢
│ ├── Task C 🟢
│ └── Task X ❌ (FAILED: No CPU left)
│
├── EC2 Instance 2 (75% CPU)
│ ├── Task D 🟢
│ ├── Task E 🟢
│ ├── Task F 🟢
│ └── Task Y ❌ (FAILED: No CPU left)
│
└── Auto Scaling Triggers New Instance! 🚀
├── EC2 Instance 4 (New)
│ ├── Task X 🟢 (Now Running)
│ ├── Task Y 🟢 (Now Running)
│ └── More tasks can be added...

```

---

## 3️⃣ Load Balancer & Traffic Routing  
- ALB (Application Load Balancer) **distributes traffic across all running tasks**.  
- It **does NOT check CPU usage**, only spreads the request load.  
- If tasks are overloaded, **CloudWatch triggers auto scaling**.  
```
User Requests 🌎
│
├── Load Balancer (ALB)
│ ├── Routes request to Task A (Instance 1)
│ ├── Routes request to Task D (Instance 2)
│ ├── Routes request to Task G (Instance 3)
│ ├── If one instance is too slow, another task handles the request
│ └── New tasks auto-register with ALB
```

---

## 4️⃣ Auto Scaling - Adding & Removing EC2 Instances  
### **🔼 Scaling Up (More Traffic, CPU > 80%)**  
- **CloudWatch detects high CPU** usage on all tasks.  
- **EC2 Auto Scaling Group adds new instances**.  
- **New ECS tasks start** on new instances.  

### 🚀 High Traffic! Scaling Up...
```
ECS Cluster
│
├── EC2 Instance 1 (90% CPU)
├── EC2 Instance 2 (95% CPU)
├── EC2 Instance 3 (88% CPU)
└── EC2 Instance 4 (NEW) 🆕 → Starts handling new tasks!
```

### **🔽 Scaling Down (Low Traffic, CPU < 30%)**  
- ECS **removes extra tasks** first.  
- If an EC2 instance is **empty**, **EC2 Auto Scaling removes it**.  
### 🛑 Low Traffic! Scaling Down...
```
ECS Cluster
│
├── EC2 Instance 1 (20% CPU)
├── EC2 Instance 2 (25% CPU)
└── EC2 Instance 3 (Empty) ❌ → Terminated to save cost
```

---

### **🔑 Key Takeaways**
✔ **ECS Cluster manages multiple EC2 instances.**  
✔ **Each EC2 instance can run multiple tasks, depending on CPU/RAM.**  
✔ **ECS schedules tasks on instances with enough resources.**  
✔ **If no space, ECS Auto Scaling triggers a new EC2 instance.**  
✔ **ALB distributes traffic, but CloudWatch handles auto scaling.**  
✔ **When traffic drops, ECS & EC2 scale down to optimize cost.**  

---
