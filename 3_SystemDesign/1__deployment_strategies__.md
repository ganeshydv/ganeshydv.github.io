# Deployment Strategies

There are six general ways to deploy applications:

1. **Recreate**: This strategy involves removing the current deployment (A) and replacing it with a new deployment (B). The process is as follows:
   - Remove A
   - Deploy B
   - Forward traffic to B

2. **Ramped**: This strategy involves replacing instances of the current deployment (A) with instances of the new deployment (B) step by step. The process is as follows:
   - Start deploying B (not complete)
   - Replace instances of A with B (step by step)
   - Once B is fully deployed, remove A

3. **Blue-Green**: This strategy involves deploying the new version (B) alongside the current version (A), and then replacing A with B once B has been tested. The process is as follows:
   - Deploy B (A is still in use)
   - Forward traffic to B
   - Remove A

4. **Canary**: This strategy involves gradually shifting traffic from the current version (A) to the new version (B). The process is as follows:
   - Deploy both A and B
   - Gradually shift traffic to B
   - Once all traffic is on B, remove A

5. **A/B Testing**: This strategy involves shifting a specific group of users to the new version (B). This technique is widely used to test the conversion of a given feature and only roll out the version that converts the most. The process is as follows:
   - Deploy both A and B
   - Shift users based on certain parameters (e.g., device type, browser type, location, etc.)
   - Conditions that can be used to distribute traffic amongst the versions include:
     - Browser cookie
     - Query parameters
     - Geolocation
     - Technology support (e.g., browser version, screen size, operating system, etc.)
     - Language

6. **Shadow**: This strategy involves deploying the new version (B) alongside the current version (A), but only sending live traffic to A. B receives the same requests as A but doesn't return responses to the users. This allows you to test B with real data without affecting the user experience.

==============================================================
General 6 Ways:

1) Recreate : replace at once : Remove A --> Deploy B : Replace A by B
        : Remove A --> Deploy B --> forward to B
2) Ramped : Replace step by step :
        Replace Insatnce of A not complete A by instance of B : after each instance replaced Remove A
        : B deployment in Process (not complete)--> instance of A replaced by B ( Step by step )--> B complete --> Remove A
3) Blue-Green : Tested --> B Deployed along side A then A will be Replaced
        : B is deployed [ A is still in use ] --> forward to B -->  Remove A
4) Canary : shift traffic gradually from A to B
        : both complete Deployed --> shift traffic gradually to B --> complete traffic to B --> Remove A 

5) A/B testing: shift specific group of user to B  ( Netflix uses this)
        : users are shifted based on some params Ex device type, browser type, locations etc
        : both A and B up 

        [This technique is widely used to test conversion of a given feature and only roll-out the version that converts the most.
        
        Here is a list of conditions that can be used to distribute traffic amongst the versions:
        
        By browser cookie
        Query parameters
        Geolocalisation
        Technology support: browser version, screen size, operating system, etc.
        Language]

6) Shadow :
        