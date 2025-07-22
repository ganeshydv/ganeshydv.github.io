---
layout: post
title: "System Design & Architecture Guide"
categories: ["System Design & Architecture", "Distributed Systems"]
tags: [distributed-systems, complete-guide]
date: 2025-07-22
author: "GGurkhude"
description: "Comprehensive system design guide covering scalability, consistency, CAP theorem, and architecture patterns"
toc: true
---

# System Design & Architecture Guide

Comprehensive system design guide covering scalability, consistency, CAP theorem, and architecture patterns

## 📚 Table of Contents


- [**1.** Deployment Strategies](#section-1)
- [**1.** Newroking](#section-1)

- [**2.** Newroking](#section-2)
- [**2.** Rate Limiting](#section-2)

- [**3.** Upload Site To S3](#section-3)
- [**999.** Cloud Server](#section-999)
- [**999.** How Request Works Dns](#section-999)
- [**999.** Readme](#section-999)
- [**999.** Solid](#section-999)
- [**999.** Sso](#section-999)
- [**999.** Topics](#section-999)
- [**999.** Proxy Reverseproxy](#section-999)
- [**999.** Tls Handshake](#section-999)
  - [**0.** Analysis](#section-0)
  - [**0.** Acid 0](#section-0)
  - [**0.** Cap 0](#section-0)
  - [**0.** Cap Ap 0](#section-0)
  - [**0.** Cap Cp 0](#section-0)
  - [**1.** Requirement](#section-1)
  - [**1.** Sharding](#section-1)
  - [**1.** Acid 1](#section-1)
  - [**1.** Cap Ap 1](#section-1)
  - [**1.** Cognito 1 Sign Up](#section-1)
  - [**2.** Consistent Hashing](#section-2)
  - [**2.** Acid 2 Isolation Levels 1](#section-2)
  - [**2.** Acid 2 I Lock 1](#section-2)
  - [**2.** Acid 2 I Lock 2](#section-2)
  - [**2.** Cognito 2 Sing In](#section-2)
  - [**2-1.** Cognito 2.1 Sign In](#section-2-1)
  - [**3.** Chainofresponsibiltypattern Logging](#section-3)
  - [**999.** Cap Cp Vs Ap](#section-999)
  - [**999.** Cap Theorem](#section-999)
  - [**999.** Stock Market Design](#section-999)
  - [**999.** Index](#section-999)
  - [**999.** Overview](#section-999)
  - [**999.** Cognito](#section-999)
  - [**999.** Jwks](#section-999)
    - [**0.** Vdo Upload](#section-0)
    - [**1.** Vdo Large File Upload S3 Presigned](#section-1)
    - [**2.** Vdo Large File Upload S3 Lambda](#section-2)
    - [**999.** Sns Push Notifications](#section-999)
    - [**999.** Spotify Design](#section-999)
    - [**999.** Design](#section-999)
      - [**999.** Patterns](#section-999)

---



## 1. Deployment Strategies {#section-1}

*📖 [← Back to Table of Contents](#-table-of-contents)*

# Deployment Strategies

There are six general ways to deploy applications:

1. **Recreate**: This strategy involves removing the current deployment (A) and replacing it with a new deployment (B). The process is as follows:
   - Remove A
   - Deploy B
   - Forward traffic to B

2. **Ramped**: This strategy involves replacing instances of the current deployment (A) with instances of the new deployment (B) step by step. The process is as follows:
   - Start deploying B (not complete)
   - Replace instances of A with B (step by step)
   - Once B is fully deployed, remove A

3. **Blue-Green**: This strategy involves deploying the new version (B) alongside the current version (A), and then replacing A with B once B has been tested. The process is as follows:
   - Deploy B (A is still in use)
   - Forward traffic to B
   - Remove A

4. **Canary**: This strategy involves gradually shifting traffic from the current version (A) to the new version (B). The process is as follows:
   - Deploy both A and B
   - Gradually shift traffic to B
   - Once all traffic is on B, remove A

5. **A/B Testing**: This strategy involves shifting a specific group of users to the new version (B). This technique is widely used to test the conversion of a given feature and only roll out the version that converts the most. The process is as follows:
   - Deploy both A and B
   - Shift users based on certain parameters (e.g., device type, browser type, location, etc.)
   - Conditions that can be used to distribute traffic amongst the versions include:
     - Browser cookie
     - Query parameters
     - Geolocation
     - Technology support (e.g., browser version, screen size, operating system, etc.)
     - Language

6. **Shadow**: This strategy involves deploying the new version (B) alongside the current version (A), but only sending live traffic to A. B receives the same requests as A but doesn't return responses to the users. This allows you to test B with real data without affecting the user experience.

==============================================================
General 6 Ways:

1) Recreate : replace at once : Remove A --> Deploy B : Replace A by B
        : Remove A --> Deploy B --> forward to B
2) Ramped : Replace step by step :
        Replace Insatnce of A not complete A by instance of B : after each instance replaced Remove A
        : B deployment in Process (not complete)--> instance of A replaced by B ( Step by step )--> B complete --> Remove A
3) Blue-Green : Tested --> B Deployed along side A then A will be Replaced
        : B is deployed [ A is still in use ] --> forward to B -->  Remove A
4) Canary : shift traffic gradually from A to B
        : both complete Deployed --> shift traffic gradually to B --> complete traffic to B --> Remove A 

5) A/B testing: shift specific group of user to B  ( Netflix uses this)
        : users are shifted based on some params Ex device type, browser type, locations etc
        : both A and B up 

        [This technique is widely used to test conversion of a given feature and only roll-out the version that converts the most.
        
        Here is a list of conditions that can be used to distribute traffic amongst the versions:
        
        By browser cookie
        Query parameters
        Geolocalisation
        Technology support: browser version, screen size, operating system, etc.
        Language]

6) Shadow :

---

## 1. Newroking {#section-1}

*📖 [← Back to Table of Contents](#-table-of-contents)*

# Network Communication Process

The process of network communication, whether within a Local Area Network (LAN) or across the internet, involves several steps:

## Communication within LAN

1. **Device Communication**: When a device in the LAN wants to communicate with another device within the same network, it checks whether the destination IP address is within the LAN.

2. **Address Resolution Protocol (ARP)**: If the destination is within the LAN, the device uses ARP to find the MAC address corresponding to the destination IP address. This mapping allows direct communication within the LAN.

## Routing to External Network

1. **Default Gateway**: If the destination is outside the LAN, the device sends the packet to its default gateway, usually a router.

2. **Router's Role**: The router examines the destination IP address and makes a routing decision. It encapsulates the packet in a new Ethernet frame with the source MAC address of the sending device and the destination MAC address of the router's interface connected to the LAN.

3. **Packet Forwarding**: The router receives the packet, updates the source MAC address with its own interface's MAC address, and forwards the packet towards its destination based on its routing table.

## Internet Routing

1. **Routing Decisions**: The packet traverses the Internet, with routers along the way making routing decisions based on the destination IP address.

2. **MAC Address Update**: At each hop, the MAC addresses within the Ethernet frame are updated, but the IP addresses remain constant.

## Final Destination Network

1. **ARP in Destination Network**: When the packet reaches the destination network (e.g., the network of a web server), the final router in that network uses ARP to determine the MAC address associated with the destination IP address within its local network.

2. **Delivery to Destination Device**: The packet is delivered to the destination device within its local network based on the mapping between IP and MAC addresses.

In summary, the process involves checking whether the destination is within the local network. If it is, ARP is used to find the MAC address for direct communication. If the destination is outside the local network, the packet is sent to the router, which encapsulates the packet and forwards it based on IP addresses across the Internet. At each hop, MAC addresses are updated within the Ethernet frame, while IP addresses remain constant for routing decisions.

```
Yes, you've captured the process correctly. Let's break down the steps:

Request within Local Network (LAN):

When a device in the local network wants to communicate with another 
device within the same network, it checks whether the destination IP 
address is within the local network.
If the destination is within the local network, the device may use 
ARP (Address Resolution Protocol) to find the MAC address corresponding 
to the destination IP address. This mapping allows direct communication 
within the LAN.

Routing to External Network (Internet):

If the destination is outside the local network, the device sends 
the packet to its default gateway (usually a router).
The router examines the destination IP address and makes a routing 
decision. It encapsulates the packet in a new Ethernet frame with 
the source MAC address of the sending device and the destination 
MAC address of the router's interface connected to the local network.
Router's Role:

The router receives the packet, updates the source MAC address with 
its own interface's MAC address, and forwards the packet towards 
its destination based on its routing table.


Internet Routing:

The packet traverses the Internet, with routers along the way 
making routing decisions based on the destination IP address.
At each hop, the MAC addresses within the Ethernet frame are 
updated, but the IP addresses remain constant.

Final Destination Network:

When the packet reaches the destination network 
(e.g., the network of a web server), the final router in 
that network uses ARP to determine the MAC address associated
with the destination IP address within its local network.
Delivery to Destination Device:

The packet is delivered to the destination device within its 
local network based on the mapping between IP and MAC addresses.
In summary, the process involves checking whether the 
destination is within the local network. If it is, ARP is 
used to find the MAC address for direct communication. If 
the destination is outside the local network, the packet is 
sent to the router, which encapsulates the packet and forwards 
it based on IP addresses across the Internet. At each hop, MAC 
addresses are updated within the Ethernet frame, while IP 
addresses remain constant for routing decisions.
```

---

## 2. Newroking {#section-2}

*📖 [← Back to Table of Contents](#-table-of-contents)*

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

---

## 2. Rate Limiting {#section-2}

*📖 [← Back to Table of Contents](#-table-of-contents)*

# Rate Limiting:

## 1. Fixed window : time period and request count based

- user can make requests between some fixed interval of time
  for max limit specified

## 2. Token Bucket :

- Burst
- sustain : rate in which req is hitting in time interval
- working:
  The Token Bucket algorithm is a popular method for rate limiting in computer networks and distributed systems. It allows you to control the rate at which requests are processed or transmitted.

The concept behind the Token Bucket algorithm is similar to a physical bucket that holds tokens. Each token represents the permission to perform a specific action, such as making a request or sending data. The bucket has a maximum capacity, which determines the maximum burst rate or the number of requests that can be processed in a short period of time.

Here's how the Token Bucket algorithm works:
- **Burst**: The bucket initially starts with a certain number of tokens, known as the burst capacity. This allows for a burst of requests to be processed immediately without any delay.

- **Sustain**: After the initial burst, the bucket refills tokens at a fixed rate, known as the sustain rate. This rate determines the number of tokens added to the bucket per unit of time.

- **Request Processing**: When a request arrives, the algorithm checks if there are enough tokens in the bucket. If there are sufficient tokens, the request is processed, and a token is consumed from the bucket. If there are not enough tokens, the request is either delayed or rejected, depending on the implementation.

- T**oken Refill**: The bucket continues to refill tokens at the sustain rate over time. If the bucket is already full, no additional tokens are added.

The Token Bucket algorithm provides a flexible way to control the rate of requests by adjusting the burst capacity and sustain rate. It allows for bursts of requests to be handled quickly while maintaining a sustainable rate of processing over time.
In the context of rate limiting, the Token Bucket algorithm can be used to enforce limits on the number of requests that can be made within a specific time interval. By regulating the rate at which tokens are consumed, you can prevent excessive usage and protect your system from being overwhelmed.

---

## 3. Upload Site To S3 {#section-3}

*📖 [← Back to Table of Contents](#-table-of-contents)*

1. Create bucket
2. enable static hosting
3. give public access
4. add bucket policy to give read access (403 will be resolved):
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::Bucket-Name/*"
            ]
        }
    ]
}
```
4. 404 not found: uplaod content

---

## 999. Cloud Server {#section-999}

## in cloud computing:

- 1 vCPU = 1 thread
- 2 vCPUs = 1 core (if Hyper-Threading is enabled).

---

## 999. How Request Works Dns {#section-999}

The process of a browser making a request and establishing a connection with a server can be broken down into the following steps:

1. **URL**: The process begins with the URL of the website you want to visit.
2. **DNS Lookup**: The browser performs a DNS lookup to convert the domain name into an IP address. This involves several steps:
   - Checking the DNS cache in the browser.
   - If not found in the browser cache, checking the OS cache.
   - If not found in the OS cache, making a request to the DNS resolver.
   - The DNS resolver then makes a request to the DNS server.
3. **TCP Connection**: Once the IP address is known, the browser establishes a TCP connection with the server. This involves an SSL and TLS handshake.
4. **Connection Established**: After the handshake is successful, the connection is established and the browser can start sending requests to the web server.

##
```
     Url --> DNS look up --> 1) DNS cache (browser cache) 
                             2) OS cache
        --> DNS resolver --> DNS server--> browser
        --> TCP connection with server  ( SSl + TLC handshake)--> web server
        --> connection establishes
```


# DNS Lookup Process

The process of a browser performing a DNS lookup to resolve a domain name into an IP address can be broken down into the following steps:

1. **Local DNS Cache**: The browser first checks if the IP address for the site is present in the local DNS cache.
   - If the IP address is found, the browser sends a direct request to that IP address.

2. **OS DNS Cache**: If the IP address is not found in the local DNS cache, the browser checks the OS DNS cache.

3. **OS DNS Resolver**: If the IP address is not found in the OS DNS cache, the browser uses the OS DNS resolver. The resolver goes through the following steps:
   - Contacts the Root server to determine the high-level domain.
   - Contacts the high-level domain server to determine the DNS server.
   - Contacts the DNS server to determine the IP address of the domain (i.e., the site).

4. **Send Request**: Once the IP address is known, the DNS resolver sends a request to the browser.

##
steps:
```
1) browser check's if site IP is present in
     ---> local DNS cache ( in browser)
    if (yes)==> send direct request to that IP

2) --> OS DNS cache    ( In OS )
3) --> OS DNS Resolver ( In OS ) --> 
   1) Root server ( determines high level domain )
   2) HLD domain server ( determines DNS server )
   3) DNS server ( determines IP of domain i.e. site)
4) --> DNS Resolver --> send request Browser 
```

---

## 999. Readme {#section-999}

# Project Shortcuts

## Folders
- [System Design](./3_SystemDesign/LLD/)
- [Node_Async_Event Folder](../Node_Async_Event)

## Files
- [Example File](../Practice/Node_Async_Event/example.js)
- [Readme File](./Readme.md)

---

## 999. Solid {#section-999}

## 1. Single Responsibility Principle
- **Definition**: A class should have one, and only one, reason to change. In other words, a class should have only one responsibility or job.

- **Key Idea**:
   - Each class should focus on doing one thing well, which makes the class more focused and easier to maintain. If a class has multiple responsibilities, changes in one responsibility could affect others, leading to a fragile design.

- **Example**:
 Consider a class that handles both user authentication and email notifications. If the email logic changes, you might need to modify this class, even though it’s also responsible for authentication. This violates the SRP. The solution is to split these into two classes: one for authentication and another for sending emails.
 ```java
 // Violation of SRP: Handles both user login and sending email
class UserService {
    login(user: User) {
        // Login logic
    }
    
    sendWelcomeEmail(user: User) {
        // Email logic
    }
}

// Refactor to follow SRP
class AuthenticationService {
    login(user: User) {
        // Login logic
    }
}

class EmailService {
    sendWelcomeEmail(user: User) {
        // Email logic
    }
}
```
## 2. O – Open/Closed Principle (OCP)

- **Definition**: Software entities (classes, modules, functions) should be open for extension but closed for modification.

- **Key Idea**:
You should be able to extend a class's behavior without modifying its existing code. This helps avoid introducing bugs in already working code. The common solution is to use polymorphism or interfaces to make code extensible.

- **Example**:
Imagine you have a class that calculates area for various shapes, but every time you add a new shape, you have to modify the class. This violates the OCP. Instead, you can define an interface that each shape implements, allowing you to extend behavior by adding new shapes without modifying existing code.
```java
// Violation of OCP: Modification is required to add new shapes
class AreaCalculator {
    calculateArea(shape: any) {
        if (shape.type === 'circle') {
            return Math.PI * shape.radius ** 2;
        } else if (shape.type === 'square') {
            return shape.side * shape.side;
        }
    }
}

// Refactor to follow OCP
interface Shape {
    calculateArea(): number;
}

class Circle implements Shape {
    constructor(public radius: number) {}
    calculateArea() {
        return Math.PI * this.radius ** 2;
    }
}

class Square implements Shape {
    constructor(public side: number) {}
    calculateArea() {
        return this.side * this.side;
    }
}

class AreaCalculator {
    calculateArea(shape: Shape) {
        return shape.calculateArea();
    }
}
```
## 3. L – Liskov Substitution Principle (LSP)

- **Definition**: Subtypes must be substitutable for their base types without altering the correctness of the program. In simpler terms, derived classes should extend base classes without changing their behavior in unexpected ways.

- **Key Idea**:
When you replace an object of a base class with an object of a derived class, the program should still behave correctly. Violating LSP leads to inheritance that does not work well with polymorphism.

- **Example**:
Imagine you have a class Bird with a method fly(), and you create a subclass Penguin. Penguins can’t fly, so adding a fly() method for Penguin would violate LSP because Penguin doesn’t behave like a typical bird. Instead, you could refactor by separating flying birds from non-flying birds.
```java
// Violation of LSP: Penguin cannot fly
class Bird {
    fly() {
        console.log("Flying");
    }
}

class Penguin extends Bird {
    fly() {
        throw new Error("Penguins can't fly");
    }
}

// Refactor to follow LSP
interface Bird {
    makeSound(): void;
}

interface FlyingBird extends Bird {
    fly(): void;
}

class Sparrow implements FlyingBird {
    fly() {
        console.log("Flying");
    }
    makeSound() {
        console.log("Chirp");
    }
}

class Penguin implements Bird {
    makeSound() {
        console.log("Honk");
    }
}
```
## 4. I – Interface Segregation Principle (ISP)
- **Definition**: Clients should not be forced to depend on methods they do not use. In other words, create small, specific interfaces rather than a large, general-purpose one.

- **Key Idea**:
Instead of creating one large interface that tries to cover all possible behaviors, split it into smaller, more focused interfaces. This allows classes to only implement what they actually need, reducing the chance of implementing unnecessary methods.

- **Example**:
If you have a Machine interface that includes methods like print(), scan(), and fax(), a class that only implements a printer shouldn't have to implement methods like scan() or fax(). This would violate ISP.

```java
// Violation of ISP: Printer has to implement unused methods
interface Machine {
    print(): void;
    scan(): void;
    fax(): void;
}

class Printer implements Machine {
    print() {
        console.log("Printing...");
    }
    scan() {
        // Not needed
    }
    fax() {
        // Not needed
    }
}

// Refactor to follow ISP
interface Printer {
    print(): void;
}

interface Scanner {
    scan(): void;
}

interface FaxMachine {
    fax(): void;
}

class BasicPrinter implements Printer {
    print() {
        console.log("Printing...");
    }
}
```
## 5. D – Dependency Inversion Principle (DIP)
- **Definition**: High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces). Additionally, abstractions should not depend on details; details should depend on abstractions.

- **Key Idea**:
Instead of having higher-level components depend directly on low-level components (which can make the code brittle and hard to change), both should depend on abstractions (like interfaces or abstract classes). This decouples components and makes it easier to swap out implementations.

- **Example**:
If a UserService directly depends on a MySQLDatabase, any change in the database layer will require changes in the UserService. By introducing an abstraction, such as DatabaseInterface, we can decouple the service from the concrete database implementation.
```java
// Violation of DIP: High-level module directly depends on low-level module
class MySQLDatabase {
    getData() {
        return "data from MySQL";
    }
}

class UserService {
    db: MySQLDatabase;
    
    constructor() {
        this.db = new MySQLDatabase();
    }
    
    getUserData() {
        return this.db.getData();
    }
}

// Refactor to follow DIP
interface Database {
    getData(): string;
}

class MySQLDatabase implements Database {
    getData() {
        return "data from MySQL";
    }
}

class MongoDBDatabase implements Database {
    getData() {
        return "data from MongoDB";
    }
}

class UserService {
    db: Database;
    
    constructor(db: Database) {
        this.db = db;
    }
    
    getUserData() {
        return this.db.getData();
    }
}
```

---

## 999. Sso {#section-999}

## SSO

---

## 999. Topics {#section-999}

# 1. Docker
# 2. Networking
# 3. AWS Services
# 4. DB
# 5. OS

---

## 999. Proxy Reverseproxy {#section-999}

Proxy : client don't know where req is sent
ReverseProxy :server don't know where data is being sent

proxy can revere proxy : service mesh

Proxy VS VPN

VPN only know IP 
Proxy may know data

---

## 999. Tls Handshake {#section-999}

# Transport Layer Security (TLS)

## What is TLS and its Significance

Transport Layer Security (TLS) is a cryptographic protocol used to secure communication over a computer network, most commonly the internet. It is the successor to SSL (Secure Sockets Layer) and is designed to provide secure and private communication between two parties, typically a client (e.g., a web browser) and a server (e.g., a website).

The significance of TLS lies in its ability to ensure three primary security goals:

1. **Encryption**: TLS encrypts the data exchanged between the client and server, making it unreadable to anyone intercepting the communication. This prevents unauthorized parties from understanding the sensitive information being transmitted, such as passwords, credit card numbers, and personal data.

2. **Authentication**: TLS provides a way for the client and server to verify each other's identities. This prevents man-in-the-middle attacks, where an attacker could intercept the communication and impersonate one of the parties to gain access to sensitive information.

3. **Data Integrity**: TLS ensures that the data sent between the client and server remains unchanged during transmission. It uses message authentication codes (MACs) or cryptographic hash functions to verify that the data has not been tampered with while in transit.

TLS is widely used, especially in web browsing. When you see "https://" in the URL of a website, it indicates that TLS is being used to secure the connection between your web browser and the website's server. Additionally, many other applications and protocols, such as email (SMTP, IMAP), instant messaging (XMPP), and virtual private networks (VPNs), also rely on TLS to protect data during transmission.

The adoption of TLS has significantly enhanced the security of online communication, helping to protect sensitive data and maintain user privacy. It has become an essential part of modern internet security and is continuously being updated to address emerging threats and vulnerabilities.

## How TLS Works

Transport Layer Security (TLS) works through a series of steps, commonly known as the TLS handshake. This handshake process occurs when a client (e.g., a web browser) initiates a connection to a server (e.g., a website). Let's go through the steps of how TLS works:

1. **Client Hello**: The TLS handshake begins with the client sending a "Client Hello" message to the server. This message includes information about the TLS version supported by the client, a random number (called the "Client Random"), and a list of cryptographic algorithms and parameters that the client can use.

2. **Server Hello**: Upon receiving the Client Hello message, the server responds with a "Server Hello" message. The server selects the highest TLS version that both the client and server support. It generates a random number (called the "Server Random") and selects a set of cryptographic algorithms and parameters to be used for the secure connection.

3. **Server Certificate**: The server sends its digital certificate to the client. This certificate contains the server's public key and is signed by a trusted Certificate Authority (CA). The client will use this certificate to verify the server's identity.

4. **Key Exchange**: The client generates a pre-master secret, encrypts it with the server's public key (from the certificate), and sends it back to the server. This step ensures that only the server, with its corresponding private key, can decrypt the pre-master secret.

5. **Session Key Derivation**: Both the client and the server use the Client Random, Server Random, and pre-master secret to independently derive a "session key." This session key will be used for encryption and decryption during the secure session.

6. **Authentication and Key Exchange**: The client also sends its digital certificate to the server if the server requires client authentication. The server verifies the client's identity using the client's certificate.

7. **Cipher Suite Confirmation**: The client sends a message to the server, indicating the cipher suite it has selected based on the server's list of supported algorithms. This confirms the encryption algorithm and other parameters to be used for the secure connection.

8. **Finished Messages**: To finalize the handshake, both the client and server send "Finished" messages, which are encrypted and include a hash of all the previous handshake messages. This step ensures the integrity of the handshake process and verifies that both parties can successfully encrypt and decrypt messages using the agreed-upon session key.

Once the TLS handshake is completed successfully, the client and server enter a secure connection state, and they can exchange data securely using the session key derived during the handshake. The data sent and received during this secure connection is encrypted, authenticated, and protected from tampering, providing confidentiality and integrity for the communication.

```
1. Client ----> [Client Hello] ----> Server
   - The client initiates the handshake by sending a "Client Hello" message. This message includes:
     - Supported cryptographic algorithms (cipher suites)
     - Supported TLS version
     - Random number (for session key generation)
     - Optional: Client-side data like session ID for resuming past sessions

2. Server <---- [Server Hello] <---- Client
   - The server responds with a "Server Hello" message, which contains:
     - The chosen cryptographic algorithm from the client's list
     - Server's SSL/TLS certificate (includes the server's public key)
     - Server's random number
     - Optional: Session ID, if the session is being resumed

3. Server ----> [Server Certificate] ----> Client
   - The server sends its digital certificate, which includes the public key, to verify its identity. The client uses this key to encrypt the next step.
   
4. (Optional) Server ----> [Server Key Exchange] ----> Client
   - In some cases, the server sends additional key information (such as when using Diffie-Hellman key exchange) if more key material is required.

5. Server ----> [Server Hello Done] ----> Client
   - The server indicates it has completed its part of the handshake process with this message.

6. Client ----> [Client Key Exchange] ----> Server
   - The client generates a **pre-master secret**, encrypts it with the server's public key (received in the certificate), and sends it to the server.

7. (Both Client and Server) ----> [Change Cipher Spec] ----> (Both)
   - Both the client and server send a "Change Cipher Spec" message, which indicates that future messages will be encrypted with the session keys (derived from the pre-master secret and the random values exchanged earlier).

8. Client ----> [Finished] ----> Server
   - The client sends a "Finished" message, encrypted with the session key. It includes a hash of all the previous messages exchanged to ensure integrity.

9. Server ----> [Finished] ----> Client
   - The server responds with its own "Finished" message, also encrypted with the session key and including a hash of the previous exchanges.

At this point, the TLS handshake is complete, and both parties now communicate using **encrypted messages** with the agreed-upon encryption method.

```

---

### 0. Analysis {#section-0}

> **📁 Topic: BatchProcessing**

## What needs to process? - object, system analysis
- total objects : ?
- Size of each object: ?
- System Consumption[CPU/RAM] to process different Objects: ?
- If Lambda used then find timeout limit for max objects and for single object it's behaviour

- > QUEUE: 
   - Is used find it's max capacity that system can handle
   1. Size: limit
   1. Time: limit fot that size 
   1. Retry Mechanism
   1. Error Handling for particular cases
   1. TimeOut: for how long lamda function should run- max 15 min - 900s
   1. Batch Size? : no of itams to process at one time from queue
   1. Reserved concurrency?: how many labda should run in parallel
   1. Visibility TimeOut: for how long msg should disappear: should be maxmium than total time lambda takes to process iteam 
   1. maximum Batching window: Wait time before invoking lamda
       1. BatchSize: size of queue
       2. maximumBatchingWindow: time to wait for total items of batchSize to be in SQS
- > RDS [SQL]:
    1. Connection limits
    2. Effect on shards if sharding is done
    3. Table Size :
    4. Query time 
    5. Row Size to find max response size and find time for response
- > DynamoDB: 
    1. Size: limit 
    2. Connection: Limit 
- > Lambda:
    1. reservedConcurrency: how many lambdas in parallel
    2. timeout: one lamda will execute for this time max: 15min -900s
    2. Lambda processing limit : size

- > Concurrency: if processing elements in parallel then System may exhaust
    1. DB max connection reached
    2. Server limit - CPU/RAM
    3. Lambda may timeout
    4. SQS - iteams might not be processed

- > Analysis of each Service 
  - How can find limit of RDS/Lambda/SQS?
  - How cost is going to increase?

---

### 0. Acid 0 {#section-0}

> **📁 Topic: DB**

## ACID
- Transaction = Query
### 1. Automicity: All or nothing
- If one Transaction is running 2 or more queries then if later any query fails it should rollback so there is No transaction
### 2. Consistency: before and after transaction (Query) data should be consistent
- If table has constraints or updating one table should lead to change in another then this process should be complete else inconsistent data will be generated.
### 3. Isolation:  One Row can be accessed by only one transaction at a time.
- If 2 transactions wants to access same row or waiting to acess one row after another but that row is being locked by another transaction this will create `DEADLOCK`.
- 
### 4. Durability: After Commit if DB fails still after restart data should be recovered

---

### 0. Cap 0 {#section-0}

> **📁 Topic: DB**

## 💡 Note on SQL Databases
- `Traditional SQL databases (PostgreSQL, MySQL) are not distributed by default, so CAP doesn’t apply directly.`

## CAP


| Letter | Stands For              | Meaning                                                                         |
| ------ | ----------------------- | ------------------------------------------------------------------------------- |
| C      | **Consistency**         | All nodes see the same data at the same time                                    |
| A      | **Availability**        | Every request receives a response (success or failure) — no timeouts            |
| P      | **Partition Tolerance** | The system continues to operate even if there’s a network failure between nodes |


## 📌 You must tolerate network partition in distributed systems (P is a given)
So you choose between:
- C + P: Strong consistency, but maybe temporarily unavailable
- A + P: Always responds, but may serve stale data (eventual consistency)


## 🔁 Real-World Analogy
Imagine 3 friends sharing a Google Sheet from different cities.
Now network between them breaks (Partition happens).
### You can now:

- `❌ Block everyone from editing (for consistency)`
- `✅ Allow everyone to edit independently (but with potential conflicts)`. Needs  to resolve leter (like find last updated and keep that one in Primary Write DB)
- `✅ Accept network is broken, but ensure either consistent or available behavior` - means N1,N2 are not connected anymore so It's they will not be updated as soons as data is updated in Write DB. This will make data stale. 

> You can’t have all 3 perfectly at once.

## 📊 Breakdown of CAP Combinations
| Combo  | Behavior                                                                | Example Systems                          |
| ------ | ----------------------------------------------------------------------- | ---------------------------------------- |
| **CP** | Strong consistency, tolerates partitions, but may become unavailable    | MongoDB (in CP config), HBase, Bigtable  |
| **AP** | High availability, tolerates partitions, but eventual/stale data        | Cassandra, DynamoDB, Couchbase           |
| **CA** | Consistent and Available, but not partition-tolerant (only theoretical) | Not possible in real distributed systems |


----
## 📦 Developer Takeaway
| Scenario                                   | Suggestion                      |
| ------------------------------------------ | ------------------------------- |
| ✅ Banking, orders, payments                | CP (use RDS, PostgreSQL, etc.)  |
| ✅ Analytics, user logs, feeds              | AP (DynamoDB, Cassandra)        |
| ✅ Real-time apps with flexible consistency | Hybrid (Cassandra, Redis, etc.) |

---

### 0. Cap Ap 0 {#section-0}

> **📁 Topic: DB**

## ✅ What is Partition Tolerance?
- The system continues to operate even if network partitions occur (i.e., nodes cannot talk to each other).
- Example:
   - Imagine your DB is replicated across:
     - 🇮🇳 Mumbai (primary)
     - 🇺🇸 US East (replica)
     - 🇩🇪 Europe (replica)
    - Now Mumbai ↔ US/EU connection breaks.
Your system is now partitioned.

## 🔹 AP Systems (Availability First)
- `All nodes can accept writes`
- Replication is `asynchronous`
- `Conflict resolution` happens later
- Tradeoff: ✅ Always up, ❌ Temporary inconsistency
- ✅ Always responds - No Error
- ❌ You might get stale or conflicting data
- ❌ May not give latest data



## ❓ Your Core Doubt:
### If the nodes can’t talk, how can they be consistent?
### Exactly. They can’t.
That’s why you must choose between:
1. Consistency (CP):
    - `Refuse` to serve data from disconnected nodes
    - `Return an error or make user wait`
    - Wait for partition to heal

2. Availability (AP):
   - `Allow` disconnected replicas to respond
   - But data may be stale
   - Use techniques like eventual consistency

## ✅ Final Answer to Your Doubt
### Can a system ensure consistency if there's no network?

- `No` — not immediately.
- But:
  - A CP system will not allow writes on isolated replicas — so it preserves consistency by giving up availability.
  - An AP system will allow writes, and repair data later (eventual consistency).

## 🧠 Partition Tolerance Doesn’t Mean “Every Node Must Respond”
This is a common confusion. In CAP:
- Partition Tolerance = The system as a whole continues to operate, not every single node.
- So if:
  - Some nodes are unreachable, and
  - The system can still serve reads/writes safely (according to its CAP tradeoff)
- Then it's partition-tolerant.

---

### 0. Cap Cp 0 {#section-0}

> **📁 Topic: DB**

## How Consistency is managed? (CP system)
- `All clients see the same data, even if they connect to different nodes.`
- In CP system there will be Only one main write node and other will be read replicas.
- EX. N0 (primary DB) Write, N1 (Region 1), N2 (Region 2) wi

## ✅ In CP (Consistency + Partition Tolerance) systems:
- ⚠️ There is only one writable replica at a time
- ❌ Multiple nodes are not allowed to write simultaneously

This is how strong consistency is enforced.

## 🔹 CP Systems (Consistency First)
- Only one writable node (e.g., MongoDB primary, PostgreSQL primary)
- Replicas are read-only
- If partition happens:
  - Writes are blocked until majority is reachable
  - No split-brain (no conflicting writes)
- Tradeoff: ✅ Safe data, ❌ less availability
- ✅ Strong consistency
- ❌ Might `return error during network partition`

## ✅ Real Example 2: MongoDB (CP)
- Prioritizes consistency: writes go to the primary, secondaries sync afterward
- If primary goes down, write may fail during failover (i.e., system becomes temporarily unavailable)
- ### Why CP?
  - Avoids inconsistent writes
  - Accepts short unavailability during failover

---

### 1. Requirement {#section-1}

> **📁 Topic: BatchProcessing**

# Objective: Design Course assignment System
- In this there will be muliple owner account and each owener will have muliple students
- account 1 : [user_1,user_2,...,user_n]
- account 2 : [user_1,user_2,...,user_m]
- account N : [user_1,user_2,...,user_k]
## Requirement:
- Accounts: 1000
- Students: 1000/Account
- max coures/student:? 32
- Total: 1k x 1k = 10^6 = 1M

## Connection Limits:
### RDS:
- No of Connections per instance:
- No of IO per sec for instance:
- Max Read per sec with max data size:
- Max write per sec with max data size:
- Size Limit:
- 
#

---

### 1. Sharding {#section-1}

> **📁 Topic: DB**

# SHARDING : to Optimize
  - Dividing DB

# Options : 
  1. Scale UP H/W - increases cost/effectiveness
  2. Add replicas : 
     - make copy of DB - Master --> Read replicas
     - Problems : when master is updated asyc read db is also updated 
       but it's async so it creates time delay which causes problem in consistency.    
     - Write Event : first to master then to Read Replicas but in this process if Read is done before update then it's not consistent
  3. Sharding : 
     - seperate data in different dbs
     - S1, S2, S3 : different DBS so running on Different Machines have different master
      - How Spereate Data ?
        - based on KEY --> HASH Function : to decide from which Shard DB to get data
     - Ex. instead of storing usr data in single db, divide it and store in 2 dbs
       - but how to decide which db stores user data - hash functions or simple another layer which helps in deciding db
     - PROS: 
       1. scale- horizontally
       2. availability : if one db down but another db is on means some usr can still use it
          fault tolerence-
     - CONS:
       1. Costly 
       2. complexity : partition mapping layer to map dbs +  routing layer for interacting with db
       3. non-uniformity : mens one db can be of more size than another - option: reshard but it inctrease complexity
       4. analytical :

---

### 1. Acid 1 {#section-1}

> **📁 Topic: DB**

# ⚙ A — Atomicity
### 🔹 What It Means:
“All-or-nothing.” If a transaction has multiple steps (e.g., inserting into multiple tables), and any step fails, the entire operation rolls back.
- DB is the ultimate enforcer of atomicity.
- But actual enforcement is done by DB’s transaction engine.

### 🔐 Internals: How does DB ensure atomicity?
1. Transaction Log / Undo log:
   - DB keeps a log of what changed before committing.
   - If a failure occurs, it rolls back to the state before the transaction.
2. Locks or MVCC (see isolation below):
   - Ensures no other process sees the transaction in an inconsistent half-done state.

# ⚙ C — Consistency
### 🔹 What It Means:
"DB moves from one valid state to another."

- The `rules` and `constraints` defined in schema must always hold true — before and after a transaction.

### ✅ Examples of Consistency:
- Foreign key: A Posts.author_id must match a Users.user_id.
- Unique constraint: No two users with the same email.
- Check constraints: account_balance >= 0.

### 🔐 How DB enforces it?
- Constraint enforcement at the engine level.
- DB validates all constraints before COMMIT.
- If a constraint is violated → ROLLBACK is triggered automatically.
- Even if you try bypassing with raw SQL, DB will reject the operation.

# ⚙ I — Isolation
### 🔹 What It Means:
"Concurrent transactions shouldn't interfere."

### 🔐 Techniques Used:
1. Locking
   - Pessimistic strategy
   - Example: If one transaction is updating row A, another must wait or fail.
   ```sql
   SELECT * FROM posts WHERE id = 1 FOR UPDATE;
   ```
   - Prevents others from reading/updating the same row.

2. MVCC (Multi-Version Concurrency Control) — Used by PostgreSQL, MySQL InnoDB
   - DB keeps multiple versions of data.
   - Readers get a consistent snapshot, even if someone else is writing.

✅ Great for performance (no waiting), but leads to “snapshot isolation” and possible write conflicts on commit.

# ⚙ D — Durability
🔹 What It Means:
"Once a transaction is committed, it will never be lost, even on crash."
### 🔐 How It's Ensured: WAL (Write-Ahead Logging)
Used in PostgreSQL, MySQL (InnoDB), etc.
### 🧱 WAL Process:
1. When you make a change:
    - DB does not write directly to table files.
2. Instead, it writes to a WAL (log file) first.
    - Contains all changes to be made (insert/update/delete).
3. Once WAL is safely written to disk:
    - Only then the COMMIT is acknowledged.
4. Actual changes to tables may happen later (called checkpointing).

### 🔄 On Crash:
- During restart, DB replays WAL logs that were not flushed to data files yet.
- Ensures no committed data is lost.
### 💡 Common Assumption (Your Thought):
“Commit” means:
- ✅ Data is written to table files (disk)
- ✅ Operation is fully done
- ✅ App is told “success” only after all data is written
### ❗Reality in Modern Databases:
✅ "COMMIT" means:
➤ All changes have been written to the WAL (Write-Ahead Log)
➤ NOT necessarily flushed to the table’s data files yet
➤ But the DB can guarantee it can recover the changes — so it sends COMMIT OK to the app
### 🔄 Why? Because of Performance
Flushing entire table pages to disk is:

- 🔻 Slow (can take milliseconds or more)
- 🔄 Not required immediately, since WAL guarantees recovery


So DBs follow this optimized path:

| Step | What Happens                            | Is it durable? | Sent to App? |
| ---- | --------------------------------------- | -------------- | ------------ |
| 1    | Start TX                                | ❌              | No           |
| 2    | Update in memory (buffers)              | ❌              | No           |
| 3    | Write changes to WAL (sequential write) | ✅              | No           |
| 4    | Flush WAL to disk                       | ✅              | ✅ YES        |
| 5    | Send `COMMIT OK` to app                 | ✅              | ✅ YES        |
| 6    | Write actual table files later          | ✅ (deferred)   | Already done |


## Summary
| Property    | Enforced By     | Mechanism                      | Notes                                  |
| ----------- | --------------- | ------------------------------ | -------------------------------------- |
| Atomicity   | DB engine       | Undo logs, transactional scope | ORM helps start it, but DB enforces it |
| Consistency | DB schema/rules | Constraints, FK, validations   | Rejected if rule violated              |
| Isolation   | DB engine       | Locks or MVCC                  | Based on isolation level               |
| Durability  | DB engine       | WAL or journaling              | Survives crashes                       |

---

### 1. Cap Ap 1 {#section-1}

> **📁 Topic: DB**

## 💡 Key Concepts That Make AP Possible:
### 🔁 1. Eventual Consistency
- After partition heals, all nodes converge to the same state
- Merging may use:
  - Timestamps (Last Write Wins)
  - CRDTs (Conflict-free Replicated Data Types)
  - Custom merge logic

### 🛑 2. No Single Leader
- In CP systems, there's usually a single write leader
- In AP systems, all nodes are equal and can accept writes

### 🗃️ 3. Quorum Not Needed
- Writes don't wait for a majority
- This allows better availability, especially in geo-distributed systems
 
## 🚦 Tradeoffs in AP 
| Pros                                 | Cons                                 |
| ------------------------------------ | ------------------------------------ |
| ✅ Highly available                   | ❌ Stale or conflicting data possible |
| ✅ Good for offline/disconnected apps | ❌ Harder to reason about correctness |
| ✅ Scales easily across regions       | ❌ Requires careful conflict handling |

 
## ✅ Example: PostgreSQL with read replicas
- One primary node handles all writes
- All replicas replicate asynchronously or synchronously
- If primary goes down:
   - Promotion (manual or auto) happens
   - Guarantees consistency (at some cost to availability)
## ✅ Real Example 1: DynamoDB (AP)
- If network is slow or partitioned, DynamoDB still responds
- May return slightly stale data
- Uses eventual consistency by default, but offers strong consistency if explicitly asked (ReadConsistency.STRONG)
- Why AP?
  - Highly available for global scale
  - Trades off strict consistency to avoid downtime
  
## 📦 Real Databases That Use AP  

| DB            | Characteristics                                                                 |
| ------------- | ------------------------------------------------------------------------------- |
| **DynamoDB**  | Eventually consistent by default, supports strongly consistent reads optionally |
| **Cassandra** | Peer-to-peer, tunable consistency using `QUORUM`, `ONE`, `ALL`, etc.            |
| **Riak**      | AP-focused, uses **vector clocks** for conflict resolution                      |
| **CouchDB**   | AP by design, works offline-first (good for mobile apps)                        |

---

### 1. Cognito 1 Sign Up {#section-1}

> **📁 Topic: OAuth2 cognito**

## Cognito Sign Up
```
User Details --> Backend --> Cognito 
```
### Requirements:
1. AWS Cognito User Pool: for storing User
2. User Pool - APP CLIENT: for registering apps/web sites -common so user can login any website/app if user is in same pool

## Flow:

###  SignUp:
```
user data --> backend - `AdminGetUserCommand` (find user) - if not present - `SignUpCommand` (create user) --> save user with cognitoId (table)--> add account id to cognito user (`AdminUpdateUserAttributesCommand`)
```
- Check if User Already Exists:
```ts
const command = new AdminGetUserCommand({
  UserPoolId: YOUR_USER_POOL_ID,
  Username: email,
});
```
- Create User if Not Present:
```ts
const command = new SignUpCommand({
  ClientId: YOUR_APP_CLIENT_ID,
  Username: email,
  Password: password,
  UserAttributes: [
    { Name: "email", Value: email },
    { Name: "name", Value: fullName },
  ],
});
```

- Store User in Database
- Add Custom Attributes to Cognito User
```ts
const command = new AdminUpdateUserAttributesCommand({
  UserPoolId: YOUR_USER_POOL_ID,
  Username: email,
  UserAttributes: [
    {
      Name: "custom:accountId",
      Value: accountId,
    },
  ],
});
```

| Step | Action                            | AWS SDK Command                    |
| ---- | --------------------------------- | ---------------------------------- |
| 1    | Check if user exists              | `AdminGetUserCommand`              |
| 2    | Create user if not found          | `SignUpCommand`                    |
| 3    | Save user to DB                   | -                                  |
| 4    | Attach account ID to Cognito user | `AdminUpdateUserAttributesCommand` |


## Cognito Sends Verification Email :
- ### Add Domain - for email verification
- ### Add Extenions - lambda function for custom Messages

---

### 2. Consistent Hashing {#section-2}

> **📁 Topic: DB**

## Sharding and Consistent Hashing Explained

### **1. What is Sharding?**
**Sharding** is a technique used to **split** a large dataset into smaller parts (shards) and distribute them across multiple servers.

#### **Example: Basic Sharding**
Imagine you are running a **video streaming service** and storing video metadata in a database. You have **three database servers**, and you decide to shard the data **based on user ID**.

| User ID | Shard Formula (User ID % 3) | Stored in Server |
|---------|---------------------------|----------------|
| 101     | 101 % 3 = 2                | Server 2      |
| 102     | 102 % 3 = 0                | Server 0      |
| 103     | 103 % 3 = 1                | Server 1      |
| 104     | 104 % 3 = 2                | Server 2      |

🔹 **Problem with this approach?**  
If you add a new server (Server 3), the formula **(User ID % 3)** becomes invalid, and you must re-distribute the data.

---

### **2. What is Consistent Hashing?**
**Consistent hashing** solves the problem of **rebalancing** when adding or removing servers in a sharded system.

#### **Example: Consistent Hashing**
- Imagine you have **four cache servers** for storing video thumbnails.
- Instead of using `mod` operation, we:
  1. Assign a **hash** to each server (e.g., `hash(Server IP)`).
  2. Place them on a **circular hash ring**.
  3. Use a **hash function** (like MD5) to assign each **video ID** to a point on the ring.
  4. Each video is stored on the **next server in the clockwise direction**.

**Step-by-step illustration:**
1. Assume servers get placed at hash positions:
   - Server A → **10**
   - Server B → **30**
   - Server C → **50**
2. A video with ID **102** hashes to **28**, so it gets stored in **Server B**.
3. A video with ID **205** hashes to **48**, so it gets stored in **Server C**.

🔹 **Benefit?**
- If a **server fails or is added**, **only a small portion of data is affected**, rather than redistributing everything.

---

### **3. How Are They Related?**
- **Sharding** is the act of **dividing data** across multiple servers.
- **Consistent hashing** is a **smart way** to assign data to shards dynamically.
- **Without consistent hashing**, adding/removing shards requires **reshuffling all data**.
- **With consistent hashing**, only **a small portion** of data moves when adding/removing servers.

---

### **4. Consistent Hashing in Simple Terms**
It’s a **smart way to assign inputs (data, requests, cache keys, etc.)** to different **databases, caches, load balancers, or servers** in a distributed system.

#### **How It Works?**
1. Imagine a **circular ring** (like a clock).
2. Each **server (DB, cache, etc.)** is placed on this ring at a specific point.
3. When **a new request/data comes**, we:
   - Compute a **hash** of the input (e.g., user ID, video ID, cache key).
   - Find the **nearest** server **clockwise** on the ring.
   - Store/process the data there.

#### **Why Use It?**
- ✅ **Handles scaling easily** – If we add/remove servers, only a small portion of data moves.
- ✅ **Avoids reassigning all data** – Unlike `mod(n)`, where adding a new server shifts everything.
- ✅ **Common in caching & databases** – Used in Redis, Cassandra, DynamoDB, etc.

---

### **5. Real-World Use Cases**
✅ **Database Sharding** → MySQL, PostgreSQL use **consistent hashing** to distribute data across multiple databases.  
✅ **Distributed Caching** → Redis, Memcached use **consistent hashing** to store cache efficiently.  
✅ **Load Balancing** → Nginx, HAProxy use **consistent hashing** to route requests to the correct server.  

---

### **6. Code Example: Consistent Hashing in JavaScript**
Here’s a simple JavaScript implementation of **consistent hashing**:

```javascript
class ConsistentHashing {
  constructor() {
    this.ring = new Map();
    this.sortedKeys = [];
  }

  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) % 100;
    }
    return hash;
  }

  addServer(server) {
    const hash = this.hash(server);
    this.ring.set(hash, server);
    this.sortedKeys.push(hash);
    this.sortedKeys.sort((a, b) => a - b);
  }

  getServer(key) {
    const hash = this.hash(key);
    for (let h of this.sortedKeys) {
      if (hash <= h) return this.ring.get(h);
    }
    return this.ring.get(this.sortedKeys[0]); // Wrap around
  }
}

const ch = new ConsistentHashing();
ch.addServer("ServerA");
ch.addServer("ServerB");
ch.addServer("ServerC");

console.log("Key 102 maps to:", ch.getServer("102"));
console.log("Key 205 maps to:", ch.getServer("205"));
```

This implementation:
- Uses a **simple hash function**.
- Stores servers in a **sorted ring**.
- Finds the nearest server **clockwise** on the ring.

Would you like further improvements or optimizations? 🚀

---

### 2. Acid 2 Isolation Levels 1 {#section-2}

> **📁 Topic: DB**

# 🔒 Isolation ensures:
Multiple transactions running concurrently do not interfere with each other’s data in a way that would lead to inconsistency.

## 🎯 Why Isolation is Important
Imagine two users booking the last available seat:

- T1: Checks available seats (sees 1)
- T2: Also checks (sees 1)
- Both try to book → if no isolation → 2 bookings made = Data corruption
- Isolation ensures one transaction sees a consistent snapshot, or waits/blocks accordingly.

## 🔍 Isolation Phenomena

| Issue                   | Description                                        | Example                                                                    |
| ----------------------- | -------------------------------------------------- | -------------------------------------------------------------------------- |
| **Dirty Read**          | Read **uncommitted** data from another transaction | T1 writes → T2 reads → T1 rolls back                                       |
| **Non-repeatable Read** | Re-reading gives **different result**              | T1 reads → T2 updates → T1 reads again                                     |
| **Phantom Read**        | New rows **appear/disappear** in repeated query    | T1: `SELECT * WHERE age > 30` → T2 inserts → T1 runs again, gets more rows |


## Types of Isolation Levels

| Isolation Level      | Prevents                     | Allows                                           |
| -------------------- | ---------------------------- | ------------------------------------------------ |
| **Read Uncommitted** | Nothing                      | Dirty Reads, Non-repeatable Reads, Phantom Reads |
| **Read Committed**   | Dirty Reads                  | Allows: Non-repeatable, Phantom                  |
| **Repeatable Read**  | Dirty + Non-repeatable Reads | Allows: Phantom Reads                            |
| **Serializable**     | All anomalies prevented      | Slowest, highest locking                         |



## Overview

| Level                | Dirty Reads | Non-repeatable Reads | Phantom Reads |
| -------------------- | ----------- | -------------------- | ------------- |
| **Read Uncommitted** | ❌ Allowed   | ❌ Allowed            | ❌ Allowed     |
| **Read Committed**   | ✅ Prevented | ❌ Allowed            | ❌ Allowed     |
| **Repeatable Read**  | ✅ Prevented | ✅ Prevented          | ❌ Allowed     |
| **Serializable**     | ✅ Prevented | ✅ Prevented          | ✅ Prevented   |

## Use cases

| Use Case                                | Recommended Isolation                           |
| --------------------------------------- | ----------------------------------------------- |
| **User profile read/update**            | Repeatable Read                                 |
| **Order placement / inventory booking** | Serializable or careful locking                 |
| **Analytics dashboards**                | Read Committed                                  |
| **Log ingestion / telemetry**           | Read Uncommitted (if write latency is critical) |

## 💡 How RDBMS Enforce Isolation
- Depending on the DB engine:
    - MVCC (Multi-Version Concurrency Control) — PostgreSQL, InnoDB (MySQL)
        - Readers don’t block writers
        - Writers don't block readers (mostly)
        - Each transaction sees a snapshot of the data
    - Locking-based isolation — Oracle, SQL Server
        - Explicit locks to block other transactions

## How to Set Isolation Level (Examples)
### 🧵 MySQL:
```sql
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION;
-- your queries here
COMMIT;
```

### 🧵 PostgreSQL:
```sql
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- your queries
COMMIT;
```

### 🔥 Tips for System Design
- Avoid using Serializable for everything → can slow system down (locking, contention).
- In DynamoDB, you don’t set isolation levels — it provides eventual or strongly consistent reads, and transactional writes via APIs.
- Use Optimistic Locking (e.g., version numbers) in REST APIs (e.g., update profile if version hasn't changed).
- Cache invalidation must respect isolation → don't cache data mid-transaction.

## 🧠 Final Summary

| Concept                   | Description                                   |
| ------------------------- | --------------------------------------------- |
| **Isolation**             | Ensures transactions don't interfere          |
| **Types**                 | RU < RC < RR < Serializable                   |
| **Common Bugs Prevented** | Dirty reads, lost updates, phantom reads      |
| **Performance vs Safety** | Higher isolation = safer, but slower          |
| **In MVCC systems**       | Snapshots used for isolation instead of locks |

---

### 2. Acid 2 I Lock 1 {#section-2}

> **📁 Topic: DB**

## ✅ Lock Conflicts in SQL Databases
Lock conflicts happen when two or more transactions are trying to read/write the same row or table and the DB needs to ensure isolation.

## 🔥 Real-World Lock Conflict Example: Bank Transfer
Imagine two users transferring money from the same account at the same time.

### ✅ Scenario:
Two concurrent transactions:
- T1: Transfer ₹100 from Account A to B
- T2: Transfer ₹200 from Account A to C
- Assume initial balance is ₹1000.

```sql
-- Transaction T1
BEGIN;
SELECT balance FROM accounts WHERE id = 1 FOR UPDATE;  -- locks row
-- do some processing
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
COMMIT;

-- Transaction T2 (at same time)
BEGIN;
SELECT balance FROM accounts WHERE id = 1 FOR UPDATE;  -- BLOCKED!
```

### 🔒 What’s happening?
- T1 locks accounts.id = 1 for update.
- T2 waits (or errors out with timeout/deadlock) because it also wants to write to the same row.
- When T1 commits, the lock is released, and T2 proceeds.

## 🧠 Why FOR UPDATE?
- It’s a pessimistic lock — used when you expect contention.
- Guarantees no one else can read/write the same row till the current TX finishes.

## 🧨 Deadlock Example
Deadlocks happen when two transactions hold partial locks and wait for each other to release the other one’s lock.
```sql
-- T1
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1; -- locks row 1
-- now T2 comes in

-- T2
BEGIN;
UPDATE accounts SET balance = balance - 200 WHERE id = 2; -- locks row 2
UPDATE accounts SET balance = balance + 100 WHERE id = 1; -- waits for T1

-- Back to T1
UPDATE accounts SET balance = balance + 200 WHERE id = 2; -- waits for T2
```
### 🔁 Now both are waiting on each other forever → DB detects deadlock and kills one TX.


## 🔧 How to Prevent Lock Conflicts
- `Always lock in the same order` (e.g., by id) to avoid deadlocks.
- Keep transactions short.
- Use retry logic (many ORMs provide this).
- Use `optimistic locking` (covered below in ORM part).

## Pessimistic Locking - In Query
```ts
await manager
  .createQueryBuilder(Account, "account")
  .setLock("pessimistic_write")
  .where("account.id = :id", { id: 1 })
  .getOne();
```
- Translates to SELECT ... FOR UPDATE
- Use when you’re sure only one transaction should touch a row at a time.


## Optimistic Locking - adding something to table
- You use a version field.
- No locks taken, but before update, ORM checks if someone else updated the row.
```ts
@Entity()
class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @VersionColumn()
  version: number;
}
```
- Now the update will look like:
```sql
UPDATE accounts SET balance = ..., version = version + 1
WHERE id = 1 AND version = 5;
```
- If version doesn't match, update fails → retry or error.
- Why? if this query is being run by others let say user 1 for him v=1, same time for user 2  v=1 but when user 1 will first update v=2 then if user 2 tries to update then condition becomes unvalid as v=2 now not v=1

## 🔁 Understanding “Lock in Same Order” with a Real Example
🎯 The Problem:
Deadlocks happen when two or more transactions acquire partial locks and then wait on each other to release the remaining locks.
### 🧍 Example: Two Friends Booking Conference Rooms
- There are 2 rooms: Room A and Room B.
- Alice wants to book A first, then B.
- Bob wants to book B first, then A.
### 🔴 Problem:
- Alice locks Room A 🛑 (Room B is free)
- Bob locks Room B 🛑 (Room A is locked by Alice)
- Now:
    - Alice waits for Room B (Bob has it)
    - Bob waits for Room A (Alice has it)
- 💥 Deadlock

### ✅ Solution: Lock in the Same Order
- Force both Alice and Bob to always acquire Room A before Room B (say, in alphabetical order):
- Alice locks A → then B
- Bob also locks A → then B (but now waits on A if already locked)
- No circular wait → no deadlock

### 🔁 Applying to DB Transactions
- Assume your accounts table has:

   | id | balance |
   | -- | ------- |
   | 1  | ₹1000   |
   | 2  | ₹2000   |

- Now you have:
  ### 🔴 Deadlock-prone logic: 
  ```ts
    // T1 (Transfer from 1 → 2)
    LOCK account 1;
    LOCK account 2;
    
    // T2 (Transfer from 2 → 1)
    LOCK account 2;
    LOCK account 1;
  ```
  - T1 locks row 1 same time
  - T2 locks row 2 same time
  - Then both wait on the other's lock (T1 for row 2 & T2 for row 1) → Deadlock
- ### Solution : ✅ Safe ordering:
    Sort account ids before locking:
    - So even if T1 and T2 are doing different transfers, they’ll lock rows in the same order (1 then 2).
    ```ts
        // Transfer between account A and B
    const from = Math.min(accountA, accountB);
    const to = Math.max(accountA, accountB);
    
    // Always lock lower ID first
    LOCK account with id = from;
    LOCK account with id = to;
    ```
    - That ensures:
      - One transaction will wait on the first lock if already held.
      - No deadlock cycle can form.

##  Summary
| Conflict Type     | Example                      | Result                | Fix                     |
| ----------------- | ---------------------------- | --------------------- | ----------------------- |
| Row lock conflict | Two updates to same row      | Second waits or fails | Retry, optimize TX flow |
| Deadlock          | Two TXs wait on each other   | One is killed         | Lock in same order      |
| Optimistic Lock   | Conflict detected on version | Update fails          | Use retries             |

---

### 2. Acid 2 I Lock 2 {#section-2}

> **📁 Topic: DB**

## Eaxmple booking systems
### especially for things like train/bus/movie tickets or event seats in which one user is booking seats 1 to 10 another at the same time booking 5 to 10 and other users may trying to book same seats so In this scenario do you mean wh need to lock in sequential order so there will be no deadlock and one thing I'm confused how this situation will handled do db is going to make sure and give error if he finds these seats are already locked or db will or another transaction will decide locks and other bookings will fail 

You're asking exactly the right thing:
   - How is locking handled when overlapping seat ranges are being booked concurrently?
   - What decides the lock? The DB engine? Or our application code?
   - Will it result in deadlocks or conflicts, and how to prevent them?

### 🎯 Problem Summary
Users booking overlapping seat ranges:
  - User A: tries to book seats 1–10
  - User B: tries to book seats 5–10 at the same time
  - User C/D... also trying other overlapping ranges

Seats 5–10 are common → conflict and possibly a deadlock or double-booking unless managed properly.
### 🔐 What Should Happen?
Only one transaction should succeed in booking the overlapping seats.
Others should either:
  - Wait (if using locks)
  - Fail and retry
  - Or get feedback saying seats are unavailable

## ✅ Option 1: Use Pessimistic Locking (Safe but Slower)
Use SQL SELECT ... FOR UPDATE to lock the seat rows before confirming booking
- ### 💡 Flow:
      ```sql
      BEGIN;
      
      -- Lock the seats
      SELECT * FROM seats
      WHERE seat_number BETWEEN 1 AND 10
      AND status = 'AVAILABLE'
      FOR UPDATE;
      
      -- Check if we got all 10
      -- if yes, proceed to update
      UPDATE seats SET status = 'BOOKED', user_id = X
      WHERE seat_number BETWEEN 1 AND 10;
      
      COMMIT;
      ```
- ### 🔁 Now what happens if User B tries booking (5–10) while User A is in the middle?
   - User B’s query will block at FOR UPDATE on seats 5–10
   - DB waits until User A commits or rolls back
   - If seats are booked, User B gets 0 rows to lock → your app can throw “seats unavailable”


✅ This is DB-level atomic and deadlock is avoided if you always lock seats in ascending order.

### 🔥 BUT What if you don't lock in order?
Example:
   - User A: locks seats 1–10
   - User B: locks seats 10–5 (descending)
   - You can get deadlock, because:
      - A locks seat 1 first, then 2... then 10
      - B locks seat 10 first, then 9... then 5
      - Both now waiting on each other → 💥 Deadlock

So yes: always lock in same (ascending) order to prevent deadlocks.

## ✅ Option 2: Optimistic Locking (Fast, retry-based)
1. Don't lock seats initially.
2. Select all candidate seats (1–10), check status = 'AVAILABLE'
2. When updating, include a condition:
   ```sql
   UPDATE seats
   SET status = 'BOOKED'
   WHERE seat_number BETWEEN 1 AND 10
   AND status = 'AVAILABLE';
   ```
4. Check how many rows got updated:
   - If it’s less than 10, means someone else already took some seats
   - Roll back or show partial availability
### 💡 You can also use version or timestamps to do optimistic version checking.

## ✅ Option 3: Use Unique Constraints on Bookings (No Locks)
Each booking inserts into a bookings table:
```sql
CREATE TABLE bookings (
  seat_id INT UNIQUE,
  user_id INT,
  ...
);
```
Now insert:
```sql
INSERT INTO bookings (seat_id, user_id) VALUES (5, A), (6, A), ..., (10, A);
```
- If another user tries to book any of those, their insert will fail with a UNIQUE constraint violation.
- You can catch this error in application and say “seat already booked”.
- ✅ This is lock-free and uses DB constraints to prevent double booking.

## ✅ How the DB Decides Locking
If you explicitly use:
- SELECT ... FOR UPDATE: DB locks the rows, and later TXs must wait
- UPDATE ... WHERE: DB locks the rows during update
- No explicit locking? Then it's up to isolation level (like MVCC in PostgreSQL)

## 🧠 Summary

| Strategy                | How it Works                            | Pros                       | Cons                        |
| ----------------------- | --------------------------------------- | -------------------------- | --------------------------- |
| **Pessimistic Locking** | `SELECT ... FOR UPDATE` on seat rows    | Safe, prevents conflict    | Slower under high load      |
| **Optimistic Locking**  | Try update, fail on mismatch or version | Fast, scalable             | Requires retry mechanism    |
| **Constraint-based**    | Use `UNIQUE(seat_id)` in booking table  | Lock-free, clean DB design | Fails late, harder to batch |

## 🔒 Bonus: Handling Thousands of Seats
If you’re booking hundreds/thousands of seats, avoid row-by-row locking.

Instead, use bulk queries, always lock in order, and maybe batch by sections.

---

### 2. Cognito 2 Sing In {#section-2}

> **📁 Topic: OAuth2 cognito**

## Cognito Sign In:

### Flow 1:
```
Client (app)
     |
     |→ POST /auth/signin (email + password)
     ↓
Backend 
     |
     |→ Initiate Auth with Cognito
     ↓
Cognito (User Pool)
     |
     |→ Returns Tokens (JWT)
     ↓
Backend can verify/store as needed
```

1. Frontend Sends Credentials
2. Backend Calls Cognito to Authenticate:
   - If successful, Cognito responds with JWT tokens:
       - AccessToken: Used to authorize access to APIs
       - IdToken: Contains user claims (email, sub, etc.)
       - RefreshToken: Used to get a new token without re-login
```ts
const command = new InitiateAuthCommand({
  AuthFlow: "USER_PASSWORD_AUTH",
  ClientId: YOUR_APP_CLIENT_ID,
  AuthParameters: {
    USERNAME: email,
    PASSWORD: password,
  },
});
```
3. Backend Returns Tokens to Frontend
4. Frontend Stores Tokens (Securely)
5. (Optional) Backend Verifies Token
   - For secure backend APIs, verify token using Cognito public keys (JWKS).
   - Use libraries like jsonwebtoken or aws-jwt-verify.

## ✅ Summary of AWS SDK Command

| Step | Action                             | AWS SDK Command                |
| ---- | ---------------------------------- | ------------------------------ |
| 1    | User attempts to sign in           | `InitiateAuthCommand`          |
| 2    | Tokens returned                    | Access, ID, Refresh Token      |
| 3    | Backend returns tokens to client   | N/A                            |
| 4    | (Optional) Backend validates token | Using JWKS or Cognito verifier |

---

### 2-1. Cognito 2.1 Sign In {#section-2-1}

> **📁 Topic: OAuth2 cognito**

## ✅ Architecture: Amplify + Cognito (Frontend Auth) + Backend (Token Verification)
### 🔁 Flow Overview
```
[Angular + Amplify]
    - Uses Amplify Auth to sign in
    - Receives JWT tokens (Access, ID, Refresh)

        ↓ (sends AccessToken via Authorization header)

[Backend (NestJS/Node.js)]
    - Verifies AccessToken on each request
    - Uses issuer, client_id, jwksUri to validate
```
## 🔐 Frontend (Angular + Amplify)

### 🔧 Setup
- Use Amplify Auth to sign in and receive tokens.
```ts
import { Auth } from 'aws-amplify';

const user = await Auth.signIn(email, password);
const session = await Auth.currentSession();
const accessToken = session.getAccessToken().getJwtToken();
```
- Then pass this accessToken in the headers of your API calls:
```ts
{
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
}
```

## 🛡️ Backend (NestJS) - Token Verification
You can verify the token in a middleware/guard using:
- JWT library (e.g., jsonwebtoken)
- Cognito JWKS endpoint (public keys)
   - for cognito user pool 
   - Fetch Cognito's JWKS (public keys)
   - Verify the signature and claims using the public key from JWKS
```
https://cognito-idp.<region>.amazonaws.com/<userPoolId>/.well-known/jwks.json
```
- Issuer, audience (clientId), and expiration check

---

### 3. Chainofresponsibiltypattern Logging {#section-3}

> **📁 Topic: LLD Design Patterns**

## Chain Of Responibilty Pattern 

#### - *EX: Logger, ATM, Vending Machine, etc.*
#### - Working: Sender -- Req --> [RECV1, RECV2,REC3,...RECVn]
   - when Clients send req but don't know which receiver will full fill
   then each receiver will send that req to next receiver.
#### - EX 1 : ATM 
  - Lets say user wants to withdraw 2000 rs then 
  - 2000 req --> ATM [ 2000 Handler , 1000 Handler, 500 Handler] 
  - 1. In this if 2000 handler have 2000 then it will fulfuil else it will send that to 1000 handler
  - 2. if 1000 Rs Handler have 2000 then it will fulfil else it will
    send that to 500 handler
  - 3. if 500 handler is able to fulfil it will send 2000 else not enough money.

```java

//parent class must have child idetntification
// in this example child takes another object and child calls log of next one
class LogProcessor{
  public static int INFO=1;
  public static int DEBUG=2;
  public static int ERROR=3;
  LogProcessor nextLogProcessor;
  LogProcessor(Logprocessor nextLogProcessor){
    this.nextLogProcessor=nextLogProcessor;
  }

  public void log(int level,String msg){
    if(nextLogProcessor!=null){
      nextLogProcessor.log(level,msg);
    }
  }

}

class LogInfo extends LogProcessor{
  LogProcessor nextLogProcessor;
  LogInfo(LogProcessor nextLogProcessor){
    this.nextLogProcessor=nextLogProcessor;
  }

  public void log(int level,String msg){
    if(level== INFO){
      //do
      sout(msg);
    }else{
      this.nextLogProcesspor.log(level,msg);
    }
  }
}

class LogDebug extends LogProcessor{
  LogProcessor nextLogProcessor;
  LogDebug(LogProcessor nextLogProcessor){
    this.nextLogProcessor= nextLogProcessor;
  }

  public void log(int level,String msg){
    if(level == DEBUG){
      //do
      sout(msg);
    }else{
      this.nextLogProcesspor.log(level,msg);
    }
  }
}

class LogError extends LogProcessor{
  LogProcessor nextLogProcessor;
  LogError(LogProcessor nextLogProcessor){
    this.nextLogProcessor= nextLogProcessor;
  }

  public void log(int level,String msg){
    if(level == ERROR){
      //do
      sout(msg);
    }else{
      this.nextLogProcesspor.log(level,msg);
    }
  }
}

public static void main(){
  LogProcessor logger=new LogInfo(new LogDebug(new LogError(null)));

  logger.log(LogProcessor.ERROR,"this is error msg");
}

```
#### Exmple 2: In this Parent Takes Responsibility to Call next Objects Method

```java
//parent class must have child idetntification
class LogProcessor{
  public static int INFO=1;
  public static int DEBUG=2;
  public static int ERROR=3;
  LogProcessor nextLogProcessor;
  LogProcessor(Logprocessor nextLogProcessor){
    this.nextLogProcessor=nextLogProcessor;
  }

  public void log(int level,String msg){
    if(nextLogProcessor!=null){
      nextLogProcessor.log(level,msg);
    }
  }

}

class LogInfo extends LogProcessor{
  // LogProcessor nextLogProcessor;
  LogInfo(LogProcessor nextLogProcessor){
    // this.nextLogProcessor=nextLogProcessor;
    super(nextLogProcessor);
  }

  public void log(int level,String msg){
    if(level== INFO){
      //do
      sout(msg);
    }else{
      // this.nextLogProcesspor.log(level,msg);
      super.log(level,msg);
    }
  }
}

class LogDebug extends LogProcessor{
  // LogProcessor nextLogProcessor;
  LogDebug(LogProcessor nextLogProcessor){
    // this.nextLogProcessor= nextLogProcessor;
    super(nextLogProcessor);
  }

  public void log(int level,String msg){
    if(level == DEBUG){
      //do
      sout(msg);
    }else{
      // this.nextLogProcesspor.log(level,msg);
      super.log(level,msg);
    }
  }
}

class LogError extends LogProcessor{
  // LogProcessor nextLogProcessor;
  LogError(LogProcessor nextLogProcessor){
    // this.nextLogProcessor= nextLogProcessor;
    super(nextLogProcessor);
  }

  public void log(int level,String msg){
    if(level == ERROR){
      //do
      sout(msg);
    }else{
      // this.nextLogProcesspor.log(level,msg);
      super.log(level,msg);
    }
  }
}

public static void main(){
  LogProcessor logger=new LogInfo(new LogDebug(new LogError(null)));

  logger.log(LogProcessor.ERROR,"this is error msg");
}
```

---

## BatchProcessing



---

## DB



---

### 999. Cap Cp Vs Ap {#section-999}

> **📁 Topic: DB**

## 🔁 Quick Comparison: CP vs AP
| Feature             | CP System                    | AP System                    |
| ------------------- | ---------------------------- | ---------------------------- |
| Write Location      | Single leader                | Any node                     |
| Network Partition   | Blocks writes or reads       | Allows ops, may return stale |
| Conflict Resolution | Not needed (linearizable)    | Needed (merge on sync)       |
| Example             | PostgreSQL, MongoDB (strict) | Cassandra, DynamoDB, CouchDB |

---

### 999. Cap Theorem {#section-999}

> **📁 Topic: DB**

## Distributed system 
- system with Partion of network  [P-CAP]
- Regions
- Shards - database partiton
- Distributed Network

## `IF Netowrk Partion : Choose one -  Availability  OR Consistency`
## `IF NOT : Choose one - Latency OR Consistency`
## `Availibiltiy and Consistency can go along`


## 💡 Note on SQL Databases
- `Traditional SQL databases (PostgreSQL, MySQL) are not distributed by default, so CAP doesn’t apply directly.`
- But:
   - Distributed SQL systems like CockroachDB, Spanner, YugabyteDB do need to make CAP trade-offs
## CAP
The CAP theorem states that in any distributed system, you can achieve only two of the following three guarantees at any given time:

1. ### Consistency (C): 
    - Every read receives the most recent write, ensuring `data uniformity across the system`.
2. ### Availability (A): 
    - Every request receives a response (either success or failure), ensuring the `system is always accessible`. 
    - No timeout.
3. ### Partition Tolerance (P): 
    - `The system continues to operate even if communication between nodes is disrupted` (network partition occurs).

| Letter | Stands For              | Meaning                                                                         |
| ------ | ----------------------- | ------------------------------------------------------------------------------- |
| C      | **Consistency**         | All nodes see the same data at the same time                                    |
| A      | **Availability**        | Every request receives a response (success or failure) — no timeouts            |
| P      | **Partition Tolerance** | The system continues to operate even if there’s a network failure between nodes |


## Relaiblity :
refers to the ability of a system to operate continuously and correctly over time, without failures or interruptions
It measures how consistently the system delivers its expected functionality, ensuring users or services depending on it can trust it to be available and accurate.

  - ### Availability: 
    - The percentage of time the system is operational and accessible. A highly reliable system is expected to be available with minimal downtime.

 - ### Fault Tolerance: 
    - The system's ability to continue operating correctly even in the presence of failures. This is achieved through redundancy, backups, and failover mechanisms.

- ### Durability: 
   - Ensuring that once data is written or a process completes, it remains intact and isn’t lost, even in the event of hardware or software failures.

- ### Consistency: 
   - In systems like databases, reliability can also mean that the data is consistent and correct across all nodes or instances, ensuring accurate information.

- ### Resilience: 
  - The system’s ability to recover from failures quickly and continue providing services after a disruption.
-----

---

## Demo



---

## HLD



---

### 999. Stock Market Design {#section-999}

> **📁 Topic: HLD**

Designing a **Stock Exchange Application** for buying and selling shares across different exchanges is a complex endeavor that requires careful consideration of various system design aspects to ensure **scalability**, **reliability**, **security**, and **low latency**. Below is a comprehensive approach to designing such a system.

---

## **1. Requirements Gathering**

### **Functional Requirements**
- **User Management**: Registration, authentication, authorization, profile management.
- **Account Management**: Linking bank accounts, managing balances, handling deposits and withdrawals.
- **Order Management**: Placing, modifying, and canceling buy/sell orders.
- **Real-Time Market Data**: Streaming live stock prices, order book data, trade executions.
- **Trade Execution**: Matching buy and sell orders across different exchanges.
- **Portfolio Management**: Viewing holdings, transaction history, profit/loss calculations.
- **Notifications**: Alerts for order status, market movements, etc.
- **Compliance and Reporting**: Generating reports for regulatory compliance.

### **Non-Functional Requirements**
- **Scalability**: Handle millions of users and high-frequency trading.
- **Low Latency**: Real-time data processing and order execution.
- **High Availability**: Ensure system uptime, especially during market hours.
- **Security**: Protect sensitive financial data and transactions.
- **Data Consistency**: Ensure accurate and consistent transaction records.
- **Compliance**: Adhere to financial regulations and standards (e.g., SEC, GDPR).

---

## **2. High-Level Architecture**

### **2.1. Client Layer**
- **Web Application**: Built with frameworks like React or Angular for the user interface.
- **Mobile Application**: Native or cross-platform apps (iOS, Android) for on-the-go access.
- **API Clients**: For integration with third-party services or trading bots.

### **2.2. Backend Services**
- **Authentication Service**: Handle user login, registration, and security (e.g., OAuth 2.0, JWT).
- **User Service**: Manage user profiles, account settings.
- **Account Service**: Handle financial transactions, balance management.
- **Order Service**: Manage order placement, modification, cancellation.
- **Trade Execution Engine**: Core component for matching buy and sell orders.
- **Market Data Service**: Ingest and distribute real-time market data.
- **Notification Service**: Send alerts and updates to users.
- **Compliance Service**: Ensure transactions meet regulatory requirements.
- **Reporting Service**: Generate user and regulatory reports.

### **2.3. Data Layer**
- **Relational Databases**: For transactional data (e.g., PostgreSQL, MySQL).
- **NoSQL Databases**: For high-speed access to market data and user sessions (e.g., Redis, Cassandra).
- **Data Warehousing**: For analytics and reporting (e.g., Amazon Redshift, Google BigQuery).

### **2.4. Integration Layer**
- **Exchange APIs**: Connect with various stock exchanges (e.g., NYSE, NASDAQ) for order execution and data feeds.
- **Payment Gateways**: Integrate with financial institutions for deposits and withdrawals.
- **Third-Party Services**: For additional functionalities like KYC verification, fraud detection.

### **2.5. Infrastructure Layer**
- **Cloud Providers**: AWS, Google Cloud, or Azure for scalable infrastructure.
- **Containerization and Orchestration**: Use Docker and Kubernetes for deploying microservices.
- **Load Balancers**: Distribute incoming traffic across multiple servers (e.g., AWS ELB).
- **CDN**: For faster content delivery to users globally (e.g., Cloudflare, Amazon CloudFront).

---

## **3. Detailed Components and Considerations**

### **3.1. Trade Execution Engine**
- **Matching Engine**: Core component that matches buy and sell orders based on price-time priority.
  - **Order Book Management**: Maintain a real-time order book for each stock.
  - **Concurrency Handling**: Manage simultaneous order submissions with thread-safe operations.
  - **Latency Optimization**: Implement in-memory data structures and possibly FPGA or specialized hardware for ultra-low latency.
  
- **Transaction Processing**
  - **ACID Compliance**: Ensure transactions are processed reliably.
  - **Idempotency**: Handle duplicate requests gracefully.
  
### **3.2. Real-Time Market Data Processing**
- **Data Ingestion**: Consume real-time data feeds from stock exchanges.
- **Data Distribution**: Stream data to clients with minimal delay using technologies like WebSockets or gRPC.
- **Data Storage**: Store historical data for analytics and compliance.

### **3.3. Scalability and Performance**
- **Horizontal Scaling**: Distribute services across multiple instances to handle increased load.
- **Microservices Architecture**: Break down the system into smaller, independently deployable services.
- **Caching**: Use Redis or Memcached to cache frequently accessed data.
- **Asynchronous Processing**: Employ message queues (e.g., Kafka, RabbitMQ) for tasks that don't require immediate processing.

### **3.4. High Availability and Fault Tolerance**
- **Redundancy**: Deploy services across multiple availability zones and regions.
- **Failover Mechanisms**: Automatic switching to backup systems in case of failures.
- **Disaster Recovery**: Regular backups and a clear recovery plan.

### **3.5. Security Measures**
- **Data Encryption**: Encrypt data at rest and in transit using TLS and encryption standards.
- **Access Control**: Implement Role-Based Access Control (RBAC) and least privilege principles.
- **Audit Logging**: Maintain detailed logs for all transactions and access for auditing purposes.
- **DDoS Protection**: Use services like AWS Shield and WAF to protect against attacks.
- **Regular Security Audits**: Conduct vulnerability assessments and penetration testing.

### **3.6. Compliance and Regulatory Considerations**
- **KYC (Know Your Customer)**: Implement verification processes to comply with regulations.
- **AML (Anti-Money Laundering)**: Monitor and report suspicious activities.
- **Data Privacy**: Adhere to GDPR, CCPA, and other data protection laws.
- **Audit Trails**: Maintain immutable logs for all critical operations.

### **3.7. Monitoring and Logging**
- **Real-Time Monitoring**: Use tools like Prometheus, Grafana, or AWS CloudWatch to monitor system health.
- **Centralized Logging**: Aggregate logs using ELK Stack (Elasticsearch, Logstash, Kibana) or similar solutions.
- **Alerting**: Set up alerts for critical issues to enable prompt responses.

### **3.8. DevOps and CI/CD**
- **Continuous Integration/Continuous Deployment**: Automate testing and deployment pipelines using tools like Jenkins, GitLab CI, or GitHub Actions.
- **Infrastructure as Code**: Manage infrastructure using Terraform, AWS CloudFormation, or similar tools.
- **Automated Testing**: Implement unit, integration, and load testing to ensure system reliability.

---

## **4. Technology Stack Recommendations**

### **4.1. Frontend**
- **Frameworks**: React.js, Angular, or Vue.js for building responsive user interfaces.
- **Real-Time Communication**: WebSockets or Server-Sent Events (SSE) for live data updates.

### **4.2. Backend**
- **Languages**: 
  - **Java/Kotlin**: For high-performance components like the matching engine.
  - **Node.js**: For handling asynchronous tasks and API services.
  - **Go**: For building efficient, concurrent services.
- **Frameworks**: Spring Boot (Java), Express/NestJS (Node.js), Gin (Go).

### **4.3. Databases**
- **Relational Databases**: PostgreSQL or MySQL for transactional data.
- **NoSQL Databases**: Cassandra or MongoDB for handling large volumes of unstructured data.
- **In-Memory Databases**: Redis or Memcached for caching and real-time data access.

### **4.4. Messaging and Streaming**
- **Message Queues**: RabbitMQ, Apache Kafka, or AWS SQS for asynchronous communication.
- **Streaming Platforms**: Apache Kafka for handling high-throughput data streams.

### **4.5. Infrastructure and Deployment**
- **Cloud Providers**: AWS, Google Cloud Platform, or Microsoft Azure for scalable infrastructure.
- **Containerization**: Docker for packaging services.
- **Orchestration**: Kubernetes for managing containerized applications.
- **CI/CD Tools**: Jenkins, GitLab CI, GitHub Actions for automated deployments.

---

## **5. Scalability and Performance Optimization**

### **5.1. Load Balancing**
- **Application Load Balancers**: Distribute incoming traffic across multiple servers.
- **Global Load Balancing**: Use DNS-based load balancing for distributing traffic across regions.

### **5.2. Database Sharding and Partitioning**
- **Horizontal Partitioning**: Distribute database tables across multiple machines to handle large datasets.
- **Replication**: Use master-slave or master-master replication to ensure data availability and read scalability.

### **5.3. Caching Strategies**
- **Client-Side Caching**: Utilize browser caching for static assets.
- **Server-Side Caching**: Cache frequently accessed data using Redis or Memcached.
- **CDN Caching**: Serve static content through a Content Delivery Network to reduce latency.

### **5.4. Asynchronous Processing**
- **Task Queues**: Offload long-running tasks to background workers.
- **Event-Driven Architecture**: Use events to trigger processes, enhancing decoupling and scalability.

### **5.5. Performance Monitoring**
- **APM Tools**: Use Application Performance Management tools like New Relic or Datadog to monitor system performance and identify bottlenecks.
- **Profiling and Optimization**: Regularly profile the application to optimize code and database queries.

---

## **6. Reliability and Fault Tolerance**

### **6.1. Redundancy**
- **Service Redundancy**: Deploy multiple instances of each service across different zones or regions.
- **Data Redundancy**: Ensure data is replicated across multiple storage systems.

### **6.2. Failover Strategies**
- **Active-Passive Failover**: Backup systems remain idle until a failure is detected.
- **Active-Active Failover**: Multiple systems handle requests simultaneously, providing higher availability.

### **6.3. Disaster Recovery**
- **Backup Plans**: Regularly back up critical data and configurations.
- **Recovery Time Objectives (RTO)** and **Recovery Point Objectives (RPO)**: Define acceptable downtime and data loss limits.

---

## **7. Security Best Practices**

### **7.1. Authentication and Authorization**
- **Multi-Factor Authentication (MFA)**: Add an extra layer of security for user logins.
- **OAuth 2.0 / OpenID Connect**: Implement secure authentication protocols.
- **Role-Based Access Control (RBAC)**: Restrict access based on user roles.

### **7.2. Data Protection**
- **Encryption**: Encrypt sensitive data both at rest and in transit using industry-standard protocols (e.g., AES-256, TLS 1.2+).
- **Tokenization**: Replace sensitive data with tokens to minimize exposure.

### **7.3. Secure Development Practices**
- **Input Validation**: Prevent injection attacks by validating and sanitizing user inputs.
- **Regular Audits**: Conduct code reviews and security audits to identify vulnerabilities.
- **Dependency Management**: Keep all libraries and dependencies updated to patch known vulnerabilities.

### **7.4. Compliance and Regulatory Adherence**
- **Data Residency**: Ensure data is stored in compliance with regional regulations.
- **Audit Trails**: Maintain comprehensive logs for all critical operations to support audits.

---

## **8. Compliance and Regulatory Considerations**

### **8.1. Financial Regulations**
- **SEC Compliance**: Adhere to regulations set by the Securities and Exchange Commission.
- **MiFID II**: For operations within the European Union, comply with the Markets in Financial Instruments Directive II.

### **8.2. Data Protection Regulations**
- **GDPR**: Ensure compliance with the General Data Protection Regulation for handling personal data of EU citizens.
- **CCPA**: Comply with the California Consumer Privacy Act for users in California.

### **8.3. Reporting and Auditing**
- **Transaction Reporting**: Provide detailed transaction reports to regulatory bodies.
- **Audit Logs**: Maintain immutable logs for all user and system activities.

---

## **9. Example Workflow: Placing a Buy Order**

1. **User Interface**: User logs into the web or mobile app and navigates to the trading section.
2. **Order Submission**: User submits a buy order specifying the stock, quantity, and price.
3. **Authentication & Authorization**: Backend verifies user credentials and permissions.
4. **Order Validation**: System checks for sufficient funds, validates order parameters.
5. **Order Processing**: 
   - The order is placed into the **Order Service**.
   - The **Matching Engine** attempts to match the order against existing sell orders.
6. **Trade Execution**:
   - If a match is found, the trade is executed, and both buyer and seller accounts are updated.
   - Transaction details are recorded in the **Relational Database**.
7. **Notification**: User receives a confirmation notification about the trade execution.
8. **Compliance Check**: The transaction is reviewed for compliance with regulatory standards.
9. **Update Portfolio**: User’s portfolio is updated to reflect the new holdings.

---

## **10. Technology Stack Example**

### **10.1. Frontend**
- **Framework**: React.js
- **Real-Time Communication**: WebSockets for live market data and order updates.
- **State Management**: Redux or MobX for managing application state.

### **10.2. Backend**
- **Language**: Java with Spring Boot for high-performance services like the matching engine.
- **Framework**: Node.js with NestJS for API services and user management.
- **Real-Time Data**: Go for real-time data processing components.

### **10.3. Databases**
- **Transactional Data**: PostgreSQL for handling orders, trades, and user accounts.
- **Market Data**: Cassandra for high-speed, write-heavy data like live market feeds.
- **Caching**: Redis for session management and caching frequently accessed data.

### **10.4. Messaging and Streaming**
- **Message Queue**: Apache Kafka for handling real-time data streams and inter-service communication.
- **Event Streaming**: Kafka Streams for processing real-time events.

### **10.5. Infrastructure**
- **Cloud Provider**: AWS for its extensive services and global reach.
- **Containerization**: Docker for packaging services.
- **Orchestration**: Kubernetes for managing container deployments.
- **CI/CD**: Jenkins for automated testing and deployment pipelines.

### **10.6. Monitoring and Logging**
- **Monitoring**: Prometheus and Grafana for system and application monitoring.
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana) for centralized logging and analysis.
- **Tracing**: Jaeger for distributed tracing to diagnose performance issues.

---

## **11. Additional Considerations**

### **11.1. Latency Optimization**
- **Geographical Distribution**: Deploy services closer to major financial centers to reduce network latency.
- **Efficient Protocols**: Use binary protocols like gRPC for faster communication between services.
- **Hardware Acceleration**: Utilize specialized hardware (e.g., FPGAs) for critical components like the matching engine.

### **11.2. High-Frequency Trading (HFT) Support**
- **Ultra-Low Latency Networks**: Optimize network paths and use high-speed connections.
- **In-Memory Data Grids**: Store and process data in-memory to minimize access times.
- **Algorithm Optimization**: Implement highly efficient algorithms for order matching and processing.

### **11.3. User Experience**
- **Responsive Design**: Ensure the application is responsive and works seamlessly across devices.
- **Intuitive Interface**: Design a user-friendly interface for placing orders, viewing portfolios, and accessing market data.
- **Customizable Dashboards**: Allow users to customize their dashboards with widgets and preferred data views.

### **11.4. Testing Strategy**
- **Unit Testing**: Validate individual components and services.
- **Integration Testing**: Ensure that different services work together correctly.
- **Load Testing**: Simulate high traffic and trading volumes to test system performance.
- **Security Testing**: Conduct penetration testing and vulnerability assessments.

---

## **12. Summary**

Designing a stock exchange application involves addressing numerous complex requirements to ensure the system is **scalable**, **reliable**, **secure**, and capable of **handling real-time transactions** with minimal latency. Here's a recap of the key steps:

1. **Gather Comprehensive Requirements**: Understand both functional and non-functional needs.
2. **Architect a Robust High-Level Design**: Define clear layers and components, ensuring seamless integration.
3. **Choose Appropriate Technologies**: Select technologies that align with performance, scalability, and security needs.
4. **Implement Scalability and Performance Optimizations**: Use strategies like caching, horizontal scaling, and efficient data processing.
5. **Ensure Reliability and Fault Tolerance**: Design for high availability with redundancy and failover mechanisms.
6. **Prioritize Security and Compliance**: Protect data and adhere to regulatory standards.
7. **Establish Effective Monitoring and DevOps Practices**: Maintain system health and streamline deployments.

By meticulously planning and implementing these aspects, you can build a robust stock exchange application capable of handling the demands of modern trading environments. If you need more detailed insights into any specific component or have further questions, feel free to ask!

---

## LLD Design Patterns



---

### 999. Index {#section-999}

> **📁 Topic: LLD Design Patterns**

[Chain of Responsibilty pattern ](./3_ChainOfResponsibiltyPattern_logging.md)

---

### 999. Overview {#section-999}

> **📁 Topic: LLD Design Patterns**

## Creations

### 1. Single Ton: create single object every time
### 2. Builder Pattern: First build properties then in end get object
- EX. want a customized car then use builder pattern because before asking for object need to create object properties first 
- This is like first create properties like ac, windshield, sunroof, etc. then get object
```java
class Vehicle{
    private boolean isRooftop;
    private int airBags;
    private boolean ac;
    private Vehicle(VehicleBuilder vb){
        this.isRooftop=vb.isRooftop;
        this.airBags=vb.airBags;
        this.ac=vb.ac;

    }
    public int getAirBags{
        return this.airBags;
    }
    public boolean isAc(){
        return this.ac;
    }
    public static class VehicleBuilder{
        private boolean isRooftop;
        private int airBags;
        private boolean ac;
        public VehicleBuilder setRoofTop(boolan b){
            this.isRooftop=b;
            retrun this;
        }
        public VehicleBuilder setAirBags(int b){
            this.airBags=b;
            return this;
        }
        public VehicleBuilder setAc(boolan b){
            this.ac=b;
            return this;
        }
        public Vehicle build(
            return new Vehicle(this);
        )
    }
}
class MainClass{
    psvm(String[] args){
        Vehicle.VehicleBuilder vehcileBuilder = new Vehicle.VehicleBuilder();
        Vehicle v= vehcileBuilder.setRoofTop(True).setAirBags(4).setAc(True).build();
    }
}

```

### 2. Factory Pattern: give asked objects
- This give specific object 
```java
class Car{
   
}
claas Tata extends car{

}
class Ford extends Car{

}

class Factory{
    public Car getObject(String carType){
        if(carType.equals("tata")){
            return new Tata();
        }else if(carType.equals("ford")){
            return new Ford();
        }
    }
}
```

### Abstrach Factory: Each Type have own factory class which gives Object of that Type
- if want to decide which type of vehicle like tata suv use strategy pattern why because it can create differnet objects in run time
```java

interface Vehicle{
    public void start();
    public void stop();
}

class Tata implements Vehicle{
    public void start(){

    }
    public void stop(){

    }
}
class Ford implements Vehicle{
    public void start(){

    }
    public void stop(){

    }
}

interface AbstractFactory{
    public Vehicle getVehicle();
}

class TataFactory implements AbstractFactory{
    public Vehicle getVehicle(){
        return new Tata();
    }
}
class FOrdFactory implements AbstractFactory{
    public Vehicle getVehicle(){
        return new Ford();
    }
}

class MainClass{
    psvm(String args[]){
        //create factory to get car
    }
}
``

---

## OAuth2 Cognito



---

### 999. Cognito {#section-999}

> **📁 Topic: OAuth2 cognito**

## ✅ What Is a Cognito User Pool?
A User Pool in AWS Cognito is a user directory and authentication service — it's more than just a place to store users.

| Capability                 | Is It Supported? | Notes                                                |
| -------------------------- | ---------------- | ---------------------------------------------------- |
| Store users                | ✅ Yes            | Stores username, email, phone, and custom attributes |
| Signup (Email/Password)    | ✅ Yes            | Supports self-signup or admin-triggered signup       |
| Sign-in (authentication)   | ✅ Yes            | Verifies user credentials and returns tokens         |
| Forgot password (reset)    | ✅ Yes            | Sends email/SMS with code or link                    |
| Email/Phone verification   | ✅ Yes            | Verifies contacts at signup or later                 |
| Social login (Google, etc) | ✅ Yes (with IdP) | Via Hosted UI or federated IdP config                |
| MFA / OTP support          | ✅ Yes            | SMS, TOTP (e.g., Google Authenticator)               |
| Custom attributes          | ✅ Yes            | You can add fields like `accountId`, `role`, etc.    |
| Hosted UI                  | ✅ Optional       | AWS-hosted login/signup UI with theme customization  |

---

### 999. Jwks {#section-999}

> **📁 Topic: OAuth2 cognito**

## ✅ What is JWKS?
- JWKS is a public set of keys used to verify JWT tokens (ID tokens or access tokens).

- It’s typically hosted at a well-known endpoint, e.g.,
https://cognito-idp.<region>.amazonaws.com/<userPoolId>/.well-known/jwks.json

- Contains public keys only (no secrets)

- Tokens are signed by a private key, and verified using a public key from JWKS.

## 🔐 How Verification Works (Step-by-Step)

```sql
Client (Angular)      Cognito              Backend API           JWKS Endpoint
    |                     |                     |                      |
    | -- login/signup --> |                     |                      |
    |                     | -- signs JWT ------> |                      |
    |                     |                     |                      |
    | <-- token (JWT) --- |                     |                      |
    |                     |                     |                      |
    | --- token ------->                         |                      |
    |                     |                     |                      |
    |                     |                     | -- get JWKS -------> |
    |                     |                     | <-- jwks.json ------|
    |                     |                     |                      |
    |                     |                     | -- verify JWT using public key
```

---

#### 0. Vdo Upload {#section-0}

> **📁 Topic: HLD\VideoUpload**

# 🚀 Efficient & Fast Video Upload Approaches

Uploading large video files efficiently requires **reducing latency, improving reliability, and optimizing network usage**. Here are the best strategies:

---

## 1️⃣ Direct Upload (Basic HTTP Upload)
✅ **Best for:** Small to Medium Files (**≤100MB**)  
Users upload the full video file using a simple **HTTP POST request**.
### Example
```http
POST /upload
Content-Type: multipart/form-data
File: myvideo.mp4
```
🔹 **Pros:**  
✔ Simple and easy to implement  
✔ Works well for small files  

🔹 **Cons:**  
❌ Slow for large files  
❌ Can fail if the connection drops  

---

## 2️⃣ Resumable Uploads (Chunked Uploads)
✅ **Best for:** Large Files (**100MB – 10GB**)  
Instead of uploading the entire file at once, the client splits it into **chunks** and uploads them sequentially.

🔹 **How It Works:**  
1. **Divide file** into chunks (e.g., **5MB per chunk**).  
2. **Upload each chunk** via an API request.  
3. **If the connection drops, resume from the last successful chunk**.  
4. **Reassemble chunks** at the backend.  
### Example
```http
POST /upload-chunk?chunkIndex=1
Content-Type: application/octet-stream
File-Chunk: chunk1.mp4
```
🔹 **Pros:**  
✔ Resumes failed uploads  
✔ Efficient for unstable networks  

🔹 **Cons:**  
❌ More backend complexity  
❌ Extra processing to merge chunks  

📌 **Examples:**  
- **Tus Protocol** (Open-source resumable upload protocol)  
- **AWS S3 Multipart Upload**  

---

## 3️⃣ Direct-to-S3 Upload (Presigned URLs)
✅ **Best for:** **Cloud-Based Storage, Large Files**  
Instead of sending files through your server, users upload **directly to S3**, reducing server load.

🔹 **How It Works:**  
1. **Backend generates a presigned URL** for a specific file.  
2. **Client uploads directly to S3** using this URL.  
### 📌 Example Generate Presigned URL (Node.js)
```js
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const params = { Bucket: 'my-bucket', Key: 'video123.mp4', Expires: 3600 };
const uploadUrl = s3.getSignedUrl('putObject', params);
console.log(uploadUrl);
```
### 📌 Client Uses Presigned URL
```http 
PUT https://s3.amazonaws.com/my-bucket/video123.mp4
Content-Type: video/mp4
```
🔹 **Pros:**  
✔ No load on your server  
✔ Extremely fast and scalable  
✔ Works well with **S3 Multipart Upload**  

🔹 **Cons:**  
❌ Requires **S3 bucket setup**  
❌ No **custom validation before upload**  

---

## 4️⃣ WebRTC DataChannel Upload (Peer-to-Peer)
✅ **Best for:** **Real-Time Video Uploads (Low Latency)**  
Uses **WebRTC DataChannels** to upload **directly to a peer or media server** without HTTP overhead.

🔹 **How It Works:**  
1. **Establish a WebRTC connection** between client and server.  
2. **Transfer video data peer-to-peer**.  
3. **Server receives and stores the video**.  

🔹 **Pros:**  
✔ Lower latency than HTTP  
✔ Reduces bandwidth usage  

🔹 **Cons:**  
❌ Requires **WebRTC support**  
❌ Harder to implement  

---

## 5️⃣ UDP-Based Uploads for High-Speed Transfer
✅ **Best for:** **Large-Scale Video Platforms (YouTube, Netflix)**  
Uses **UDP (instead of HTTP/TCP)** for ultra-fast data transfer, avoiding the overhead of TCP retransmissions.  
📌 **Example:** *Aspera (IBM’s High-Speed UDP-Based Transfer)*  

🔹 **Pros:**  
✔ **10-100x faster** than HTTP uploads  
✔ Handles **high-latency networks** well  

🔹 **Cons:**  
❌ Requires **special UDP-based servers**  
❌ Less common for web apps  

---

## 🔹 Comparison of Upload Methods

| **Method**         | **Speed**   | **Reliability** | **Best For** |
|-------------------|------------|----------------|-------------|
| **Basic HTTP Upload** | 🟡 Medium  | 🟡 Low  | Small files (<100MB) |
| **Chunked Upload** | 🟢 High  | 🟢 High  | Large files, slow networks |
| **S3 Direct Upload** | 🟢 High  | 🟢 High  | Cloud storage, large files |
| **WebRTC Upload** | 🔵 Very High  | 🔵 High  | Real-time low-latency uploads |
| **UDP-Based Uploads** | 🔵 Super Fast  | 🔵 High  | Large-scale video platforms |

---

## 🚀 Which Upload Method Should You Use?

📌 **For Small Files (≤100MB)** → Basic HTTP Upload  
📌 **For Large Files (100MB – 10GB)** → Chunked Uploads or S3 Direct Upload  
📌 **For Cloud Storage (S3, Google Cloud, Azure)** → **Presigned URLs (S3 Direct Upload)**  
📌 **For Low-Latency Streaming** → **WebRTC or UDP-based transfers**  

---

---

#### 1. Vdo Large File Upload S3 Presigned {#section-1}

> **📁 Topic: HLD\VideoUpload**

## **🔹 Uploading Large Files to S3 Using Pre-Signed URLs and Multipart Upload**  

The process involves **splitting the file into chunks**, uploading them **in parallel**, and then **finalizing** the upload.  

---

## **🔹 Step-by-Step Process**  

### **1️⃣ Backend: Generate Pre-Signed URLs for Each Chunk**
`Front end calulates total file size and decides total chunks based on size.`

Your **backend (Lambda, API Gateway, or an EC2 instance)** will generate a pre-signed URL for each chunk of the file.  

✔ **Initiate Multipart Upload** → Get an `UploadId` from S3.  
✔ **Generate Pre-Signed URLs** for each chunk.  
✔ **Send URLs to the frontend.**  

#### **🔹 Backend (Node.js - Generate Pre-Signed URLs)**
```javascript
import AWS from "aws-sdk";

const s3 = new AWS.S3();
const BUCKET_NAME = "my-large-files-bucket";

export async function handler(event) {
    const { fileName, totalChunks } = JSON.parse(event.body);

    // Step 1: Initiate Multipart Upload
    const multipartUpload = await s3.createMultipartUpload({
        Bucket: BUCKET_NAME,
        Key: fileName,
    }).promise();

    const uploadId = multipartUpload.UploadId;
    console.log("Upload ID:", uploadId);

    // Step 2: Generate pre-signed URLs for each chunk
    const presignedUrls = await Promise.all(
        Array.from({ length: totalChunks }, async (_, i) => {
            return await s3.getSignedUrlPromise("uploadPart", {
                Bucket: BUCKET_NAME,
                Key: fileName,
                UploadId: uploadId,
                PartNumber: i + 1, // 1-based index
                Expires: 3600, // URL valid for 1 hour
            });
        })
    );

    return {
        statusCode: 200,
        body: JSON.stringify({ uploadId, presignedUrls }),
    };
}
```

---

### **2️⃣ Frontend: Split the File & Upload Chunks**
✔ **Read file in chunks (e.g., 10MB each).**  
✔ **Use Fetch/Axios to upload each chunk via pre-signed URLs.**  
✔ **Keep track of uploaded parts.**  

#### **🔹 Frontend (React/JavaScript - Upload Chunks)**
```javascript
async function uploadFile(file) {
    const chunkSize = 10 * 1024 * 1024; // 10MB
    const totalChunks = Math.ceil(file.size / chunkSize);

    // Step 1: Request Pre-Signed URLs from Backend
    const response = await fetch("/generate-presigned-urls", {
        method: "POST",
        body: JSON.stringify({ fileName: file.name, totalChunks }),
    });

    const { uploadId, presignedUrls } = await response.json();

    const uploadedParts = [];

    // Step 2: Upload each chunk
    for (let i = 0; i < totalChunks; i++) {
        const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize);

        await fetch(presignedUrls[i], {
            method: "PUT",
            body: chunk,
            headers: { "Content-Type": "application/octet-stream" }
        });

        uploadedParts.push({ PartNumber: i + 1, ETag: "etag-placeholder" }); // Store ETag from response
    }

    // Step 3: Complete Multipart Upload
    await fetch("/complete-upload", {
        method: "POST",
        body: JSON.stringify({ fileName: file.name, uploadId, uploadedParts }),
    });

    console.log("Upload Complete!");
}
```

---

### **3️⃣ Backend: Complete Multipart Upload**
✔ **Once all chunks are uploaded, call S3 to merge them into a complete file.**  
✔ **Pass `UploadId` and the list of `ETags` received from each chunk.**  

#### **🔹 Backend (Node.js - Complete Upload)**
```javascript
export async function completeUpload(event) {
    const { fileName, uploadId, uploadedParts } = JSON.parse(event.body);

    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        UploadId: uploadId,
        MultipartUpload: { Parts: uploadedParts },
    };

    await s3.completeMultipartUpload(params).promise();
    
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Upload Complete!" }),
    };
}
```

---

## **🔹 Summary: Flow of Multipart Upload**
| **Step** | **Description** |
|----------|---------------|
| **1. Backend generates pre-signed URLs** | Create `UploadId` and pre-signed URLs for each chunk. |
| **2. Frontend uploads each chunk** | Splits file and uploads chunks via pre-signed URLs. |
| **3. Backend completes upload** | Calls `completeMultipartUpload()` to merge chunks. |

---

## **🔹 Key Benefits of This Approach**
✅ **Handles Large Files (up to 5TB)**  
✅ **Uploads in Parallel (Faster Uploads)**  
✅ **Resumable Uploads (If a part fails, retry that chunk only)**  
✅ **Optimized for Low Network Speed (Retries only failed chunks instead of re-uploading the whole file)**

---

### 1 Creation Pattarns



---

#### 2. Vdo Large File Upload S3 Lambda {#section-2}

> **📁 Topic: HLD\VideoUpload**

# Large File Upload to S3 Using Pre-Signed URLs & Processing with Lambda

## **🔹 Overview**
This guide explains how to **upload large files to Amazon S3** using **multipart upload** with **pre-signed URLs** and how to **trigger an AWS Lambda function** after the upload to process the video.

---

## **🔹 Step 1: Backend - Generate Pre-Signed URLs for Multipart Upload**
`Front end calulates total file size and decides total chunks based on size.`

Your **backend (Lambda, API Gateway, or an EC2 instance)** generates a **pre-signed URL** for each chunk of the file.

### **Backend Code (Node.js - Generate Pre-Signed URLs)**
```javascript
import AWS from "aws-sdk";

const s3 = new AWS.S3();
const BUCKET_NAME = "my-large-files-bucket";

export async function handler(event) {
    const { fileName, totalChunks } = JSON.parse(event.body);

    // Step 1: Initiate Multipart Upload
    const multipartUpload = await s3.createMultipartUpload({
        Bucket: BUCKET_NAME,
        Key: fileName,
    }).promise();

    const uploadId = multipartUpload.UploadId;

    // Step 2: Generate pre-signed URLs for each chunk
    const presignedUrls = await Promise.all(
        Array.from({ length: totalChunks }, async (_, i) => {
            return await s3.getSignedUrlPromise("uploadPart", {
                Bucket: BUCKET_NAME,
                Key: fileName,
                UploadId: uploadId,
                PartNumber: i + 1, // 1-based index
                Expires: 3600,
            });
        })
    );

    return {
        statusCode: 200,
        body: JSON.stringify({ uploadId, presignedUrls }),
    };
}
```

---

## **🔹 Step 2: Frontend - Upload File in Chunks**
The frontend **splits the file** into **chunks (e.g., 10MB each)** and **uploads each chunk** using the **pre-signed URLs**.

### **Frontend Code (JavaScript - Upload Chunks)**
```javascript
async function uploadFile(file) {
    const chunkSize = 10 * 1024 * 1024; // 10MB
    const totalChunks = Math.ceil(file.size / chunkSize);

    // Step 1: Request Pre-Signed URLs from Backend
    const response = await fetch("/generate-presigned-urls", {
        method: "POST",
        body: JSON.stringify({ fileName: file.name, totalChunks }),
    });

    const { uploadId, presignedUrls } = await response.json();
    const uploadedParts = [];

    // Step 2: Upload each chunk
    for (let i = 0; i < totalChunks; i++) {
        const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize);
        await fetch(presignedUrls[i], {
            method: "PUT",
            body: chunk,
            headers: { "Content-Type": "application/octet-stream" }
        });
        uploadedParts.push({ PartNumber: i + 1, ETag: "etag-placeholder" });
    }

    // Step 3: Complete Multipart Upload
    await fetch("/complete-upload", {
        method: "POST",
        body: JSON.stringify({ fileName: file.name, uploadId, uploadedParts }),
    });
}
```

---

## **🔹 Step 3: Backend - Complete Multipart Upload**
Once all chunks are uploaded, the backend calls **S3 to merge the chunks**.

### **Backend Code (Node.js - Complete Upload)**
```javascript
export async function completeUpload(event) {
    const { fileName, uploadId, uploadedParts } = JSON.parse(event.body);

    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        UploadId: uploadId,
        MultipartUpload: { Parts: uploadedParts },
    };

    await s3.completeMultipartUpload(params).promise();
    
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Upload Complete!" }),
    };
}
```

---

## **🔹 Step 4: Trigger Lambda After Upload to Process Video**
Once the file is successfully uploaded, we can **trigger a Lambda function** via an **S3 event notification**.

### **Enable S3 Event Notification to Trigger Lambda**
1. Go to your **S3 Bucket** in AWS Console.
2. Navigate to **Properties** → **Event Notifications**.
3. Create a new event notification:
   - **Event Type:** `PUT`
   - **Prefix:** `videos/` (if applicable)
   - **Send To:** AWS Lambda
   - **Lambda Function:** `video-processing-lambda`

---

## **🔹 Step 5: Process Video in Lambda**
Lambda will receive an event containing the uploaded video details and trigger **FFmpeg (running on EC2, ECS, or AWS Batch)** to convert it into multiple resolutions.

### **Lambda Code to Process Video**
```javascript
export async function handler(event) {
    console.log("S3 Event: ", JSON.stringify(event, null, 2));
    
    const s3Event = event.Records[0].s3;
    const bucket = s3Event.bucket.name;
    const key = decodeURIComponent(s3Event.object.key.replace(/\+/g, " "));

    console.log(`Processing video: ${bucket}/${key}`);
    
    // Trigger an ECS Fargate Task, EC2 instance, or AWS Batch job to process the video using FFmpeg
    // Example: Send a message to SQS for an ECS service to pick up
    
    return { statusCode: 200, body: "Processing started." };
}
```

---

## **🔹 Summary**
| **Step** | **Description** |
|----------|---------------|
| **1. Generate Pre-Signed URLs** | Backend provides URLs for uploading file chunks. |
| **2. Upload File in Chunks** | Frontend splits file and uploads each chunk to S3. |
| **3. Complete Multipart Upload** | Backend merges chunks into a full file. |
| **4. Trigger Lambda on Upload** | S3 event triggers Lambda to process video. |
| **5. Process Video** | Lambda sends video to FFmpeg (via ECS/EC2) for conversion. |

---

## **🔹 Benefits of This Approach**
✅ **Handles Large Files (up to 5TB)**  
✅ **Parallel Uploads (Faster & Efficient)**  
✅ **Event-Driven Processing (S3 → Lambda → ECS)**  
✅ **Optimized for Cost & Performance**  

---

---

### 2 Behavioural Pattarns



---

### Src



---

### Target



---

### SNS Push Notifications



---

#### 999. Sns Push Notifications {#section-999}

> **📁 Topic: HLD\SNS Push notifications**

![Push notifcations](SNS_Push_Notifications.jpg)

## Push Notifications General Flow :
```text
[ANDROID/IOS : Device Token + user_id] -->  SNS Topic Object [ARN] (API key is used when creating Topic in AWS Console)
 --> Add User [Device Token +userId] --> Get New ARN for Device --> Save to DB 
```

# General Scenario :
### 1. ANDROID/IOS: Device Token + user_id:

- When a user installs the mobile app and registers for notifications, the mobile app requests a device token from the respective platform:
  - Android: Firebase Cloud Messaging (FCM) provides a device token.
  - iOS: Apple Push Notification Service (APNS) provides a device token.
- This device token, along with the user_id, is sent to your backend system.
### 2.SNS Topic Object [ARN] (API key used when creating the topic): Platform Application ARN

- In the AWS Console or using the AWS SDK, you create an **SNS Platform Application [for Topics]** for both iOS (APNS) and Android (FCM).
- This `Platform Application` has an Amazon Resource Name (ARN), and when you create it, you provide the API keys for the respective notification services (APNS or FCM).
- Each **Platform Application ARN is tied to a specific app and device type (Android or iOS) : Platform Endpoint ARN**.
### 3.Add User [Device Token + userId]:

- After receiving the device token from the app, your backend can use AWS SNS to create a **Platform Endpoint for that 'specific device token'**.
- The **"device token"** and userId are linked, and an **Endpoint ARN is created in SNS**. Each device token has its own unique Platform Endpoint ARN.
### 4.Get New ARN for Device: Platform Endpoint ARN

- When you call the createPlatformEndpoint API (or use the console), AWS SNS generates a **new "Platform Endpoint ARN" for that specific device token**.
- This Platform Endpoint ARN is used to send notifications to that particular device.
- If the device token is invalidated (e.g., due to app uninstall/reinstall), a new Platform Endpoint ARN needs to be created.
### 5.Save to DB:

- The Platform Endpoint ARN is saved to your database, along with the user_id and possibly other metadata (e.g., device type).
- This allows you to associate each user's device(s) with the respective ARN(s) for future push notifications.


# Detailed Example of the Process:

### 1. Mobile App Registration:

- App on Android/iOS sends the device token and user information (e.g., user_id) to your backend.
```json
{
  "user_id": "12345",
  "device_token": "abc123token",
  "platform": "iOS" // or "Android"
}
```
### 2. Create Platform Endpoint ARN (AWS SNS):
- Using the createPlatformEndpoint API, the backend creates an endpoint for the received device token and user ID.
- AWS SNS accepts the device token without immediate validation.
- **SNS generates a Platform Endpoint ARN regardless of whether the device token is valid at the time of creation**.
```js
const createPlatformEndpoint = async (platformArn, deviceToken, userId) => {
  const params = {
    PlatformApplicationArn: platformArn,  // ARN for APNS or FCM
    Token: deviceToken,                   // Device token from mobile app
    CustomUserData: userId                // Optional: Add user_id as custom data
  };

  try {
    const data = await sns.createPlatformEndpoint(params).promise();
    return data.EndpointArn;
  } catch (error) {
    console.error('Error creating endpoint:', error);
  }
};
```
### 3. Save Platform Endpoint ARN to Database:
- The returned Endpoint ARN is saved to the database along with the user_id for future reference.
```json
{
  "user_id": "12345",
  "platform_endpoint_arn": "arn:aws:sns:us-east-1:123456789012:endpoint/APNS/MyApp/abc123"
}
```
### 4.Send Notifications Using ARN:

- When sending notifications, you can look up the user's Platform Endpoint ARN in the database and send messages directly to their device using SNS:
```js
const sendNotification = async (endpointArn, message) => {
  const params = {
    TargetArn: endpointArn,  // Use the saved ARN from DB
    Message: JSON.stringify({
      default: message,      // Fallback for all platforms
      APNS: JSON.stringify({
        aps: { alert: message }  // Payload for iOS devices
      }),
      GCM: JSON.stringify({
        notification: { text: message }  // Payload for Android devices
      })
    }),
    MessageStructure: 'json'
  };

  await sns.publish(params).promise();
};
```

## Full Flow Diagram:
```
1. App → Gets Device Token (via APNS/FCM).
2. App → Sends Device Token + user_id to Backend.
Backend → Calls SNS createPlatformEndpoint with the Device Token.
3. SNS → Returns Platform Endpoint ARN for that device.
4. Backend → Saves Platform Endpoint ARN with user_id to DB.
5. Backend → Uses Platform Endpoint ARN to send push notifications via SNS.
```
## Key Components:
1. `Platform Application ARN`: Created for iOS (APNS) and Android (FCM). Provides the link to each platform.
2. `Device Token`: Unique per app install on each device. Used to target specific devices.
3. `Platform Endpoint ARN`: Created per device token using createPlatformEndpoint. Used to send notifications.
4. `user_id`: Used to associate device tokens/ARNS with specific users.

## Summary:
Your scenario is a typical flow for integrating mobile push notifications with AWS SNS:

- Device token + user ID from mobile apps are registered with SNS.
- SNS generates an ARN (`Platform Endpoint`) for each device.
- This ARN is stored in a database, associated with the user ID.
- The ARN is used to send targeted push notifications to the device.

This flow ensures seamless and targeted notifications to users' mobile devices, supporting iOS and Android platforms through AWS SNS.
#
## 1. Platform Application ARN:

- When you create a platform application in AWS SNS, you specify whether it's for APNS (iOS devices) or FCM (Android devices). Each platform will have its own ARN.
- The Platform Application ARN essentially tells AWS SNS which notification service to use (APNS for iOS or FCM for Android).
- For example:
    - APNS ARN (for iOS devices):
        - `arn:aws:sns:us-east-1:123456789012:app/APNS/MyIOSApp`
    - FCM ARN (for Android devices):
        - `arn:aws:sns:us-east-1:123456789012:app/GCM/MyAndroidApp`

## 2. Platform Endpoint ARN:

- After you create a platform application, you use it to register individual devices (using their device tokens) with AWS SNS. This creates a Platform Endpoint ARN for each device.
- Each Platform Endpoint ARN is linked to the specific platform (APNS for iOS, FCM for Android) and the device.
- For example:
    - iOS Device Endpoint ARN:
      - `arn:aws:sns:us-east-1:123456789012:endpoint/APNS/-MyIOSApp/device123`
    - Anroid Device Endpoint ARN:
      - `arn:aws:sns:us-east-1:123456789012:endpoint/GCM/MyAndroidApp/device456`
  
## 3. SNS Message Sending:

- When you send a notification, you use the Platform E# 3.ndpoint ARN (associated with the device) to specify which device to send the message to.
- AWS SNS automatically uses the Platform Application ARN within the Endpoint ARN to determine whether the notification should be routed to APNS (for iOS) or FCM (for Android).

# Workflow Example:
1. You create two platform applications in AWS SNS:

   - One for APNS (iOS) using the APNS API key.
   - One for FCM (Android) using the FCM API key.
2. When a device token is registered:

   - If it's an iOS device, you use the APNS Platform ARN to create a Platform Endpoint for that token.
   - If it's an Android device, you use the FCM Platform ARN to create a Platform Endpoint for that token.
3. AWS SNS automatically routes the notifications based on the Platform ARN:

   - For iOS, the notification is sent through APNS.
   - For Android, the notification is sent through FCM.

---

### Spotify



---

#### 999. Spotify Design {#section-999}

> **📁 Topic: HLD\spotify**

![Spotify Design](Spotify_design.jpg)

# Spotify Design 
## Functional Requirement :
- Users : 1B
- DAU : 200M
- SONGS: 100M
- 1. can search & play song (Live + Local cache + System Cache)
- 2. Playlist


## Non-Functional Requirement :
- Latency
- Availablity
- Consistency
- Resiliance : can recover in no time after failure
- Durability : Data should be safely stored even in case of service failures.

## Database Requirment :
### Tables : 
1. User  : [name, user_id,.etc]
2. Artist : [name, artist_id,]
3. Albums : [name, album_id, desc, artist_id, release date,.etc]
4. Songs_meta_data : [songs_id,artist_id, album_id, song_file_location,etc]
5. Playlist : [user_id, song_id,playlist_name,etc]

 - 1 User : 500  bytes
 - 1 song : 5 MB
 - 1 songs_meta_data : 1 kb
 - 1 artists : 1 kb
 - 1 album : 1 kb
 -  playlist : 1 kb

>  ### DB Requirement Calac :
 - users : 1B x 500bytes : 0.5TB
 - songs : 5MB x 100M : 500 TB ->  0.5PB
 - songs_meta : 1 Kb x 200 M=200 GB
 - artists : 0.5M x 1 kb= 0.5 GB
 - albums : 0.1M x 1kb = 0.1 GB
 - Playlist : 1kb [size] X 1B [users] X 30 [Max_Playlist] = 1TBx30 =  30TB
 - TOTAL : 505 TB + 201 GB + 30TB = 536 TB
   
## Latency & Throughout :
- read req : 10 read req/user
- write : 1M artist : 10k artists uploading files daily
  -  10k artists & update data 1M req: = 1M w req/ day
- Read Latency : (200M x 10)/(24 x 60 x 60) =2000M/10^5= 20K req/sec (approx.)
- Write Latency : 1 M /10^5 = 10 req/sec approx.
- TOTAL Throughput : read latency + write latency = 20k + 10 = 20k/sec approx
- at Peak hours : 
  - 1B user = 600 M users active
  - Read = 100 read/user
  - Read Latency : 600M X 15 /10^5 = 90K req/sec
  - write = 100M  w/day = 100 M/10^5= 1k req/sec
  - total throughput = 91k/sec

---

### TangoIntigration



---

### VideoStreamApp



---

#### 999. Design {#section-999}

> **📁 Topic: HLD\VideoStreamApp**

## Requirement
1. Can upload Video
2. Can serach and play Video

## Video Upload :
### 1. Process:
   - Request flow: 
   1. Read video data from device 
   2. Get details : based on size decide count of chunks required --> send to backend
   3. backend : save video details create uuid send in reponse
   4. front end : divide video in chunks +uuid + checksum for each chunk --> to Backend
   5. Backend : save chunk in storage/blob : video_name/chunk_id_or_slide/chunk_id_vdo.mp4
   6. Backend : send response after saving this to storage 
   7. if not saved frontend will resend based on previous response

## 1. Video Upload Architecture
### Initial Metadata Request
###  Client Side:w

- The client sends a request to the backend with video metadata (resolution, size, format, etc.).
- The backend responds with a pre-signed URL or upload token for initiating chunk uploads.
### Backend Side:

- Validate the metadata.
- Generate an identifier for the video (e.g., video_id or UUID).
- Use a distributed cache like Redis to store intermediate metadata (e.g., upload progress, chunk order).
## Chunked Upload Design
### Chunking Strategy:

- Splitting based on size (e.g., 20MB per chunk) is generally more efficient than time-based splitting.
- Use binary data for chunks to ensure compatibility with streaming and storage systems.
### Client to Backend Upload:

- Send each chunk with metadata:
```json
{
  "video_id": "1234",
  "chunk_index": 1,
  "total_chunks": 5,
  "chunk_data": "<binary_data>"
}
```
### Backend Processing:

- Validate and store each chunk in temporary storage (e.g., S3/Blob Storage) with a structure like:

```bash
video_name/resolution/temporary/chunk_1
video_name/resolution/temporary/chunk_2
```
- Use a message queue (e.g., SQS, RabbitMQ, or Kafka) to enqueue chunk processing tasks:

- Ensure each task has video_id and chunk_index.
- Leverage worker threads or serverless functions (e.g., AWS Lambda) to ### process chunks sequentially.
### Completion Notification:

- When the final chunk is uploaded, the client sends a completion request.
- Backend validates chunk integrity and sequence before merging.

## Chunk Merging
- Merge chunks into a single video file after receiving the completion request.
- Use ffmpeg or a similar library to handle video merging efficiently:
```bash
ffmpeg -f concat -safe 0 -i file_list.txt -c copy output.mp4
```
- Where file_list.txt contains:
```
file 'chunk_1'
file 'chunk_2'
```
## Load Balancing and Routing
### Routing Mechanism for Multi-Instance Backend:

- **Use a distributed lock mechanism like Redis Redlock to assign one video upload to a specific server instance**.
- Alternatively, implement a **consistent hashing mechanism to route requests to the same server**.
### Auto-Scaling:

- Use cloud-based scaling solutions like AWS ECS/Fargate or Azure Scale Sets to scale worker instances based on queue length.

---

### VideoUpload



---

#### Main



---

#### Classes



---

#### Test Classes



---

##### Java



---

##### Com



---

###### Com



---

###### Example



---

###### LLD



---

###### Example



---

###### LLD



---

###### Patterns



---

###### Patterns



---

###### ObserverPattern



---

###### StateDesign



---

###### ObserverPattern



---

###### 999. Patterns {#section-999}

> **📁 Topic: demo\src\main\java\com\LLD\Patterns\ObserverPattern**

https://notebook.zohopublic.in/public/notes/bietvc07e6ecf28d7409286145c16e623f9ed

---

###### StateDesign



---

###### Observable



---

###### Observer



---

###### Observable



---

###### Observer



---

## 🎯 Summary

This comprehensive guide covers all aspects of distributed systems, providing practical examples and best practices for real-world implementation.

## 🔗 Related Topics

- [All Categories](/categories/)
- [Technical Collections](/collections/)
- [Latest Posts](/)

---

*📝 **Note:** This guide consolidates multiple learning materials into a single comprehensive resource. Each section represents hands-on learning and practical implementation experience.*
