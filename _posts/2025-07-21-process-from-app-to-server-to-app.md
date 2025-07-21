---
layout: post
title: "Process from app to server to app"
date: 2025-07-21
categories: [networking, 3-2-how-devices-locates-ex-whatsapp-msg--md]
tags: []
author: "GGurkhude"
excerpt: "Learning notes on process from app to server to app"
original_path: "2_Networking/3.2_how_devices_locates_ex_whatsapp_msg_.md"
---

### Process from app to server to app

1) device get's IP: device (MAC)---> router ( saves MAC with IP )--> DHCP (in router )-->gives new IP to device i.e. Internal IP
2) device to internet site :device( Internal IP + MAC) -->( Network layer )  packet + Internal IP --> ( Link layer ) Frame ( contains MAC + External IP of router )  router (External IP by ISP) --> ISP --> Site's server
3) Response from Site : server ( ISP IP + External IP of router ) ---> ISP  --> Router ( ARP to find internal IP associated with MAC from Response )--> Device (based on Internal IP associated with MAC )

# Network Communication Process

## 1) Device Obtains IP from DHCP

1. When a device joins a network, it sends a DHCP (Dynamic Host Configuration Protocol) request to the router.
2. The DHCP server in the router assigns an internal IP address to the device based on its MAC address.
3. The router maintains a DHCP lease table that associates MAC addresses with assigned internal IP addresses.

## 2) Device Communicates with an External Site

1. The device sends a packet to an external site, containing the source IP address (the internal IP assigned by DHCP) and the device's MAC address.
2. The router performs Network Address Translation (NAT), replacing the source IP address with its own external IP address (assigned by the ISP). The MAC address is not changed in this process.
3. The router creates a frame with the device's MAC address as the source MAC and its own external IP address as the source IP, and forwards this frame to the ISP.

## 3) ISP Routes the Packet to the Destination Site

1. The ISP receives the packet, sees the destination IP address (the external IP of the router), and routes it accordingly to reach the destination site's server.

## 4) Response from Site to Device

1. The response from the site's server has a destination IP address set to the external IP address of the router (assigned by the ISP).
2. The ISP routes the response packet to the router based on the destination IP.
3. The router, using its NAT table, determines the internal IP address associated with the original device's MAC address.
4. The router replaces the destination IP address in the packet with the internal IP address and forwards it to the device within the local network.

Note: ARP (Address Resolution Protocol) is typically used within a local network to map an IP address to a MAC address. In the scenario of receiving a response from the internet, the router uses its NAT table to determine the internal IP address associated with the MAC address of the device, and no ARP is involved in this process.
