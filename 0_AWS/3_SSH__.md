## SSH : MAC/LINUX/windows10
## putty: windows<10
## EC2 Insatnce connect: using browsers

 ##  SSH using Linux or MAC

1) EC2 instance running will have inbound rule for PORT 22 which for SSH communication

2) download .pem file from there (remove space from name)
3) use public IP of EC2 instance
4) command:
    ```bash
    ssh ec2-user@_publicIP_
    ```
5) use cmd where .pem file 
   ```bash
    ssh -i name_.pem ec2-user@_publicIP_
   ```
   if fails 
   cmd :
   ```bash
    chmod 0400 name_.pem
   ```
   ```bash 
   ssh -i name_.pem ec2-user@_publicIP_
   ```

6) cmd :exit
   ```bash 
   exit
   ```

--------------------------
##   SSH using windows10
1) cmd : ssh -i name_.pem ec2-user@_publicIP_
2) 