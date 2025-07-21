---
layout: post
title: "� Example: Debugging StepbyStep"
date: 2025-07-21
categories: [aws, 2-1-sam-local-debug--md]
tags: [javascript]
author: "GGurkhude"
excerpt: "Learning notes on � example: debugging stepbystep"
original_path: "0_AWS_SAM/2.1_sam_local_debug_.md"
---

# 🛠 Example: Debugging Step-by-Step
- Want to see what's happening in the container?
- Run with debug mode:
```sh
sam local invoke ProcessAccounts --debug
```
- or with an interactive shell:
```sh
sam local invoke ProcessAccounts -d 9229
```
- Then, in another terminal:
```sh
node --inspect-brk <container_id>
```