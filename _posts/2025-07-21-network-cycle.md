---
layout: post
title: "Network Cycle"
date: 2025-07-21
categories: [networking, 3-1-2-corrected-network-cycle-md]
tags: [networking]
author: "GGurkhude"
excerpt: "Learning notes on network cycle"
original_path: "2_Networking/3.1.2_corrected_network_cycle.md"
---

# Network Cycle
## HOW WEBSITE is Loaded [Network Part] 
## Device Gets IP

1. Device (MAC) ---> Router (saves MAC with IP) --> DHCP (in router) --> gives new IP to device i.e. Internal IP

## Device to Internet Site

1. Device (Internal IP + MAC) -->
    - Application Layer: [DATA]
    - Transport Layer: [Port+DATA] [Layer_4]
    - Network Layer: [IP+Port+DATA] packet + Internal IP [Layer_3]
    - Link Layer: [MAC+IP+Port+DATA] Frame (contains MAC + External IP of router) [Layer_2]
2. Router (External IP by ISP) --> ISP --> Site's server

## Response from Site

1. Server (ISP IP + External IP of router) 
    - ISP --> Router (ARP to find internal IP associated with MAC from Response)
    - Device (based on Internal IP associated with MAC)

----
## Internal Network (Device to Device)

    - Device --> Searching in ARP for MAC and IP (if no MAC)
    - Decide IP in local Network (using subnet mask along with IP)
    - If yes, create packet (Network layer-3 in device itself)
    - Now find MAC --> if not, ask for MAC by broadcasting to every device to get MAC based on IP --> Update to ARP
    - Create Frame using MAC (link layer-2)
    - Send frame to IP (device)
    - Response from end Device --> replace source IP to destination IP
    - Response complete

----

## With External Network

### 1) Device Gets IP

1. Device (with MAC) ---> Router (have Internal + External IP)
    - Router assign new Internal IP to Device by DHCP
    - Router saves MAC: Internal IP - In ARP Table
    - Router gives back new Internal IP to device

### 2) Device Request to Router

1. Find destination IP: DNS
2. Device (Internal IP e.x. 10.0.0.2/24:8080)
3. Making of Packet in device - Transport layer: TCP or UDP [HTTP + DATA]
4. Packet: adds both source IP and destination IP: NO MAC
5. Send packet to Router

### 3) Router to Next-Hop Router or ISP

1. Router decides device in Internal or External Network based on SUBNET Mask
2. Router uses NAT (10.0.0.2/24:8080 --> 196.68.10.1:3000) changes original source IP of packet
    - To its Public IP given by ISP and maintains it in NAT table with specific PORT
3. Router adds source MAC (self MAC) and destination MAC (this is of NEXT-Hop router - ISP's router)
4. To ISP/ to other NEXT-HOP Router

### 3) To Destination

1. Destination server - Response
2. To ISP/ to other NEXT-HOP Router

### 5) Response

1. To Router --> NAT to source IP and PORT (reverse mapping)
2. To internal IP of Device (from Router)

----

```
1) device gets IP: device (MAC) ---> router (saves MAC with IP) --> DHCP (in router) --> gives new IP to device i.e. Internal IP

2) device to internet site: device (Internal IP + MAC) -->
    --> Application Layer: [DATA]
    --> Transport Layer: [Port+DATA]
    --> Network Layer: [IP+Port+DATA] packet + Internal IP
    --> Link Layer: [MAC+IP+Port+DATA] Frame (contains MAC + External IP of router)
    router (External IP by ISP) --> ISP --> Site's server

3) Response from Site: server (ISP IP + External IP of router) 
    --> ISP --> Router (ARP to find internal IP associated with MAC from Response)
    --> Device (based on Internal IP associated with MAC)

---------------------------------------------------------
    A] Internal Network (device to device)
---------------------------------------------------------

1) Device --> Searching in ARP for MAC and IP (if no MAC)
    --> decide IP in local Network (using subnet mask along with IP)
    --> if yes create packet (Network layer-3 in device itself)
    --> now find MAC --> if not ask for MAC by broadcasting to every device to get MAC based on IP --> Update to ARP
    --> create Frame using MAC (link layer-2)
    --> send frame to IP (device)
    --> Response from end Device --> replace source IP to destination IP
    --> Response complete

---------------------------------------------------------
    B] With External Network
---------------------------------------------------------

1) Device gets IP: (DHCP)
    Device (with MAC) ---> Router (have Internal + External IP)
    --> Router assign new Internal IP to Device by DHCP
    --> Router saves MAC: Internal IP - In ARP Table
    --> Router gives back new Internal IP to device

2) Device request to Router:
    --> find destination IP: DNS
    --> Device (Internal IP e.x. 10.0.0.2/24:8080)
    --> Making of Packet in device - Transport layer: TCP or UDP [HTTP + DATA]
    --> Packet: adds both source IP and destination IP: NO MAC
    --> send packet to Router

3) Router to Next-Hop Router or ISP
    --> Router decides device in Internal or External Network based on SUBNET Mask
    --> Router uses NAT (10.0.0.2/24:8080 --> 196.68.10.1:3000) changes original source IP of packet
    --> to its Public IP given by ISP and maintains it in NAT table with specific PORT
    --> Router adds source MAC (self MAC) and destination MAC (this is of NEXT-Hop router - ISP's router)
    --> to ISP/ to other NEXT-HOP Router

4) to Destination
    --> destination server - Response
    --> to ISP/ to other NEXT-HOP Router

5) Response
    --> to Router --> NAT to source IP and PORT (reverse mapping)
    --> to internal IP of Device (from Router)
```