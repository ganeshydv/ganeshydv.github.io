# 🔹 DynamoDB Read & Write Operations - Full Comparison Table

| **Operation**         | **Type**         | **Use Case**                          | **PK Required?** | **Size Limit**        | **Pros**                                         | **Cons**                                               | **Capacity Cost (RCU/WCU)**         | **Best Practices** |
|----------------------|-----------------|---------------------------------------|-----------------|----------------------|-------------------------------------------------|-------------------------------------------------|------------------------------------|----------------|
| **GetItem**         | Read (Single)    | Fetch a single item by primary key   | ✅ Yes         | 400KB per item       | ✅ Fast (O(1))                                  | ❌ Requires exact PK                              | 1 RCU (4KB per strongly consistent read) | Use only when PK is known. Avoid for bulk reads. |
| **BatchGetItem**    | Read (Batch)     | Fetch multiple items by primary keys | ✅ Yes         | 100 items or 16MB    | ✅ Reduces network calls                        | ❌ Max 100 items per batch                        | 1 RCU per 4KB of data per item      | Use parallel batch requests for larger datasets. |
| **Query**          | Read (Filtered)  | Fetch items with the same PK         | ✅ Yes         | 1MB per call         | ✅ Efficient for range queries                  | ❌ Requires PK and only one partition per query | 1 RCU per 4KB of data               | Use sort key filtering for better efficiency. |
| **Scan**           | Read (Full Table) | Fetch all items in a table           | ❌ No          | 1MB per call         | ✅ Retrieves everything                         | ❌ Very expensive, ❌ Slow, ❌ Doesn't use indexes | 1 RCU per 4KB of data               | Use ProjectionExpression, Pagination, or GSIs to optimize. |
| **PutItem**        | Write (Single)   | Insert or replace a single item      | ✅ Yes         | 400KB per item       | ✅ Simple and fast                              | ❌ Overwrites existing item (no merge)          | 1 WCU per 1KB of data                | Use only when sure about replacing items. |
| **BatchWriteItem**  | Write (Batch)    | Insert or delete up to 25 items      | ✅ Yes         | 25 items or 16MB     | ✅ Reduces API calls                            | ❌ No support for UpdateItem                     | 1 WCU per 1KB per item               | Use batching to reduce WCU usage. |
| **UpdateItem**      | Write (Update)   | Modify specific attributes of an item | ✅ Yes         | 400KB per item       | ✅ Updates only specific attributes             | ❌ Slower than PutItem                           | 1 WCU per 1KB of updated data        | Use conditional writes to avoid overwrites. |
| **DeleteItem**      | Write (Delete)   | Remove a single item                 | ✅ Yes         | 400KB per item       | ✅ Efficient for single deletes                 | ❌ Cannot delete multiple items in one call     | 1 WCU per item                       | Use BatchWriteItem for bulk deletes. |
| **TransactionWrite** | Write (Atomic)  | Write multiple items atomically      | ✅ Yes         | 25 items or 4MB      | ✅ Ensures atomicity & consistency             | ❌ Slower, ❌ Expensive                         | 2x standard WCU per item             | Use only when strict atomicity is needed. |
| **TransactionGet**  | Read (Atomic)   | Fetch multiple items atomically      | ✅ Yes         | 25 items or 4MB      | ✅ Ensures consistent reads                     | ❌ Slower than BatchGetItem                      | 2x standard RCU per item             | Use only when consistent batch reads are required. |

---

## 🔹 Additional Considerations

### 1️⃣ Read Capacity (RCU) Calculation
- **Eventual Consistency** → `1 RCU = 2 x 4KB reads`
- **Strong Consistency** → `1 RCU = 1 x 4KB read`
- **Transactional Read** → `1 RCU = 2 x Strongly Consistent Read`

### 2️⃣ Write Capacity (WCU) Calculation
- **Standard Write** → `1 WCU = 1KB of data per item`
- **Transactional Write** → `2 WCU per item`

### 3️⃣ Query vs Scan Performance
- **Query** → 🚀 **Fast** (reads only a specific partition).
- **Scan** → 🐢 **Slow & expensive** (reads everything).

---

## 🔹 When to Use Each Operation

| **Use Case**                          | **Best Operation**         |
|---------------------------------------|----------------------------|
| Get a single item by ID              | `GetItem`                  |
| Get multiple items by ID list        | `BatchGetItem`             |
| Fetch all orders by customer ID      | `Query`                    |
| Fetch all records in a table         | `Scan` (if necessary)      |
| Insert/update a single item          | `PutItem` or `UpdateItem`  |
| Insert/update multiple items         | `BatchWriteItem`           |
| Delete a single item                 | `DeleteItem`               |
| Delete multiple items                | `BatchWriteItem`           |
| Perform atomic write across items    | `TransactionWrite`         |

---

## 🔹 Key Takeaways

✅ **Prefer `Query` over `Scan`** to improve performance.  
✅ **Use `Batch` operations** to reduce API calls and optimize capacity usage.  
✅ **Transactions** are **slower and more expensive** but ensure **atomicity**.  
✅ **Indexing with GSIs and LSIs** can improve read performance.  
✅ **Optimize WCU/RCU** consumption by using **ProjectionExpression, pagination, and batching**.  

🚀 **Would you like a real-world use case breakdown?**  


Employee_Num	User_ID	SSO_ID	Contact_Email	First	Last	Joining_Date	Current_Status	Ownership_Type	Car_Category	Is_Manager	Supervisor_Name	Supervisor_Email	Supervisor_ID
EMP001	lauradavis@example.com	59113	lauradavis@example.com	Laura	Davis	11-09-2024	Pre Hire	private	truck	FALSE	Michael Johnson	lauradavis@example.com	EMP037
EMP002	laurajones@example.com	80286	laurajones@example.com	Laura	Jones	09/26/2022	Archive	private	efm	FALSE	James Williams	laurajones@example.com	EMP003
EMP003	janejones@example.com	63837	janejones@example.com	Jane	Jones	09-02-2025	Inactive	private	multi-drop	FALSE	Jane Smith	janejones@example.com	EMP026
EMP004	janesmith@example.com	48536	janesmith@example.com	Jane	Smith	07-11-2023	Pre Hire	private	multi-drop	TRUE	Jane Garcia	janesmith@example.com	EMP003
EMP005	janemiller@example.com	33639	janemiller@example.com	Jane	Miller	07/26/2025	Inactive	company_owned_or_leased	car	TRUE	Jane Johnson	janemiller@example.com	EMP038
EMP006	annasmith@example.com	46458	annasmith@example.com	Anna	Smith	02/18/2022	Archive	benefit_vehicle	car	TRUE	Emily Williams	annasmith@example.com	EMP013
EMP007	sarahsmith@example.com	99440	sarahsmith@example.com	Sarah	Smith	03/13/2015	Active	company_pool_or_utility	two-wheel	TRUE	Laura Martinez	sarahsmith@example.com	EMP022
EMP008	michaeljohnson@example.com	73035	michaeljohnson@example.com	Michael	Johnson	10/22/2018	Active	company_hire_or_rental	car	FALSE	John Brown	michaeljohnson@example.com	EMP047
EMP009	davidmartinez@example.com	64657	davidmartinez@example.com	David	Martinez	12/25/2016	Inactive	company_hire_or_rental	truck	TRUE	Sarah Williams	davidmartinez@example.com	EMP037
EMP010	annamartinez@example.com	56114	annamartinez@example.com	Anna	Martinez	05-05-2021	Hold	benefit_vehicle	lift-truck	FALSE	Laura Martinez	annamartinez@example.com	EMP015
EMP011	annagarcia@example.com	50004	annagarcia@example.com	Anna	Garcia	11/24/2017	Active	tool_of_trade	car	FALSE	Anna Brown	annagarcia@example.com	EMP049
EMP012	janejones@example.com	64650	janejones@example.com	Jane	Jones	01-10-2019	Pre Hire	company_owned_or_leased	multi-drop	FALSE	Jane Johnson	janejones@example.com	EMP043
EMP013	annamiller@example.com	71294	annamiller@example.com	Anna	Miller	09/16/2016	Pre Hire	company_pool_or_utility	efm	TRUE	Michael Johnson	annamiller@example.com	EMP023
EMP014	markmiller@example.com	76064	markmiller@example.com	Mark	Miller	10-08-2022	Archive	tool_of_trade	multi-drop	TRUE	David Martinez	markmiller@example.com	EMP046
EMP015	sarahmiller@example.com	84379	sarahmiller@example.com	Sarah	Miller	02/25/2020	Hold	company_owned_or_leased	two-wheel	TRUE	Sarah Smith	sarahmiller@example.com	EMP019
EMP016	jamesjones@example.com	14951	jamesjones@example.com	James	Jones	10/26/2021	Pre Hire	private	truck	FALSE	Sarah Davis	jamesjones@example.com	EMP022
EMP017	laurajohnson@example.com	87124	laurajohnson@example.com	Laura	Johnson	06/26/2021	Pre Hire	private	car	FALSE	Jane Williams	laurajohnson@example.com	EMP049
EMP018	janelee@example.com	29518	janelee@example.com	Jane	Lee	10/26/2018	Archive	private	two-wheel	FALSE	Sarah Brown	janelee@example.com	EMP042
EMP019	markmiller@example.com	36892	markmiller@example.com	Mark	Miller	03/27/2016	Inactive	benefit_vehicle	two-wheel	FALSE	Anna Williams	markmiller@example.com	EMP012
EMP020	davidbrown@example.com	41399	davidbrown@example.com	David	Brown	08-07-2025	Active	company_owned_or_leased	lift-truck	FALSE	John Miller	davidbrown@example.com	EMP017
EMP021	davidmiller@example.com	68706	davidmiller@example.com	David	Miller	05/26/2025	Archive	private	car	FALSE	Sarah Brown	davidmiller@example.com	EMP049
EMP022	emilybrown@example.com	43637	emilybrown@example.com	Emily	Brown	11-11-2018	Pre Hire	private	multi-drop	FALSE	David Lee	emilybrown@example.com	EMP005
EMP023	michaeljohnson@example.com	18688	michaeljohnson@example.com	Michael	Johnson	10-03-2020	Pre Hire	company_owned_or_leased	truck	FALSE	John Smith	michaeljohnson@example.com	EMP011
EMP024	janegarcia@example.com	12216	janegarcia@example.com	Jane	Garcia	11/27/2018	Active	tool_of_trade	lift-truck	FALSE	David Williams	janegarcia@example.com	EMP029
EMP025	jamesbrown@example.com	93101	jamesbrown@example.com	James	Brown	12-11-2022	Active	company_owned_or_leased	car	TRUE	Jane Jones	jamesbrown@example.com	EMP043
EMP026	johnmiller@example.com	21003	johnmiller@example.com	John	Miller	08/20/2020	Inactive	benefit_vehicle	efm	TRUE	Jane Smith	johnmiller@example.com	EMP033
EMP027	annagarcia@example.com	98046	annagarcia@example.com	Anna	Garcia	02-07-2018	Archive	tool_of_trade	efm	TRUE	Jane Smith	annagarcia@example.com	EMP002
EMP028	jamesbrown@example.com	87223	jamesbrown@example.com	James	Brown	11/20/2021	Pre Hire	company_owned_or_leased	truck	FALSE	John Jones	jamesbrown@example.com	EMP004
EMP029	markdavis@example.com	13107	markdavis@example.com	Mark	Davis	02-12-2019	Active	company_owned_or_leased	lift-truck	FALSE	Emily Martinez	markdavis@example.com	EMP044
EMP030	emilygarcia@example.com	79282	emilygarcia@example.com	Emily	Garcia	12/25/2015	Hold	company_hire_or_rental	multi-drop	FALSE	James Davis	emilygarcia@example.com	EMP045
EMP031	emilylee@example.com	78324	emilylee@example.com	Emily	Lee	01-11-2022	Archive	tool_of_trade	lift-truck	FALSE	Michael Garcia	emilylee@example.com	EMP023
EMP032	michaellee@example.com	25551	michaellee@example.com	Michael	Lee	07/13/2025	Active	benefit_vehicle	multi-drop	TRUE	Jane Davis	michaellee@example.com	EMP042
EMP033	emilybrown@example.com	69202	emilybrown@example.com	Emily	Brown	12-01-2017	Active	company_pool_or_utility	lift-truck	TRUE	James Jones	emilybrown@example.com	EMP002
EMP034	jamesmiller@example.com	65607	jamesmiller@example.com	James	Miller	08-12-2018	Archive	company_owned_or_leased	efm	TRUE	Jane Miller	jamesmiller@example.com	EMP027
EMP035	michaelmartinez@example.com	39867	michaelmartinez@example.com	Michael	Martinez	02-07-2020	Hold	benefit_vehicle	car	TRUE	Laura Brown	michaelmartinez@example.com	EMP022
EMP036	jamesgarcia@example.com	80333	jamesgarcia@example.com	James	Garcia	03/24/2024	Archive	company_pool_or_utility	multi-drop	FALSE	Sarah Miller	jamesgarcia@example.com	EMP008
EMP037	johnjones@example.com	83254	johnjones@example.com	John	Jones	10/28/2021	Inactive	benefit_vehicle	two-wheel	FALSE	Mark Brown	johnjones@example.com	EMP026
EMP038	daviddavis@example.com	36954	daviddavis@example.com	David	Davis	12/27/2019	Active	benefit_vehicle	truck	FALSE	Laura Smith	daviddavis@example.com	EMP023
EMP039	johngarcia@example.com	66464	johngarcia@example.com	John	Garcia	09/20/2021	Active	tool_of_trade	truck	TRUE	David Martinez	johngarcia@example.com	EMP019
EMP040	annagarcia@example.com	30615	annagarcia@example.com	Anna	Garcia	08-01-2022	Hold	tool_of_trade	two-wheel	TRUE	Emily Garcia	annagarcia@example.com	EMP047
EMP041	sarahmartinez@example.com	88440	sarahmartinez@example.com	Sarah	Martinez	01/13/2019	Archive	private	car	FALSE	John Davis	sarahmartinez@example.com	EMP004
EMP042	michaelmartinez@example.com	78854	michaelmartinez@example.com	Michael	Martinez	02/20/2024	Active	company_hire_or_rental	multi-drop	FALSE	David Lee	michaelmartinez@example.com	EMP002
EMP043	johnwilliams@example.com	27365	johnwilliams@example.com	John	Williams	06/13/2016	Archive	company_hire_or_rental	truck	TRUE	Emily Miller	johnwilliams@example.com	EMP049
EMP044	sarahbrown@example.com	14036	sarahbrown@example.com	Sarah	Brown	06/26/2019	Pre Hire	company_hire_or_rental	efm	FALSE	Emily Smith	sarahbrown@example.com	EMP012
EMP045	janejohnson@example.com	44133	janejohnson@example.com	Jane	Johnson	07-04-2016	Hold	benefit_vehicle	two-wheel	TRUE	John Smith	janejohnson@example.com	EMP042
EMP046	markmartinez@example.com	76403	markmartinez@example.com	Mark	Martinez	03/23/2024	Archive	company_hire_or_rental	lift-truck	TRUE	Mark Garcia	markmartinez@example.com	EMP048
EMP047	lauradavis@example.com	33747	lauradavis@example.com	Laura	Davis	01-07-2023	Active	company_pool_or_utility	truck	FALSE	Emily Smith	lauradavis@example.com	EMP002
EMP048	sarahmartinez@example.com	15585	sarahmartinez@example.com	Sarah	Martinez	10-03-2016	Hold	company_owned_or_leased	lift-truck	TRUE	Michael Miller	sarahmartinez@example.com	EMP007
EMP049	janedavis@example.com	99269	janedavis@example.com	Jane	Davis	11-01-2025	Inactive	private	efm	FALSE	David Williams	janedavis@example.com	EMP011
EMP050	jamesdavis@example.com	46682	jamesdavis@example.com	James	Davis	10/21/2023	Pre Hire	company_pool_or_utility	efm	TRUE	Sarah Brown	jamesdavis@example.com	EMP014


