---
layout: post
title: "✅ What Is a Cognito User Pool?"
date: 2025-07-21
categories: [system-design, oauth2-cognito]
tags: [aws]
author: "GGurkhude"
excerpt: "Learning notes on ✅ what is a cognito user pool?"
original_path: "3_SystemDesign/OAuth2-cognito/Cognito_.md"
---

## ✅ What Is a Cognito User Pool?
A User Pool in AWS Cognito is a user directory and authentication service — it's more than just a place to store users.

| Capability                 | Is It Supported? | Notes                                                |
| -------------------------- | ---------------- | ---------------------------------------------------- |
| Store users                | ✅ Yes            | Stores username, email, phone, and custom attributes |
| Signup (Email/Password)    | ✅ Yes            | Supports self-signup or admin-triggered signup       |
| Sign-in (authentication)   | ✅ Yes            | Verifies user credentials and returns tokens         |
| Forgot password (reset)    | ✅ Yes            | Sends email/SMS with code or link                    |
| Email/Phone verification   | ✅ Yes            | Verifies contacts at signup or later                 |
| Social login (Google, etc) | ✅ Yes (with IdP) | Via Hosted UI or federated IdP config                |
| MFA / OTP support          | ✅ Yes            | SMS, TOTP (e.g., Google Authenticator)               |
| Custom attributes          | ✅ Yes            | You can add fields like `accountId`, `role`, etc.    |
| Hosted UI                  | ✅ Optional       | AWS-hosted login/signup UI with theme customization  |
