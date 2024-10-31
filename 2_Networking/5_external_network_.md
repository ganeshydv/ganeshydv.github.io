# Communication with External Network

## 1) Device Obtains IP from Router

1. The device (with its MAC address) sends a request to the router, which has both an internal and external IP address.
2. The router assigns a new internal IP address to the device using DHCP (Dynamic Host Configuration Protocol).
3. The router saves the association between the device's MAC address and the new internal IP address in its ARP (Address Resolution Protocol) table.
4. The router then sends the new internal IP address back to the device.

## 2) Device Sends Request to Router

1. The device determines the destination IP address using DNS (Domain Name System).
2. The device, with its internal IP address (e.g., 10.0.0.2/24:8080), creates a packet at the transport layer. This packet includes the HTTP data and is sent using either TCP (Transmission Control Protocol) or UDP (User Datagram Protocol).
3. The packet includes both the source IP and destination IP, but does not include the MAC address.
4. The device sends the packet to the router.

## 3) Router Forwards Request to Next-Hop Router or ISP

1. The router determines whether the destination device is in the internal or external network based on the subnet mask.
2. The router uses NAT (Network Address Translation) to change the original source IP of the packet to its public IP address given by the ISP. This is maintained in the NAT table with a specific port (e.g., 10.0.0.2/24:8080 --> 196.68.10.1:3000).
3. The router adds the source MAC (its own MAC address) and the destination MAC (the MAC address of the next-hop router or the ISP's router).
4. The router then sends the packet to the ISP or the next-hop router.

## 4) Destination Server Sends Response

1. The destination server sends a response to the ISP or the next-hop router.

## 5) Router Receives Response

1. The router receives the response and uses NAT to map the source IP and port back to the original internal IP of the device.
2. The router then sends the response to the device's internal IP address.

## 6) Response Process

The response process is not detailed in the selected content. However, typically, upon receiving the response, the device would process the data as needed (e.g., rendering a web page in a browser).

---------------------------------------------------------
   B] With External Network
---------------------------------------------------------
```
1) Device gets IP from Router: ( DHCP )
    Device ( with MAC)---> Router (have Internal + External Ip )
    --> Router assign new Internal Ip to Device by DHCP 
    --> ROuter saves MAC : Internal Ip  - In ARP Table
    --> Router gives Back new Internal IP to device

2) Device request to Router:
    --> find destination IP : DNS
    --> Device (Internal Ip e.x. 10.0.0.2/24:8080)
    --> Making of Packet in device -Transport layer : TCP or UDP [ HTTP + DATA ]
    --> PAcket : adds both source IP and destination- IP : NO MAC 
    --> send packet to Router

3)  Router to Next-Hop Router or ISP
    --> Router decides device in Internal or External Network 
        based on SUBNET Mask
    --> Router uses NAT ( 10.0.0.2/24:8080-->196.68.10.1:3000 ) 
        changes original source IP of packet
    --> to it's Public Ip given by ISP and maintains it 
        in NAT table with specific PORT
    --> Router adds source MAC ( self mac ) and 
        destination MAC ( this is of NEXT-Hop router - ISP's router) 
    --> to ISP/ to other NEXT-HOP Router

4) to Destination 
    --> destination server - Response 
    --> to ISP/ to other NEXT-HOP Router

5) Response
    --> to Router --> NAT to source IP and PORT ( revere mapping )
    --> to internal IP of Device ( from Router )

6) Response Process:
```

