---
layout: post
title: "1. check outdated pkg and lates version"
date: 2025-07-21
categories: [nodejs, node-cmd-md]
tags: [typescript]
author: "GGurkhude"
excerpt: "Learning notes on 1. check outdated pkg and lates version"
original_path: "6_Node_Dev/Node_CMD.md"
---


### 1. check outdated pkg and lates version
```typescript
 npm outdated 
``` 

### 2. updates required package not latest one
```typescript
 npm update --save
``` 

### 3. check vulnerable pkg + severity
```typescript
  npm audit 
``` 

### 4. fix all pkgs :
```typescript
 npm audit fix
 npm audit fix --force
``` 

 