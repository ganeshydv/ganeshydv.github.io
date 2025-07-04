## ✅ Lock Conflicts in SQL Databases
Lock conflicts happen when two or more transactions are trying to read/write the same row or table and the DB needs to ensure isolation.

## 🔥 Real-World Lock Conflict Example: Bank Transfer
Imagine two users transferring money from the same account at the same time.

### ✅ Scenario:
Two concurrent transactions:
- T1: Transfer ₹100 from Account A to B
- T2: Transfer ₹200 from Account A to C
- Assume initial balance is ₹1000.

```sql
-- Transaction T1
BEGIN;
SELECT balance FROM accounts WHERE id = 1 FOR UPDATE;  -- locks row
-- do some processing
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
COMMIT;

-- Transaction T2 (at same time)
BEGIN;
SELECT balance FROM accounts WHERE id = 1 FOR UPDATE;  -- BLOCKED!
```

### 🔒 What’s happening?
- T1 locks accounts.id = 1 for update.
- T2 waits (or errors out with timeout/deadlock) because it also wants to write to the same row.
- When T1 commits, the lock is released, and T2 proceeds.

## 🧠 Why FOR UPDATE?
- It’s a pessimistic lock — used when you expect contention.
- Guarantees no one else can read/write the same row till the current TX finishes.

## 🧨 Deadlock Example
Deadlocks happen when two transactions hold partial locks and wait for each other to release the other one’s lock.
```sql
-- T1
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1; -- locks row 1
-- now T2 comes in

-- T2
BEGIN;
UPDATE accounts SET balance = balance - 200 WHERE id = 2; -- locks row 2
UPDATE accounts SET balance = balance + 100 WHERE id = 1; -- waits for T1

-- Back to T1
UPDATE accounts SET balance = balance + 200 WHERE id = 2; -- waits for T2
```
### 🔁 Now both are waiting on each other forever → DB detects deadlock and kills one TX.


## 🔧 How to Prevent Lock Conflicts
- `Always lock in the same order` (e.g., by id) to avoid deadlocks.
- Keep transactions short.
- Use retry logic (many ORMs provide this).
- Use `optimistic locking` (covered below in ORM part).

## Pessimistic Locking - In Query
```ts
await manager
  .createQueryBuilder(Account, "account")
  .setLock("pessimistic_write")
  .where("account.id = :id", { id: 1 })
  .getOne();
```
- Translates to SELECT ... FOR UPDATE
- Use when you’re sure only one transaction should touch a row at a time.


## Optimistic Locking - adding something to table
- You use a version field.
- No locks taken, but before update, ORM checks if someone else updated the row.
```ts
@Entity()
class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @VersionColumn()
  version: number;
}
```
- Now the update will look like:
```sql
UPDATE accounts SET balance = ..., version = version + 1
WHERE id = 1 AND version = 5;
```
- If version doesn't match, update fails → retry or error.
- Why? if this query is being run by others let say user 1 for him v=1, same time for user 2  v=1 but when user 1 will first update v=2 then if user 2 tries to update then condition becomes unvalid as v=2 now not v=1

## 🔁 Understanding “Lock in Same Order” with a Real Example
🎯 The Problem:
Deadlocks happen when two or more transactions acquire partial locks and then wait on each other to release the remaining locks.
### 🧍 Example: Two Friends Booking Conference Rooms
- There are 2 rooms: Room A and Room B.
- Alice wants to book A first, then B.
- Bob wants to book B first, then A.
### 🔴 Problem:
- Alice locks Room A 🛑 (Room B is free)
- Bob locks Room B 🛑 (Room A is locked by Alice)
- Now:
    - Alice waits for Room B (Bob has it)
    - Bob waits for Room A (Alice has it)
- 💥 Deadlock

### ✅ Solution: Lock in the Same Order
- Force both Alice and Bob to always acquire Room A before Room B (say, in alphabetical order):
- Alice locks A → then B
- Bob also locks A → then B (but now waits on A if already locked)
- No circular wait → no deadlock

### 🔁 Applying to DB Transactions
- Assume your accounts table has:

   | id | balance |
   | -- | ------- |
   | 1  | ₹1000   |
   | 2  | ₹2000   |

- Now you have:
  ### 🔴 Deadlock-prone logic: 
  ```ts
    // T1 (Transfer from 1 → 2)
    LOCK account 1;
    LOCK account 2;
    
    // T2 (Transfer from 2 → 1)
    LOCK account 2;
    LOCK account 1;
  ```
  - T1 locks row 1 same time
  - T2 locks row 2 same time
  - Then both wait on the other's lock (T1 for row 2 & T2 for row 1) → Deadlock
- ### Solution : ✅ Safe ordering:
    Sort account ids before locking:
    - So even if T1 and T2 are doing different transfers, they’ll lock rows in the same order (1 then 2).
    ```ts
        // Transfer between account A and B
    const from = Math.min(accountA, accountB);
    const to = Math.max(accountA, accountB);
    
    // Always lock lower ID first
    LOCK account with id = from;
    LOCK account with id = to;
    ```
    - That ensures:
      - One transaction will wait on the first lock if already held.
      - No deadlock cycle can form.

##  Summary
| Conflict Type     | Example                      | Result                | Fix                     |
| ----------------- | ---------------------------- | --------------------- | ----------------------- |
| Row lock conflict | Two updates to same row      | Second waits or fails | Retry, optimize TX flow |
| Deadlock          | Two TXs wait on each other   | One is killed         | Lock in same order      |
| Optimistic Lock   | Conflict detected on version | Update fails          | Use retries             |
