---
layout: post
title: "CodePipeline:"
date: 2025-07-21
categories: [aws, cicd]
tags: []
author: "GGurkhude"
excerpt: "Learning notes on codepipeline:"
original_path: "0_AWS/CICD/0_aws_codePipeline_.md"
---

## CodePipeline:
```text
REPO [cicd]
   | 
Codepipeline [detects_changes] -pooling/webhook 
   |
Codebuild [takes code from codepipeline and builds]
   |
Codedeploy/ECS [for deployment]
```
### Q. Do codepipeline pulls repo code from specific branch?
- Yes
- pulls code and gives as artifact to next build stage
- Ex. pulls code from cicd of repo gives to codebuild
### Q. Do codebuild takes code from codepipelne in above structure?
- yes
- So it maintains consistant code even if new code is merged it will be new deployment
