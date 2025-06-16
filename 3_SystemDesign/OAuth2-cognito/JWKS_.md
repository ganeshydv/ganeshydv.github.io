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