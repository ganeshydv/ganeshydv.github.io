---
layout: post
title: "Understanding 32bit and 64bit Systems"
date: 2025-07-21
categories: [operating-systems, 7-8-32-bit-64-bit--md]
tags: []
author: "GGurkhude"
excerpt: "Learning notes on understanding 32bit and 64bit systems"
original_path: "1_OS/7-8_32_bit_64_bit_.md"
---

# Understanding 32-bit and 64-bit Systems

- **32-bit Systems**: These systems can support memory addresses from 0 to 2^32-1, which equates to 4 GB of RAM.
- **64-bit Systems**: These systems can support memory addresses from 0 to 2^64-1, which equates to approximately 10^10 GB of RAM.

# Types of Storage

Storage in a computer system can be categorized into primary and secondary storage:

## Primary Storage

1. **Register**: This is the lowest level of storage.
2. **Cache**: This is used for storing live data.
3. **Main Memory (RAM)**: This is the primary working memory of the computer.

## Secondary Storage

1. **Disks**: These can be electric, magnetic, or optical.
2. **Magnetic Tapes**: These are used for long-term storage.

# Comparing Storage Types

- **Cost**: Register > Cache > Main Memory > Disk
- **Access Speed**: Register > Cache > RAM > Disk
- **Size**: Register < Cache < RAM < Disk
- **Volatility**: Register > Cache > RAM > Disk

### -------------------------------

32 bit : 0 to 2^32-1 = 4 GB ram supported
64 bit : 0 to 2^64-1 = ~10^10 GB ram supported

==========================
Types of Storages

1) Primary : 1. register ( Low level )
             2. Cache   [ live data ]
             3. Main Memory [ RAM ]
3) Secondary :
            1. Disks - electric, magnetic, optical,
            2. magnetic tapes

- cost : register > cache > main memory > disk..
- Fast Access : regiset > cache > RAM > ...
- SIZE : register < Cache < RAM < Disk
- Volatile : register > Cache > RAM > Disk
