---
layout: post
title: "How Consistency is managed? (CP system)"
date: 2025-07-21
categories: [system-design, db]
tags: [javascript, database]
author: "GGurkhude"
excerpt: "Learning notes on how consistency is managed? (cp system)"
original_path: "3_SystemDesign/DB/CAP_CP_0.md"
---

## How Consistency is managed? (CP system)
- `All clients see the same data, even if they connect to different nodes.`
- In CP system there will be Only one main write node and other will be read replicas.
- EX. N0 (primary DB) Write, N1 (Region 1), N2 (Region 2) wi

## ✅ In CP (Consistency + Partition Tolerance) systems:
- ⚠️ There is only one writable replica at a time
- ❌ Multiple nodes are not allowed to write simultaneously

This is how strong consistency is enforced.

## 🔹 CP Systems (Consistency First)
- Only one writable node (e.g., MongoDB primary, PostgreSQL primary)
- Replicas are read-only
- If partition happens:
  - Writes are blocked until majority is reachable
  - No split-brain (no conflicting writes)
- Tradeoff: ✅ Safe data, ❌ less availability
- ✅ Strong consistency
- ❌ Might `return error during network partition`

## ✅ Real Example 2: MongoDB (CP)
- Prioritizes consistency: writes go to the primary, secondaries sync afterward
- If primary goes down, write may fail during failover (i.e., system becomes temporarily unavailable)
- ### Why CP?
  - Avoids inconsistent writes
  - Accepts short unavailability during failover