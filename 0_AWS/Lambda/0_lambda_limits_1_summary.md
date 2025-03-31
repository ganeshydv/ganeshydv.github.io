# 🔹 AWS Lambda: Synchronous vs. Asynchronous Invocation

## 🔹 1. Synchronous Invocation (Max Payload: 6MB)

**Triggered by:** API Gateway, ALB, AWS SDK, etc.  
**Behavior:** The client waits for a response before proceeding.  

### ✅ Use Cases:
- Real-time requests (e.g., REST APIs, user interactions).  

### ✅ Advantages:
✔️ Larger payload (up to **6MB**).  
✔️ Immediate response.  

### ❌ Disadvantages:
❌ **API Gateway has a 30-second timeout**.  
❌ More prone to client-side delays.  

---

## 🔹 2. Asynchronous Invocation (Max Payload: 256KB)

**Triggered by:** S3, SNS, EventBridge, SQS, Step Functions, etc.  
**Behavior:** The client doesn’t wait for a response (fire-and-forget).  

### ✅ Advantages:
✔️ No client-side timeout issues.  
✔️ Automatic **retries on failure** (up to **2 retries**).  
✔️ Works well for **event-driven processing**.  

### ❌ Disadvantages:
❌ **Smaller payload limit** (**256KB**).  
❌ No immediate response (**must check logs or use a status queue**).  

---

## 🔹 Difference in Payload Size for Synchronous vs. Asynchronous Invocations

| **Invocation Type**       | **Max Payload Size** |
|--------------------------|----------------------|
| **Synchronous Invocation** | **6MB** |
| **Asynchronous Invocation** | **256KB** |

---

## 🔹 How to Handle Large Payloads in Async Invocations?

If your event payload **exceeds 256KB**, use:

✅ **S3** → Store large data, pass the **object key** instead.  
✅ **DynamoDB / RDS** → Store request data and process via Lambda.  
✅ **SQS Large Message Handling** → Store large messages **via S3** and pass a reference.  

---

# 🔹 Summary of Payload Limits Based on Invocation Type

| **Event Source**                  | **Invocation Type** | **Max Payload Size** |
|------------------------------------|---------------------|----------------------|
| **API Gateway (REST & HTTP APIs)** | Synchronous        | **6MB**              |
| **Application Load Balancer (ALB)** | Synchronous        | **6MB**              |
| **AWS SDK (`invoke` method)**      | Synchronous        | **6MB**              |
| **AWS SDK (`invokeAsync` method)** | Asynchronous       | **256KB**            |
| **S3 Event Notification**          | Asynchronous       | **256KB**            |
| **SNS Event Notification**         | Asynchronous       | **256KB**            |
| **SQS Message**                    | Asynchronous       | **256KB**            |
| **EventBridge Event**              | Asynchronous       | **256KB**            |

🚀 **Key Takeaways:**
- **Synchronous Invocations** (e.g., API Gateway, ALB, AWS SDK `invoke`) support **up to 6MB** payload.  
- **Asynchronous Invocations** (e.g., S3, SNS, SQS, EventBridge, AWS SDK `invokeAsync`) have a **256KB** payload limit.  

📌 **Need to handle large payloads in async Lambda?**  
- Store large data in **S3/DynamoDB** and pass a reference instead!  
