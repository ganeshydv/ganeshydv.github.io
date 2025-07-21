---
layout: post
title: "Why Stop(), Resume(), Suspended() is deprecated"
date: 2025-07-21
categories: [java, adv-java]
tags: [concurrency]
author: "GGurkhude"
excerpt: "Learning notes on why stop(), resume(), suspended() is deprecated"
original_path: "JAVA/Adv_Java/3.2.2_multithreading_Stop_resume_suspend_deprecated.md"
---

## Why Stop(), Resume(), Suspended() is deprecated
- Stop(): 
    - Terminates Thread
    - No lock release
    - No resource cleaning
- Suspended():
    - put thread on HOLD - No locak Release
- Resume():
    -  resumes suspended thread
#
- wait()
    - put thread on wait
    - releases lock
- notify()
    - to resume waiting thread 
    - only single thread is resumed and it's managed by JVM 
    - randomly thread is selected for resuming

- join()
    - makes main thread to wait for completing other thread
- priority()
    - 1 to 10: low to high
    - even we set specific priority JVM does not gurantee the execution order will be followed based on priority
    - Never rely on priority