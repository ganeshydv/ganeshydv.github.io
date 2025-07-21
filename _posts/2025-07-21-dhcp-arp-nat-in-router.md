---
layout: post
title: "DHCP, ARP, NAT in Router"
date: 2025-07-21
categories: [networking, 3-1-dhcp-arp-nat-md]
tags: [networking]
author: "GGurkhude"
excerpt: "Learning notes on dhcp, arp, nat in router"
original_path: "2_Networking/3.1_DHCP_ARP_NAT.md"
---

# DHCP, ARP, NAT in Router

## DHCP: Router Assigns new Internal IPs to Device

The DHCP (Dynamic Host Configuration Protocol) service is typically run by a device on a network called a DHCP server. The DHCP server is responsible for dynamically assigning IP addresses and other network configuration information to devices when they join the network.

Key points about DHCP:

1. **DHCP Server**: The DHCP server can be implemented as a dedicated server on the network or as a feature within network devices like routers and network appliances. In home networks, the router often functions as the DHCP server.
2. **Dynamic Assignment**: When a device connects to the network, it sends a DHCP request to the DHCP server. The DHCP server responds with an available IP address, subnet mask, default gateway, DNS servers, and other configuration parameters.
3. **Lease Duration**: The DHCP server assigns IP addresses for a specific lease duration. After the lease period expires, the device must renew the lease to continue using the same IP address.
4. **Automatic Configuration**: DHCP enables automatic configuration of network parameters, reducing the need for manual configuration on each device.
5. **Network Scalability**: DHCP is particularly useful in larger networks, where managing IP addresses manually for each device would be impractical.

## ARP: Finding MAC in ARP Table in Local Network

The ARP (Address Resolution Protocol) table is used for mapping IP addresses to MAC addresses within a local network. When a device in the local network wants to communicate with another device, it checks its ARP table to see if it already knows the MAC address associated with the destination device's IP address.

Key points about ARP:

1. **ARP Table**: The ARP table is saved on end devices (mobile, PC) and routers.
2. **ARP Request**: If the MAC address is not in the ARP table, the device broadcasts an ARP request to the local network, asking for the MAC address associated with a specific IP address.
3. **ARP Response**: When the device with the matching IP address receives the ARP request, it responds with its MAC address.
4. **ARP Table Update**: The ARP table is then updated with the IP-to-MAC address mapping, and subsequent communications within the local network can use this mapping to directly address devices.

## NAT: Replacing IP + Port for Communication Between Different Networks

The NAT (Network Address Translation) table is used by routers for Network Address Translation. NAT is primarily involved in translating between private/internal IP addresses used within a local network and a single public/external IP address used for communication with external networks, such as the internet.

Key points about NAT:

1. **NAT Table**: The NAT table keeps track of the mapping between internal private IP addresses and their corresponding external public IP addresses. It may also include information about the associated MAC addresses.
2. **NAT Process**: When a device from the local network communicates with an external server, the router performs NAT to replace the source IP address in the packet with its own external IP address.

Example NAT table entries:

- Device A's NAT table entry: (192.168.1.2, 5001) -> (203.0.113.1, 10001)
- Device B's NAT table entry: (192.168.1.3, 5001) -> (203.0.113.1, 10002) <-- Note the unique port (10002)

----------------------------------------------------------
  DHCP : ROUTER Assigns new Internal IPs TO DEVICE
----------------------------------------------------------
### Q1. who runs DHCP? --> EX: routers runs DHCP to assign IP to device

- The DHCP (Dynamic Host Configuration Protocol) service is 
typically run by a device on a network called a DHCP server. 
The DHCP server is responsible for dynamically assigning 
IP addresses and other network configuration information 
to devices (such as computers, smartphones, and other 
network-connected devices) when they join the network.

- The DHCP server manages a pool of available IP addresses 
and leases them to devices on the network for a specific 
period. This dynamic assignment simplifies network 
administration because devices can join and leave the 
network without requiring manual IP address configuration.

#### Here are the key points about DHCP:

1) DHCP Server:
The DHCP server can be implemented as a dedicated server 
on the network or as a feature within network devices 
like routers and network appliances.
In home networks, the router often functions as the DHCP server.

2) Dynamic Assignment:

   - When a device (such as a computer or smartphone) connects to the network, it sends a DHCP request to the DHCP server.
   - The DHCP server responds with an available IP address, subnet mask, default gateway, DNS servers, and other configuration parameters.
3) Lease Duration:
   - The DHCP server assigns IP addresses for a specific lease duration. After the lease period expires, the device must renew the lease to continue using the same IP address.
4) Automatic Configuration:
   - DHCP enables automatic configuration of network parameters, reducing the need for manual configuration on each device.
5) Network Scalability:
   - DHCP is particularly useful in larger networks, where managing IP addresses manually for each device would be impractical.
   
In summary, the DHCP server plays a crucial role in simplifying the management of IP addresses and other network configuration details on a network. It allows for dynamic and automatic assignment of network parameters to devices, making it easier to scale and administer networks of various sizes.

-------------------
     ARP :in LOCAL Network finding MAC in ARP table ( MAC: IP ) [ on end devices mobile + Routers ]
---------------
The ARP (Address Resolution Protocol) table and the NAT (Network Address Translation) table serve different purposes in networking, and they are associated with different functionalities.
```text
ARP: used in local network to find destination device based on MAC --> ARP Table -> IP : MAC 
```
 
### ARP Table: saved on End devices mobile,pc + Routers 
  
- The ARP table is used for mapping IP addresses to MAC addresses within a local network.
- When a device in the local network wants to communicate with another device, it checks its ARP table to see if it already knows the MAC address associated with the destination device's IP address.
- If the MAC address is not in the ARP table, the device broadcasts an ARP request to the local network, asking for the MAC address associated with a specific IP address.
- When the device with the matching IP address receives the ARP request, it responds with its MAC address.
- The ARP table is then updated with the IP-to-MAC address mapping, and subsequent communications within the local network can use this mapping to directly address devices.
NAT Table:

--------------------
     NAT : replacing IP + PORT for communcation between different networks only
--------------------

### NAT: used when communication is between different network

- The NAT table is used by routers for Network Address Translation.
- NAT is primarily involved in translating between private/internal IP addresses used within a local network and a single public/external IP address used for communication with external networks, such as the internet.
- The NAT table keeps track of the mapping between internal private IP addresses and their corresponding external public IP addresses. It may also include information about the associated MAC addresses.
- When a device from the local network communicates with an external server, the router performs NAT to replace the source IP address in the packet with its own external IP address.
- In summary, the ARP table maps IP addresses to MAC addresses within a local network, facilitating local communication. On the other hand, the NAT table maps private internal IP addresses to a single external IP address for communication with external networks, helping conserve public IP addresses and enabling multiple devices within a local network to share a single external IP address. While both tables involve address mapping, they serve different purposes in the context of local network communication and external network communication, respectively.


### Assume the following:

Device A initiates communication and gets assigned external port 10001.
Device B initiates communication simultaneously and also gets assigned external port 10001.
Now, the NAT table entries would look like this:
```text
Device A's NAT table entry: (192.168.1.2, 5001) -> (203.0.113.1, 10001)
Device B's NAT table entry: (192.168.1.3, 5001) -> (203.0.113.1, 10002) <-- Note the unique port (10002)
```
--------------------------------------------------------