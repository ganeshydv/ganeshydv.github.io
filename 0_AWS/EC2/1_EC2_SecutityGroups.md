
## Security Groups : for Network security in AWS
- `controls`: traffic allowed into or out of EC2 instance
- It can have : 
- It contains ALLOW rules only as by default in comming traffic is forbidden
   1) security group [or]
   2) IP address
- `Firewall`
- `Regulets`: 
   - Acces to port
   - authorized Ip ranges Ipv4 or Ipv6
   - control of inbound network ( from other to instance)
   - control of outbound network
- can be attached to multiple instances
- attached tp region/VPC
- good to maintain seperate SG for SSH access
- if response not getting it means SG issue
----------------------------------------------------------
## How to create Security group

1) `crate Insatnce of Ec2`
2) `go to Network & Security`
3) `got to Secure group`
4) `inbound rules` : from outside to instance     - here you have to add/DELETE security group TYPE
5)  `outbound rules` : from Insatnce to outside


----------
## Example:
```
EC2 instance A-- has SG1 allows inbound from - SG1 + SG2                           
EC2 instance B -has SG2 
Ec2 instance C -has SG1
            B ---->  A
            C ---->  A
now instance A allows instance B and C to be in inbound rule 
it means instance C and B can send data to instance A
```
--------
##   PORTS 
```
22= SSH - log in LINUX
21 = FTP 
22 = SFTP - upload file using SSH
80 = HTTP
443 = HTTPS
3389 = RDp - Remote Desktop protocol - log in windows
```

-----
## Q.1.Do roles and Security groups in aws are used for access management

ChatGPT
- Yes, both IAM (Identity and Access Management) roles and security
groups in Amazon Web Services (AWS) are used for access management, 
but they serve different purposes and are used in different contexts.

- `IAM Roles`: 
    - IAM roles are used to grant permissions to AWS services or entities (such as EC2 instances) rather than individual users. 
    - Roles allow you to define a set of permissions and then assign those permissions to AWS resources. 
    - This is useful for granting permissions to services or applications running on AWS resources without needing to manage long-term credentials like access keys. 
    - For example, you can create an IAM role that allows an EC2 instance to access an S3 bucket, and then associate that role with the instance. This enhances security and reduces the need to embed access credentials directly into your code or configuration.

- `Security Groups`: 
    - Security groups act as virtual firewalls for your AWS resources, controlling inbound and outbound traffic at the instance level. 
    - They are used to specify what types of traffic are allowed or denied to an EC2 instance, RDS instance, or other AWS resources. 
    - You can configure security groups to control access based on IP addresses, port ranges, and protocols.
    - Security groups are used to manage network-level access control for your resources.
- In summary, IAM roles are primarily used for managing permissions and 
access at the AWS service level, allowing you to grant permissions to 
resources or services themselves. Security groups are used to control 
network traffic and manage access at the instance level by specifying 
which types of traffic are allowed to reach the resource.