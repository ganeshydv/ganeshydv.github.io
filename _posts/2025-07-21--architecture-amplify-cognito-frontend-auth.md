---
layout: post
title: "✅ Architecture: Amplify + Cognito (Frontend Auth) + Backend (Token Verification)"
date: 2025-07-21
categories: [system-design, oauth2-cognito]
tags: [aws, javascript, frontend, networking]
author: "GGurkhude"
excerpt: "Learning notes on ✅ architecture: amplify + cognito (frontend auth) + backend (token verification)"
original_path: "3_SystemDesign/OAuth2-cognito/Cognito_2.1_sign_in.md"
---

## ✅ Architecture: Amplify + Cognito (Frontend Auth) + Backend (Token Verification)
### 🔁 Flow Overview
```
[Angular + Amplify]
    - Uses Amplify Auth to sign in
    - Receives JWT tokens (Access, ID, Refresh)

        ↓ (sends AccessToken via Authorization header)

[Backend (NestJS/Node.js)]
    - Verifies AccessToken on each request
    - Uses issuer, client_id, jwksUri to validate
```
## 🔐 Frontend (Angular + Amplify)

### 🔧 Setup
- Use Amplify Auth to sign in and receive tokens.
```ts
import { Auth } from 'aws-amplify';

const user = await Auth.signIn(email, password);
const session = await Auth.currentSession();
const accessToken = session.getAccessToken().getJwtToken();
```
- Then pass this accessToken in the headers of your API calls:
```ts
{
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
}
```

## 🛡️ Backend (NestJS) - Token Verification
You can verify the token in a middleware/guard using:
- JWT library (e.g., jsonwebtoken)
- Cognito JWKS endpoint (public keys)
   - for cognito user pool 
   - Fetch Cognito's JWKS (public keys)
   - Verify the signature and claims using the public key from JWKS
```
https://cognito-idp.<region>.amazonaws.com/<userPoolId>/.well-known/jwks.json
```
- Issuer, audience (clientId), and expiration check