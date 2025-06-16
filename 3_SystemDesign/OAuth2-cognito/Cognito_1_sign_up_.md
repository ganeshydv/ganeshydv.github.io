## Cognito Sign Up
```
User Details --> Backend --> Cognito 
```
### Requirements:
1. AWS Cognito User Pool: for storing User
2. User Pool - APP CLIENT: for registering apps/web sites -common so user can login any website/app if user is in same pool

## Flow:

###  SignUp:
```
user data --> backend - `AdminGetUserCommand` (find user) - if not present - `SignUpCommand` (create user) --> save user with cognitoId (table)--> add account id to cognito user (`AdminUpdateUserAttributesCommand`)
```
- Check if User Already Exists:
```ts
const command = new AdminGetUserCommand({
  UserPoolId: YOUR_USER_POOL_ID,
  Username: email,
});
```
- Create User if Not Present:
```ts
const command = new SignUpCommand({
  ClientId: YOUR_APP_CLIENT_ID,
  Username: email,
  Password: password,
  UserAttributes: [
    { Name: "email", Value: email },
    { Name: "name", Value: fullName },
  ],
});
```

- Store User in Database
- Add Custom Attributes to Cognito User
```ts
const command = new AdminUpdateUserAttributesCommand({
  UserPoolId: YOUR_USER_POOL_ID,
  Username: email,
  UserAttributes: [
    {
      Name: "custom:accountId",
      Value: accountId,
    },
  ],
});
```

| Step | Action                            | AWS SDK Command                    |
| ---- | --------------------------------- | ---------------------------------- |
| 1    | Check if user exists              | `AdminGetUserCommand`              |
| 2    | Create user if not found          | `SignUpCommand`                    |
| 3    | Save user to DB                   | -                                  |
| 4    | Attach account ID to Cognito user | `AdminUpdateUserAttributesCommand` |


## Cognito Sends Verification Email :
- ### Add Domain - for email verification
- ### Add Extenions - lambda function for custom Messages

