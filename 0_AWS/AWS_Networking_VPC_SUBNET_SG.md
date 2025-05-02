


------------------------------------------------------------

### VPC ==> HAS security Group 

## SECURTIY GROUP: works as virtual firewall 
- gives access to inbound and outbound rule
- `RULES` - fundamental unit for security Group
- `Rules`: Specify the following for each rule:
   - `Type`: The type of traffic (similar to inbound rules).
   - `Protocol`: The protocol used for the traffic.
   - `Port Range`: The port or range of ports.
   - `Destination`: The destination IP address or range to which traffic is allowed.

--------------------------------------
```
Sequence for route in AWS :
1] cloud --> Internet Gateway -->( VPC starts ) ROUTE Table (for each subnet and has config for from to ip)
 --> security Group ( attached to each instance ) --> Resource

+------------------------+      +------------------------+
|     Internet Cloud    |       |     Internet Cloud    |
+------------------------+      +------------------------+
           |                                |
     +-----+-----+                     +-----+-----+
     |  Subnet 1  |                    |  Subnet 2  |
     +------------+                    +------------+
     |   Route    |                    |   Route    |
     |   Table    |                    |   Table    |
     +------------+                    +------------+
           |                                |
     +-------------+                   +-------------+
     | EC2 Instance|                   | EC2 Instance|
     | + Security  |                   | + Security  |
     |   Group     |                   |   Group     |
     +-------------+                   +-------------+
    
2]  cloud --> Internet Gateway -->( VPC starts ) ROUTE Table (for each subnet and has config for from to ip)
 -->ALB/NLB [ Target Group ] --> security Group ( attached to each instance ) --> Resource

+------------------------+      +------------------------+
|     Internet Cloud    |       |     Internet Cloud    |
+------------------------+      +------------------------+
           |                                |
     +-----+-----+                     +-----+-----+
     |  Subnet 1  |                    |  Subnet 2  |
     +------------+                    +------------+
     |   Route    |                    |   Route    |
     |   Table    |                    |   Table    |
     +------------+                    +------------+
           |                                |
     +-------------+                  +-------------+
     |   ALB/NLB   |                  |   ALB/NLB   |
     | + Target    |                  | + Target    |
     |   Group     |                  |   Group     |
     +-------------+                  +-------------+
           |                                   |
     +-------------+                  +-------------+
     | EC2 Instance|                  | EC2 Instance|
     | + Security  |                  | + Security  |
     |   Group     |                  |   Group     |
     +-------------+                  +-------------+
```
