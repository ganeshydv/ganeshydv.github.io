## 1. Business App:
 - 1. Fleet Tool -> Driver --> Entitlements i.e. circle/playlist/EcoScore/FicoScore/Dvir/Rewards ->
   --> Send Activation link --> Reset psd
 - 2. Bzz App: PSD + Username --> Mentor Gateway ->CDB + Fleet Provision --> fetch driver data+ company Data+ entitlements -> JWT token -> Store in SESSION DB ---> Response Token

 ## 2. SDK Portal :
 - 1. Regiser On Portal
 - 2. Create App : name + token type --> Reponse API Key 
 - 3. Create Driver : name + email + APP name + Curriculam
 - 4. Curriculam : select courses for assignment from suggestions
 
   - ### SIGN UP: 
   SDK Portal [email+psd+other] --> cognito --> SDK Portal --> F3 -->[DB-SDK] | [Table:Account] :{Account ID: CognitoSsoUserID} 
   - ### Sign In:
   SDK Portal [Email+Psd]--> Cognito-->Access TOken+Id TOken--> Cognito User ID--> F3 SDK Backend -->DB --> Response
   - ### Sign In - If Already TOken present in Browser
   SDK Portal - token [AuthGuard]-check token in local-->Set User From Local if not token not expired