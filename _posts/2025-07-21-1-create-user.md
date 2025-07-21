---
layout: post
title: "1. Create User:"
date: 2025-07-21
categories: [aws, 0-aws--md]
tags: [aws]
author: "GGurkhude"
excerpt: "Learning notes on 1. create user:"
original_path: "0_AWS/0_AWS_.md"
---

[text](AWS_Free_Tier.md)

### 1. Create User:
### 2. assign Roles - for services, users 
- An IAM role is an identity you can create that has specific permissions with credentials that are valid for short durations. Roles can be assumed by entities that you trust.
- Roles and users are both AWS identities with permissions policies that determine what the identity can and cannot do in AWS.
- However, instead of being uniquely associated with one person, a role can be assumed by anyone who needs it. A role does not have standard long-term credentials such as a password or access keys associated with it. Instead, when you assume a role, it provides you with temporary security credentials for your role session.
- ROles: Group of policies + assigned to USER or Service for Temp access
### 3. Policies - Permissions