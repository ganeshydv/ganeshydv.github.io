---
layout: post
title: "Check Queue List:"
date: 2025-07-21
categories: [aws, sqs]
tags: [aws, networking]
author: "GGurkhude"
excerpt: "Learning notes on check queue list:"
original_path: "0_AWS/SQS/SQS_SAM_.md"
---

## Check Queue List:
- `aws --endpoint-url=http://localhost:4566 sqs list-queues`
## Check Queue:
- `aws --endpoint-url=http://localhost:4566 sqs receive-message --queue-url http://localhost:4566/000000000000/MyQueue --region us-west-2`

## Delete Queue:
- `aws --endpoint-url=http://localhost:4566 sqs delete-queue --queue-url http://localhost:4566/000000000000/MyQueue`
## Check Lambda Event mapping: check sqs is event for lambda
- `aws --endpoint-url=http://localhost:4566 lambda list-event-source-mappings`

## Check Queue ARN:
- `aws --endpoint-url=http://localhost:4566 sqs get-queue-attributes  --queue-url http://localhost:4566/000000000000/MyQueue  --attribute-name QueueArn`