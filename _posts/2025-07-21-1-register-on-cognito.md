---
layout: post
title: "1. Register on Cognito"
date: 2025-07-21
categories: [authentication, cognitoauth-md]
tags: [networking]
author: "GGurkhude"
excerpt: "Learning notes on 1. register on cognito"
original_path: "5_Auth_JWT/CognitoAuth.md"
---

## 1. Register on Cognito
  - Set up a User Pool in Cognito to manage user authentication.
  - Create an App Client in Cognito to allow applications (frontend/backend) to interact with the Cognito User Pool.
  - Configure the App Client to enable OAuth 2.0 flows (e.g., Authorization Code Flow or Implicit Flow).
## 2. Use Cognito's JWKS for Token Validation
- Cognito automatically creates JSON Web Key Sets (JWKS) for validating its issued tokens (ID Token and Access Token).
- JWKS is available at :
   ```
   https://<your_cognito_domain>.auth.<region>.amazoncognito.com/.well-known/jwks.json
   ```
- You don't need to manually create public-private key pairs. Cognito handles this for you.
## 3. AuthN/AuthZ in Backend Using Cognito
- Authentication (AuthN): Validate the user's identity using the ID Token.
- Authorization (AuthZ): Validate permissions or roles using the Access Token.
## 4. Detailed Flow
### Frontend Login:
- The frontend interacts with Cognito to log the user in.
- Cognito returns:
- ID Token: For user identity verification.
- Access Token: For API authorization.
- Refresh Token: To renew ID/Access Tokens when they expire.
### Backend Communication:
 - Frontend Sends Token:
   - For each API request to your backend, include the relevant token (ID Token or Access Token) in the Authorization header:
 - Backend Verifies Token:

   - Use Cognito's JWKS to validate the token. This includes:
   - Decoding the token.
   - Verifying the token's signature.
   - Checking claims like:
       - Issuer (iss): Must match your Cognito User Pool.
       - Audience (aud): Must match your App Client ID.
       - Expiration (exp): Token must not be expired.
## Example validation process:

```js
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const jwksUri = "https://<your_cognito_domain>.auth.<region>.amazoncognito.com/.well-known/jwks.json";

const client = jwksClient({
  jwksUri,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

async function verifyToken(token) {
  const options = {
    issuer: "https://<your_cognito_domain>.auth.<region>.amazoncognito.com/",
    audience: "<your_client_id>",
  };

  return new Promise((resolve, reject) => {
    jwt.verify(token, getKey, options, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
}

const token = "<ID_or_Access_Token>";
verifyToken(token)
  .then(decoded => console.log("Valid token:", decoded))
  .catch(err => console.error("Invalid token:", err));

```
### Respond to Request:

If the token is valid, process the request and respond.
If invalid, return a 401 Unauthorized error.

##
## 4. How :
 - Login from front end --> gets Id / Access / Refresh TOken
 - consider ID token or access token based on requirement to send with each request --> backend 
 - verify this token with JWKS provided by cognito 
 - send repsonse
