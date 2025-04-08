## DynamoDB
### Example
- Get : Query- eventual :Q1: size: 1kb x 32 = 32kb : 1 req. 
- Archive: Update-standard: Q2: 1kb x 32 =32 kb (max) : 1 req. 
- Delete-BatchWrite-Standard: Q3: 0.5kb x 25 =12.5kb (max) -  1 req.
- PUT- BatchWrite-Standard: Q4:  1kb x 25 = 25 kb (max)  - 1 req. 

## 📌 AWS Pricing (as of latest AWS pricing updates)
### DynamoDB has two pricing models:

1. On-Demand Mode (Pay per request)
2. Provisioned Mode (Pay per reserved RCU/WCU)
- Since you're handling large-scale queries, I'll calculate based on On-Demand 
# Pricing:
📌 AWS Pricing (as of latest AWS pricing updates)
## DynamoDB has two pricing models:

1. On-Demand Mode (Pay per request)
1. Provisioned Mode (Pay per reserved RCU/WCU)
Since you're handling large-scale queries, I'll calculate based on On-Demand Pricing:
## DynamoDB Pricing: Capacity Units (on 03/2025)

| Capacity Type                | Price per Unit             |
|------------------------------|----------------------------|
| **RCU (Read Capacity Unit)**  | $0.00013 per RCU          |
| **WCU (Write Capacity Unit)** | $0.00065 per WCU          |


# DynamoDB RCU & WCU Calculation

## 1. Get (Query - Eventual) → Q1  
📌 **QueryCommand with Eventual Consistency**  

- **Size per item:** 1 KB  
- **Number of items:** 32  
- **Total size:** 1 KB × 32 = 32 KB  

- ## RCU Calculation
  - **Eventual Consistency RCU Formula:**  
    - **Formula:**
       - RCU = Σ ⌈ Total Size / 4KB ⌉ × 0.5
  - **Example Calculation:**
     - RCU = Σ ⌈ 32 / 4 ⌉ × 0.5 = ⌈ 8 ⌉ × 0.5 = 4 RCU
  - ✅ **RCU Used = 4**  

---

## 2. Archive (Update - Standard) → Q2  
📌 **UpdateCommand with Standard Write**  

- **Size per item:** 1 KB  
- **Number of items:** 32  
- **Total size:** 1 KB × 32 = 32 KB  

- ## WCU Calculation
   - **Standard Write WCU Formula:**  
      - **Formula:**  
         - WCU = Σ ⌈ Total Size / 1KB ⌉ × 1  
   
   - **Example Calculation:**  
      - WCU = Σ ⌈ 32 / 1 ⌉ × 1 = 32 WCU  
   
   - ✅ **WCU Used = 32**  

---

## 3. Delete (BatchWrite - Standard) → Q3  
📌 **BatchWriteCommand with Standard Write**  

- **Size per item:** 0.5 KB  
- **Number of items:** 25  
- **Total size:** 0.5 KB × 25 = 12.5 KB  

- ## WCU Calculation

- **Standard Write WCU Formula:**  
   - **Formula:**  
     - WCU = Σ ⌈ Each Item Size / 1KB ⌉  

   - Each item (0.5 KB) rounds up to **1 WCU**  

- **Example Calculation:**  
   - 25 items × 1 WCU = **25 WCU**  
   - ✅ **WCU Used = 25**  

---

## 4. PUT (BatchWrite - Standard) → Q4  
📌 **BatchWriteCommand with Standard Write**  

- **Size per item:** 1 KB  
- **Number of items:** 25  
- **Total size:** 1 KB × 25 = 25 KB  

- ## Write Capacity Unit (WCU) Calculation
    - **Standard Write WCU Formula:**  
       - WCU = Sum (Ceil(Each Item Size / 1KB))
    - Each item (1 KB) rounds up to **1 WCU**  
       - Calculation for 25 items:  
          - **25 items × 1 WCU = 25 WCU**
   - ✅ **WCU Used = 25**  

#

# Final Summary

| Operation  | Type       | Total Size | Read Type  | Write Type | RCU Used | WCU Used |
|------------|------------|------------|------------|------------|------------|------------|
| **Q1 - Get**  | Query       | 32 KB      | Eventual   | -          | 4 RCU      | -          |
| **Q2 - Update** | Update     | 32 KB      | -          | Standard   | -          | 32 WCU     |
| **Q3 - Delete** | BatchWrite | 12.5 KB    | -          | Standard   | -          | 25 WCU     |
| **Q4 - PUT**    | BatchWrite | 25 KB      | -          | Standard   | -          | 25 WCU     |

#

## Scaling to 1000 Queries Per Operation

| Operation            | Single Req. RCU/WCU | 1000 Requests RCU/WCU |
|----------------------|--------------------|-----------------------|
| **Q1 - Get (Query)**  | 4 RCU              | 4000 RCU             |
| **Q2 - Update**       | 32 WCU             | 32,000 WCU           |
| **Q3 - Delete (BatchWrite)** | 25 WCU     | 25,000 WCU           |
| **Q4 - PUT (BatchWrite)**    | 25 WCU     | 25,000 WCU           |

# WCU 📊 Cost Calculation for 1000 Accounts (1M Students)

| Operation | Total RCU/WCU | Price per Unit | Total Cost |
|-----------|--------------|---------------|------------|
| Q1 - Get (Query - Eventual) | 4,000,000 RCU | $0.00013 per RCU | $520 |
| Q2 - Update (Standard Write) | 32,000,000 WCU | $0.00065 per WCU | $20,800 |
| Q3 - Delete (BatchWrite - Standard) | 25,000,000 WCU | $0.00065 per WCU | $16,250 |
| Q4 - PUT (BatchWrite - Standard) | 25,000,000 WCU | $0.00065 per WCU | $16,250 |
| **Total Cost (RCU + WCU)** |  |  | **$53,820** |

---

## 📉 How to Optimize Cost?  
### 🚀 Optimizations to Reduce DynamoDB Costs  

### 1️⃣ 🚀 Reduce Reads (RCU) with `ProjectionExpression`  
If you only fetch necessary attributes, you reduce RCU by **~50-70%**  

✅ **New Cost (after optimization)** → **$150-$250** (instead of $520)  

---

### 2️⃣ 🚀 Reduce Writes (WCU) using **DynamoDB Streams**  
Instead of direct updates (**Q2 - Update**), store changes in **DynamoDB Streams** and batch process them.  
Can reduce **WCU by ~50%**  

✅ **New Cost (after optimization)** → **~$10,400** (instead of $20,800)  

---

### 3️⃣ 🚀 Use **TTL (Time to Live) for Deletes**  
Instead of manually deleting items (**Q3 - Delete**), set **TTL (Time to Live)** on items.  
Deletes become **free** instead of using **25M WCU ($16,250)**  

✅ **New Cost (after optimization)** → **$0** (instead of $16,250)  

---

### 4️⃣ 🚀 Write in Larger Batches  
**BatchWriteItem** can handle **25 items per request**  
If you optimize **batch sizes**, you reduce WCU by **~30%**  

✅ **New Cost (after optimization)** → **$11,375** (instead of $16,250)  

---

## 🔥 New Optimized Cost 🔥  

| Operation | Old Cost | New Optimized Cost |
|-----------|---------|--------------------|
| Q1 - Get (Query) | $520 | $200 |
| Q2 - Update | $20,800 | $10,400 |
| Q3 - Delete | $16,250 | $0 (TTL instead of WriteOps) |
| Q4 - PUT | $16,250 | $11,375 |
| **Total Cost** | **$53,820** | **$21,975 (🔥 60% savings)** |
