---
layout: post
title: "Merge Strategy:"
date: 2025-07-21
categories: [general]
tags: []
author: "GGurkhude"
excerpt: "Learning notes on merge strategy:"
original_path: "git_merge_strategy_.md"
---

## Merge Strategy:

### Example : Let say there is CICD branch which is used for deployment now devoplers are making changes to it by taking cicd as base branch. As a dev u also work on some feature on your own branch now how you can make sure that your code and code on cicd is compatable or make sure that ypu branch is in sync with cicd so there will be no conflicts and your branch can be merged with cicd

### Approach 1:
1. Commit your code on dev.
2. Switch to cicd, pull remote changes to bring it up to date.
3. Switch back to dev, merge cicd into dev to ensure you integrate those changes into your branch.
4. Push dev and raise a PR to merge it into cicd.

### Approach 2:
1. Commit your code on dev.
2. Pull cicd directly into dev.
3. Push dev and raise a PR.

### Which approach is better and which should choose?
- ### How Commit History Differs in Both Approaches
   - ### Approach 1:
      - When you merge cicd into dev first:
         1. The history on dev will include a merge commit that pulls in the changes from cicd.
        2. Each commit from dev and cicd will remain identifiable and separate in the history.
      - If you need to remove or revert a specific commit:
    
        1. You can identify the exact commit on dev or the original commits from cicd.
        2. The changes are clearly traceable, making it easier to revert individual commits.
    ```js
    Start on dev
       │
    Commit changes on dev
       │
    Switch to cicd
       │
    Pull remote changes from cicd
       │
    Switch back to dev
       │
    Merge cicd into dev
       │
    Test & Push dev
       │
    Raise PR
    
    ```
   - ### Approach 2:
       - When you pull cicd directly into dev:
            1. The history on dev will include the commits from cicd intermixed with dev commits.
            2. The pull operation may create a "fast-forward merge," resulting in a linear history.
            
        - If you need to remove or revert a specific commit:
        
            1.  It’s harder to distinguish commits because dev now has a mixed history.
            2.  Reverting a commit might inadvertently affect other related changes if they depend on each other.
           
    ```ts
    Start on dev
       │
    Commit changes on dev
       │
    Pull remote changes from cicd into dev
       │
    Test & Push dev
       │
    Raise PR
    
    ```