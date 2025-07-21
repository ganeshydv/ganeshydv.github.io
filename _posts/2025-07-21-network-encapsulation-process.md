---
layout: post
title: "Network Encapsulation Process"
date: 2025-07-21
categories: [system-design, 2--newroking---md]
tags: [networking]
author: "GGurkhude"
excerpt: "Learning notes on network encapsulation process"
original_path: "3_SystemDesign/2__newroking__.md"
---

Data Layer [ Application Layer + Transport Layer ] --> Network Laye [IP added to packet ] --> Data link [Link layer ] : mac added to 


# Network Encapsulation Process

The process of network encapsulation involves several layers of the networking stack. Here's a step-by-step breakdown:

## Data Layer (Application and Transport Layers)

At the higher layers, data is prepared for transmission. This data is organized into segments at the Transport layer. In the case of TCP/IP, these segments may contain both the transport layer headers (TCP or UDP) and the application layer data.

## Network Layer (Internet Layer - IP)

The segments from the Transport layer are then encapsulated into packets at the Network layer. The IP header, containing source and destination IP addresses, is added to each packet. Now, these are IP packets.

## Data Link Layer (Link Layer - Ethernet, for example)

The IP packets are then encapsulated into frames at the Data Link layer. The frame includes the Link Layer header with source and destination MAC addresses, among other information. This frame is what gets transmitted over the local network.

## Router's Role

When the frame reaches a router, the router looks at the destination IP address in the IP header to make a routing decision. If the destination is within the same local network, the router uses ARP to find the MAC address associated with the destination IP address within that network. The router then encapsulates the packet into a new frame with the MAC addresses of the source router interface and the next-hop router interface. The new frame is sent towards the next-hop router.

In summary, encapsulation starts at the higher layers, and as you move down the networking stack, additional headers are added at each layer until you have a complete frame ready for transmission over the physical medium. The specific protocols used for encapsulation can vary, but the general idea is to add the necessary headers at each layer of the protocol stack.
