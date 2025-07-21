---
layout: post
title: "How DNS is Resolved in Browser :"
date: 2025-07-21
categories: [networking, 0-browser---md]
tags: [networking]
author: "GGurkhude"
excerpt: "Learning notes on how dns is resolved in browser :"
original_path: "2_Networking/0_browser__.md"
---


### How DNS is Resolved in Browser :
```text
Url --> DNS look up --> 1) DNS cache (browser cache) 
                        2) OS cache

        --> DNS resolver --> DNS server--> browser

        --> TCP connection with server  ( SSl + TLC handshake)--> web server

        --> connection establishes
```
                       