# 1️⃣ How ALB Knows About ECS Tasks?
## Step 1: Target Group Registration
- ALB does not directly communicate with ECS tasks.
- Instead, it sends traffic to a Target Group (TG).
- ECS tasks (containers) register with the Target Group when they start.
- ALB forwards requests to the Target Group, which then routes traffic to healthy tasks.
```
User Request 🌎  
   │  
   ▼  
ALB (Application Load Balancer)  
   │  
   ▼  
Target Group (Holds ECS Tasks)  
   │  
   ├── Task A (Running on EC2 Instance 1)  
   ├── Task B (Running on EC2 Instance 2)  
   ├── Task C (Running on EC2 Instance 3)  
```

## Step 2: ECS Handles Task Registration Automatically
###  When a new ECS task is launched:
- ECS registers the task's IP/Port with the Target Group.
- ALB knows about this new task because the Target Group updates automatically.
- ALB starts sending traffic to the new task.
```
New Task X Started  
   ├── ECS registers Task X (IP: 10.0.1.12, Port: 8080) with Target Group  
   ├── ALB sees the new target in the group  
   └── ALB starts routing traffic to Task X 🚀  
```
## Step 3: Health Checks & Deregistration
- ALB performs health checks on all tasks.
- If a task fails (e.g., crashes, high latency), ALB removes it from the Target Group.
- ECS also deregisters tasks when they stop (e.g., scale down).
```
Task Y Crashes ❌  
   ├── ALB health check fails  
   ├── Task Y removed from Target Group  
   └── ALB stops sending traffic to Task Y  
```

# 2️⃣ Two Ways ALB Routes Traffic to ECS Tasks
## 1. Dynamic Port Mapping (Best for EC2 Launch Type)
- Each ECS task gets a random port on an EC2 instance.
- ALB uses a Target Group in "Instance Mode" to register tasks with their dynamic port.
```
EC2 Instance 1  
   ├── Task A (IP: 10.0.1.10, Port: 32768)  
   ├── Task B (IP: 10.0.1.10, Port: 32769)  
```
- The Target Group maps EC2 instance + port dynamically.
- ALB forwards traffic to the correct instance and port.
## 2. IP Mode (Best for Fargate)
- Each task gets its own private IP.
- ALB uses a Target Group in "IP Mode" and registers task IPs.
```
Task A (IP: 10.0.2.5, Port: 80)  
Task B (IP: 10.0.2.6, Port: 80)  
Task C (IP: 10.0.2.7, Port: 80)  
```
- ALB routes requests directly to task IPs.

# 3️⃣ Summary - How ALB Connects to ECS
- ✔ ALB uses a Target Group to track ECS tasks.
- ✔ ECS automatically registers tasks in the Target Group.
- ✔ ALB sends traffic based on Target Group health checks.
- ✔ Dynamic Port Mapping (EC2) → Routes via instance IP + port.
- ✔ IP Mode (Fargate) → Routes directly to task IP.