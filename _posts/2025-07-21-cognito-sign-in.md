---
layout: post
title: "Cognito Sign In:"
date: 2025-07-21
categories: [system-design, oauth2-cognito]
tags: [aws]
author: "GGurkhude"
excerpt: "Learning notes on cognito sign in:"
original_path: "3_SystemDesign/OAuth2-cognito/Cognito_2_sing_in_.md"
---

## Cognito Sign In:

### Flow 1:
```
Client (app)
     |
     |→ POST /auth/signin (email + password)
     ↓
Backend 
     |
     |→ Initiate Auth with Cognito
     ↓
Cognito (User Pool)
     |
     |→ Returns Tokens (JWT)
     ↓
Backend can verify/store as needed
```

1. Frontend Sends Credentials
2. Backend Calls Cognito to Authenticate:
   - If successful, Cognito responds with JWT tokens:
       - AccessToken: Used to authorize access to APIs
       - IdToken: Contains user claims (email, sub, etc.)
       - RefreshToken: Used to get a new token without re-login
```ts
const command = new InitiateAuthCommand({
  AuthFlow: "USER_PASSWORD_AUTH",
  ClientId: YOUR_APP_CLIENT_ID,
  AuthParameters: {
    USERNAME: email,
    PASSWORD: password,
  },
});
```
3. Backend Returns Tokens to Frontend
4. Frontend Stores Tokens (Securely)
5. (Optional) Backend Verifies Token
   - For secure backend APIs, verify token using Cognito public keys (JWKS).
   - Use libraries like jsonwebtoken or aws-jwt-verify.

## ✅ Summary of AWS SDK Command

| Step | Action                             | AWS SDK Command                |
| ---- | ---------------------------------- | ------------------------------ |
| 1    | User attempts to sign in           | `InitiateAuthCommand`          |
| 2    | Tokens returned                    | Access, ID, Refresh Token      |
| 3    | Backend returns tokens to client   | N/A                            |
| 4    | (Optional) Backend validates token | Using JWKS or Cognito verifier |
