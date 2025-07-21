---
layout: post
title: "✅ What is Partition Tolerance?"
date: 2025-07-21
categories: [system-design, db]
tags: [javascript]
author: "GGurkhude"
excerpt: "Learning notes on ✅ what is partition tolerance?"
original_path: "3_SystemDesign/DB/CAP_AP_0.md"
---

## ✅ What is Partition Tolerance?
- The system continues to operate even if network partitions occur (i.e., nodes cannot talk to each other).
- Example:
   - Imagine your DB is replicated across:
     - 🇮🇳 Mumbai (primary)
     - 🇺🇸 US East (replica)
     - 🇩🇪 Europe (replica)
    - Now Mumbai ↔ US/EU connection breaks.
Your system is now partitioned.

## 🔹 AP Systems (Availability First)
- `All nodes can accept writes`
- Replication is `asynchronous`
- `Conflict resolution` happens later
- Tradeoff: ✅ Always up, ❌ Temporary inconsistency
- ✅ Always responds - No Error
- ❌ You might get stale or conflicting data
- ❌ May not give latest data



## ❓ Your Core Doubt:
### If the nodes can’t talk, how can they be consistent?
### Exactly. They can’t.
That’s why you must choose between:
1. Consistency (CP):
    - `Refuse` to serve data from disconnected nodes
    - `Return an error or make user wait`
    - Wait for partition to heal

2. Availability (AP):
   - `Allow` disconnected replicas to respond
   - But data may be stale
   - Use techniques like eventual consistency

## ✅ Final Answer to Your Doubt
### Can a system ensure consistency if there's no network?

- `No` — not immediately.
- But:
  - A CP system will not allow writes on isolated replicas — so it preserves consistency by giving up availability.
  - An AP system will allow writes, and repair data later (eventual consistency).

## 🧠 Partition Tolerance Doesn’t Mean “Every Node Must Respond”
This is a common confusion. In CAP:
- Partition Tolerance = The system as a whole continues to operate, not every single node.
- So if:
  - Some nodes are unreachable, and
  - The system can still serve reads/writes safely (according to its CAP tradeoff)
- Then it's partition-tolerant.
