
# subnettting: dividing Ip address into sub addresses
# 7 Attributes of subnetting:
 
1) Network ID : First IP in each sub-network Ex. [10.0.0.0/25 -> 10.0.0.0] - reserved
2) Broadcast IP : Last IP in each sub-network Ex. [10.0.0.0/25 -> 10.0.0.127] - reserved  
               - allows user to speak with other IP's within SUB-Netwrok
               - this IP is used for local communication
3) First Host IP : IP after Network ID  Ex. 10.0.0.0/25 -> 10.0.0.1
4) Last Host IP : IP before Broadcast IP Ex. 10.0.0.0/25 -> 10.0.0.126
5) Next Network : Network ID of Next Subnet [BoradcastIP+1]
                Ex: 10.0.0.0/27-> 10.0.0.128
6) IP Addresses : Number of IP addresses in block
7) CIDR/Subnet : coverting between CIDR/SUBNET Mask 
              - divide by 2^n to total number of IP's

-------------------------------------------

IP addresses:
ex: 10.0.0.0/24 :-- it means Network IP 10.0.0 and subnetwork Ips 10.0.0.0 to 10.0.0.255
ex: 10.0.0.0/25 :-- it means Network IP 10.0.0 and 
                    subnetwork Ips 1) 10.0.0.0 to 10.0.0.127 and 
                             2)10.0.0.128 to 10.0.0.255
ex: 10.0.0.0/26 :-- it means Network IP 10.0.0 and 
                    subnetwork Ips 1) 10.0.0.0 to 10.0.0.62 and 
                             2) 10.0.0.64 to 10.0.0.127 and 
                             3) 10.0.0.128 to 10.0.0.191
                             4) 10.0.0.192 to 10.0.0.255

ex: 10.0.0.0/27 :-- it means Network IP 10.0.0 and 
                    subnetwork Ips divide in total 8 equal parts

ex mix: 10.0.0.X/25/27/27/26 : total 256 in 4 subnetworks
-----------------------------------------------------