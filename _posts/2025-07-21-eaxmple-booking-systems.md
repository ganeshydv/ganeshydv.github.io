---
layout: post
title: "Eaxmple booking systems"
date: 2025-07-21
categories: [system-design, db]
tags: [database, transactions]
author: "GGurkhude"
excerpt: "Learning notes on eaxmple booking systems"
original_path: "3_SystemDesign/DB/ACID_2_I_Lock_2.md"
---

## Eaxmple booking systems
### especially for things like train/bus/movie tickets or event seats in which one user is booking seats 1 to 10 another at the same time booking 5 to 10 and other users may trying to book same seats so In this scenario do you mean wh need to lock in sequential order so there will be no deadlock and one thing I'm confused how this situation will handled do db is going to make sure and give error if he finds these seats are already locked or db will or another transaction will decide locks and other bookings will fail 

You're asking exactly the right thing:
   - How is locking handled when overlapping seat ranges are being booked concurrently?
   - What decides the lock? The DB engine? Or our application code?
   - Will it result in deadlocks or conflicts, and how to prevent them?

### 🎯 Problem Summary
Users booking overlapping seat ranges:
  - User A: tries to book seats 1–10
  - User B: tries to book seats 5–10 at the same time
  - User C/D... also trying other overlapping ranges

Seats 5–10 are common → conflict and possibly a deadlock or double-booking unless managed properly.
### 🔐 What Should Happen?
Only one transaction should succeed in booking the overlapping seats.
Others should either:
  - Wait (if using locks)
  - Fail and retry
  - Or get feedback saying seats are unavailable

## ✅ Option 1: Use Pessimistic Locking (Safe but Slower)
Use SQL SELECT ... FOR UPDATE to lock the seat rows before confirming booking
- ### 💡 Flow:
      ```sql
      BEGIN;
      
      -- Lock the seats
      SELECT * FROM seats
      WHERE seat_number BETWEEN 1 AND 10
      AND status = 'AVAILABLE'
      FOR UPDATE;
      
      -- Check if we got all 10
      -- if yes, proceed to update
      UPDATE seats SET status = 'BOOKED', user_id = X
      WHERE seat_number BETWEEN 1 AND 10;
      
      COMMIT;
      ```
- ### 🔁 Now what happens if User B tries booking (5–10) while User A is in the middle?
   - User B’s query will block at FOR UPDATE on seats 5–10
   - DB waits until User A commits or rolls back
   - If seats are booked, User B gets 0 rows to lock → your app can throw “seats unavailable”


✅ This is DB-level atomic and deadlock is avoided if you always lock seats in ascending order.

### 🔥 BUT What if you don't lock in order?
Example:
   - User A: locks seats 1–10
   - User B: locks seats 10–5 (descending)
   - You can get deadlock, because:
      - A locks seat 1 first, then 2... then 10
      - B locks seat 10 first, then 9... then 5
      - Both now waiting on each other → 💥 Deadlock

So yes: always lock in same (ascending) order to prevent deadlocks.

## ✅ Option 2: Optimistic Locking (Fast, retry-based)
1. Don't lock seats initially.
2. Select all candidate seats (1–10), check status = 'AVAILABLE'
2. When updating, include a condition:
   ```sql
   UPDATE seats
   SET status = 'BOOKED'
   WHERE seat_number BETWEEN 1 AND 10
   AND status = 'AVAILABLE';
   ```
4. Check how many rows got updated:
   - If it’s less than 10, means someone else already took some seats
   - Roll back or show partial availability
### 💡 You can also use version or timestamps to do optimistic version checking.

## ✅ Option 3: Use Unique Constraints on Bookings (No Locks)
Each booking inserts into a bookings table:
```sql
CREATE TABLE bookings (
  seat_id INT UNIQUE,
  user_id INT,
  ...
);
```
Now insert:
```sql
INSERT INTO bookings (seat_id, user_id) VALUES (5, A), (6, A), ..., (10, A);
```
- If another user tries to book any of those, their insert will fail with a UNIQUE constraint violation.
- You can catch this error in application and say “seat already booked”.
- ✅ This is lock-free and uses DB constraints to prevent double booking.

## ✅ How the DB Decides Locking
If you explicitly use:
- SELECT ... FOR UPDATE: DB locks the rows, and later TXs must wait
- UPDATE ... WHERE: DB locks the rows during update
- No explicit locking? Then it's up to isolation level (like MVCC in PostgreSQL)

## 🧠 Summary

| Strategy                | How it Works                            | Pros                       | Cons                        |
| ----------------------- | --------------------------------------- | -------------------------- | --------------------------- |
| **Pessimistic Locking** | `SELECT ... FOR UPDATE` on seat rows    | Safe, prevents conflict    | Slower under high load      |
| **Optimistic Locking**  | Try update, fail on mismatch or version | Fast, scalable             | Requires retry mechanism    |
| **Constraint-based**    | Use `UNIQUE(seat_id)` in booking table  | Lock-free, clean DB design | Fails late, harder to batch |

## 🔒 Bonus: Handling Thousands of Seats
If you’re booking hundreds/thousands of seats, avoid row-by-row locking.

Instead, use bulk queries, always lock in order, and maybe batch by sections.