# ✅ ECS + ALB Health Check Behavior: Failure Handling Scenarios

This document explains how **ECS** interacts with **ALB** during **container health check failures** in two main scenarios: during a **new deployment** and when **live tasks fail**.

---

## 🔹 Scenario 1: New Deployment Fails (Blue Tasks Fail Health Checks)

When deploying a **new version** (e.g., blue/green or rolling update):

1. ECS launches **new tasks** based on the **new task definition**.
2. These tasks are registered with the **ALB Target Group**.
3. **ALB performs health checks** on the new tasks.
4. If enough tasks become **healthy**:
   - ECS **shifts traffic** to the new tasks.
5. If the new tasks **fail health checks**:
   - ECS **marks deployment as failed**.
   - **Rolls back** to the **last stable task definition**.
   - ALB continues routing traffic to the **previous (healthy) tasks**.

> ✅ This mechanism ensures **bad deployments do not impact live traffic**.

---

## 🔸 Scenario 2: Live (Green) Tasks Fail

When already running (live) tasks fail:

1. **ALB detects failures** via health checks (e.g., `/health` endpoint returns 500).
2. ALB marks the tasks as **unhealthy** and **stops routing traffic** to them.
3. ECS service controller notices the unhealthy tasks.
4. ECS:
   - **Stops failing tasks**.
   - **Launches new tasks** using the **last known good task definition**.
5. New tasks are registered and **checked by ALB** before receiving traffic.

> ✅ ECS performs **self-healing** using health checks + desired count config.

---

## 💡 Real-World Optimization Tips

### 🛠 For Blue/Green Deployments
- Use **pre-traffic and post-traffic hooks** (in CodeDeploy) for validation tests.
- Tune ECS deployment config:
  - `minimumHealthyPercent`: controls how many old tasks stay during deploy.
  - `maximumPercent`: controls how many extra tasks can run during deploy.

### 📏 Health Check Best Practices
- Tune health check values:
  - `healthy threshold`: `2`
  - `interval`: `10s`
- Implement a `/health` endpoint in your **NestJS** app that checks:
  - DB connectivity
  - Redis/memory store
  - External APIs or queues

### ☁️ System Design Considerations
- Use **Auto Scaling** (target tracking on CPU/memory/requests).
- Deploy ECS tasks across **multiple AZs** for fault tolerance.
- Monitor using **CloudWatch Alarms** tied to ALB Target Health and ECS Task Status.

---

