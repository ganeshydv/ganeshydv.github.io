- `You can use both IAM and AWS IAM Identity Center to create new usersor federate existing users into AWS. The main difference between the two is that IAM users are granted long-term credentials to your AWS resources while users in IAM Identity Center have temporary credentials that are established each time the user signs-in to AWS`
--------
- `A principal entity is a person or application that is authenticated 
using an IAM entity (user or role)`
--> `IAM Entity (User or Role ) becomes Principal Entity when authenticated`
----------------------------------------------------------------------
- `IAM Entity === IAM Principal` 
( both are same the difference is when IAM Entity is 
authenticated it is called IAM Principal)
-------------------------------------------------------------------

### IAM : Global service
- Used to create Users and groups

- IAM USed for : crating and managing
    1) IAM user 
    2) IAM group 
    3) IAM role 
    4) IAM group policies
- `User` : needs permission for access
       - AWS policies are used to give perm
- `services` : need IAM Roles for access
- `Groups` : can not have sub groups
    - : Why crate Groups ?
        - to give directly access to same policies to multiple users
          so not needed to give persmisiions
         independently to each one.

- Each group is independent.

- `Tags`: just for additional info for group/user/other aws resource

--------------------------------------------
## IAM Policy structure
- In AWS Identity and Access Management (IAM), permissions to access AWS services and resources are granted through policies. Both IAM users and IAM roles must have IAM policies attached to them to define the specific actions and resources they are allowed to access.


- `IAM Policy structure`:
```json
{
    "version": ",
    "Id" : "",
    "Statements":[
        {
            "Sid":"1",               
            // statement identifier
            "Effect":"Allow",        
            // statements allow or deny access
            "Principle":{       
                // aka IAM Entity     
                // users or Roles:policies applied to which user
                "AWS" :["arn:aws:iam:: ....:root"]
            },
            "Action":[    
                // list 0f actions this policy allowed to users
                "s3:GetObject",
                "
            ],
            "resource":["arn:aws:s3:::serciceName/*"]  
            //list of resources actions are applied to
        }
    ]
}
```

- `POLICY` :  used for giving certain persmissions to user

### General Process:
- user can have access to
1. diectly attached policies or 
2. inherited from GROUP or 
3. BOTH
```
Admin Role creates user --> gives certain persmissions --> user gets persmisiions
--> user logs in using aws alias or id and then can work on aws but 
user does not have some acees he will not be able to access those things.
```

- You can create own policies and the structure will be as above
