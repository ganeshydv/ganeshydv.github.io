---
layout: post
title: "� AWS SQS + Lambda Setup: Manual AWS CLI vs. LocalStack + SAM"
date: 2025-07-21
categories: [aws, localstack-approach-comparison-md]
tags: [aws]
author: "GGurkhude"
excerpt: "Learning notes on � aws sqs + lambda setup: manual aws cli vs. localstack + sam"
original_path: "0_AWS_SAM_Localstack/localstack_approach_comparison.md"
---

# 🔹 AWS SQS + Lambda Setup: Manual AWS CLI vs. LocalStack + SAM

| **Approach**                | **Manual AWS CLI**                          | **LocalStack + SAM**                  |
|-----------------------------|--------------------------------------------|---------------------------------------|
| **SQS Creation**            | ✅ `aws sqs create-queue` (manual setup)   | ✅ Auto-created via SAM template     |
| **Lambda Deployment**       | ✅ Zip + Upload manually                   | ✅ Auto-built & deployed via SAM     |
| **SQS Triggering Lambda**   | ✅ Manual setup via AWS Console or CLI     | ✅ Auto-linked in SAM template       |
| **IAM Policies**            | ✅ Manually attach roles & permissions     | ✅ Auto-managed by SAM               |
| **Ease of Use**             | ❌ Cumbersome & time-consuming             | ✅ Super easy & automated            |

---

## 🔹 Summary
- **Manual AWS CLI**: Gives full control but requires **manual configuration** for SQS, Lambda, triggers, and IAM policies.
- **LocalStack + SAM**: Automates **resource creation, linking, and IAM management**, making it easier for **local testing and deployments**.

🚀 **Which setup do you prefer for your project?** Let me know if you need a **SAM template example**! 😊
