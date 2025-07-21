---
layout: post
title: "What if have 2 account ?"
date: 2025-07-21
categories: [general]
tags: [networking]
author: "GGurkhude"
excerpt: "Learning notes on what if have 2 account ?"
original_path: "git_cmds_account_.md"
---

## What if have 2 account ?

### 1. check which account ?
   - check: **`git config -l`**
      ```cmd
      git ls-remote git_repo_url
      ```
   - this will show some hash
   
### 2. Solution :
   - Use User Account NAME 
      ```
      git clone https://githubAccoutName@github.com/repo
      ```
### 3. Other Options 
  - Option 1: Use SSH for Different Accounts (Recommended)

## Config
   - Set User Name:
      ```
      git config user.name "Your Name"
      ```
   - Set User Email:
     ```
     git config user.email "your.email@example.com"
     ```