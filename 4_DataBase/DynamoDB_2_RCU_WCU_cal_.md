

# DynamoDB RCU & WCU Calculation

### Example
- **Get** : Query- eventual :Q1: size: 1kb x 32 = 32kb : 1 req. 
- **Archive**: Update-standard: Q2: 1kb x 32 =32 kb (max) : 1 req. 
- **Delete**: BatchWrite-Standard: Q3: 0.5kb x 25 =12.5kb (max) -  1 req.
- **PUT**: BatchWrite-Standard: Q4:  1kb x 25 = 25 kb (max)  - 1 req. 

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

#
