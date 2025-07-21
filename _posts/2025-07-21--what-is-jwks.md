---
layout: post
title: "✅ What is JWKS?"
date: 2025-07-21
categories: [system-design, oauth2-cognito]
tags: [aws, database, frontend, networking]
author: "GGurkhude"
excerpt: "Learning notes on ✅ what is jwks?"
original_path: "3_SystemDesign/OAuth2-cognito/JWKS_.md"
---

## ✅ What is JWKS?
- JWKS is a public set of keys used to verify JWT tokens (ID tokens or access tokens).

- It’s typically hosted at a well-known endpoint, e.g.,
https://cognito-idp.<region>.amazonaws.com/<userPoolId>/.well-known/jwks.json

- Contains public keys only (no secrets)

- Tokens are signed by a private key, and verified using a public key from JWKS.

## 🔐 How Verification Works (Step-by-Step)

```sql
Client (Angular)      Cognito              Backend API           JWKS Endpoint
    |                     |                     |                      |
    | -- login/signup --> |                     |                      |
    |                     | -- signs JWT ------> |                      |
    |                     |                     |                      |
    | <-- token (JWT) --- |                     |                      |
    |                     |                     |                      |
    | --- token ------->                         |                      |
    |                     |                     |                      |
    |                     |                     | -- get JWKS -------> |
    |                     |                     | <-- jwks.json ------|
    |                     |                     |                      |
    |                     |                     | -- verify JWT using public key
```