---
layout: post
title: "Welcome to TCP/IP Protocol Suite Course"
date: 2025-07-21
categories: [networking, nvidia-coursera-network]
tags: [javascript, database, networking]
author: "GGurkhude"
excerpt: "Learning notes on welcome to tcp/ip protocol suite course"
original_path: "2_Networking/Nvidia_coursera_network/2_TCP_IP_.md"
---

# Welcome to TCP/IP Protocol Suite Course

In this course, we will introduce some of the most used TCP/IP protocols from a top-down perspective. 

## Course Outline

1. **Application Layer Protocols**: We will start with application layer protocols such as HTTP and FTP.
2. **Transport Layer Protocols**: Next, we will move on to TCP and UDP.
3. **Internet Layer Protocol**: Lastly, we will present IP, the Internet layer protocol, and some supplemental IP services that are crucial to IP-based networks.

Remember, the main goal of having a network is data transfer.

## Understanding Application Communication

Let's see how it works. We have two remote applications that generate messages, and these messages are exchanged between the two applications. For the applications to understand each other, they must implement the same protocol.

### Example: Web Browser and Server

One example of this concept would be using a web browser to view web pages. On one end, the application is the web browser, and on the other end, the application is the web server. When the user inserts the web page address in the browser's address bar, in the background, it is converted to a request in a format that the web server can understand. Once the request is received by the server, it responds with page details in a format that the browser can present in text or links.

### Application Layer Protocols

There are many different applications with different purposes and requirements. For each application, there is an application layer protocol that provides the interface to the networking services. Whenever an application layer protocol wishes to communicate with a remote application, it hands over the data to the transport layer.

### Transport Layer Protocols

Some application layer protocols use TCP as the transport layer, while others prefer UDP. More information on TCP and UDP will be provided in the next section.

We have previously used the example of a web browser asking for a web page from a web server. For the communication between the two to happen, both the web browser and server must implement the same application layer protocol. This protocol is called HTTP (Hypertext Transfer Protocol), which allows the exchange of text and hyperlinks. It also has a secure variant called HTTPS. HTTP functions as a request-response protocol in the client-server computing model. The client submits an HTTP request message to the server, which provides resources such as HTML files and other content types, and returns a responding message to the client. The response contains the request completion status information and may also contain requested content in its message body.

## FTP Protocol

FTP (File Transfer Protocol) is an application layer protocol used to transfer files between hosts. FTP users may connect anonymously if the server is configured to allow it, or may authenticate themselves with a clear-text sign-in protocol, normally in the form of a username or password. FTPs can be used for secure transmission that protects the username and password and also encrypts the content.

## Transport Layer Protocols

For communication between two applications to happen, the messages are formatted into an application layer protocol. The next step is for the application layer protocol to ask transport layer services. Transport layer protocols are responsible for establishing end-to-end logical communication channels between the source application and the destination application. The functions of the transport layer are facilitating the communicating hosts to carry on a conversation, providing an interface for the users to the underlying network. If needed, it can provide a reliable connection. It can also carry out error checking, flow control, and verification. The two most commonly used protocols are TCP and UDP.

### TCP Protocol

TCP (Transmission Control Protocol) is a reliable connection-oriented transport protocol. Connection-oriented means that a connection is established between the peer entities prior to transmission. To assure data transfer reliability, TCP uses sequence numbers and acknowledgments to recover from damaged or lost data. Another important mechanism provided by the TCP is flow control. The flow control allows a busy receiver to govern the amount of data sent by the sender. TCP uses a window size to indicate the allowed number of bytes the sender may transit before receiving further permission. Lastly, TCP sequence numbers are used to order segments, hence providing order delivery. All those mechanisms have multiple advantages and indeed, many applications that require reliability use TCP as their transport layer protocol. However, there is a trade-off as it is associated with overhead, and therefore data transfer slows down.

### TCP Connection Management

For applications that require fast lightweight transport service, TCP may not be the best choice. When a client needs to connect to a remote server using TCP, first, a connection must be established. Once a connection is established, data can be transferred. TCP uses a keep-alive feature to keep connections open and manage them. The keep-alive feature verifies that the peer at the other end of a connection is still available. After the data is transmitted, the session is terminated and the allocated resources are released.
## TCP/IP Network Connection: Three-way Handshake

A three-way handshake is a method used in a TCP/IP network to create a connection between peers. It is a three-step method designed to allow both communicating ends to initiate and negotiate the parameters of their connection before data such as HTTP and SSH is transmitted. It requires both peers to exchange three synchronization and acknowledgment messages before actual data communication begins.

1. **Step 1**: The client sends a synchronization message to the server. The objective of this message is to ask or infer if the server is open for new connections.
2. **Step 2**: When the server receives the synchronization message from the client, it responds and returns a confirmation receipt. The acknowledgment message or SYN ACK message. This acknowledgment indicates that the server correctly acknowledged the client's message in that it is sending its own synchronization to be acknowledged as well.
3. **Step 3**: The client receives the SYN ACK from the server and responds with its own acknowledgment message. Each side must acknowledge the synchronization message of the other side. Upon completion of this process, the connection is created and the client and server can communicate.

## TCP: A Reliable Protocol

TCP is reliable since the protocol ensures that data is not damaged, lost, duplicated, or delivered out of order. Otherwise, it must recover it. TCP ensures that all data is fully transmitted and can be assembled by the receiver in the correct order. TCP achieves this reliability by assigning a sequence number to each byte transmitted and requiring a positive acknowledgment from the receiving peer. If the acknowledgment is not received within the timeout interval, the data is re-transmitted. At the receiver, the sequence numbers are used to correct the order of segments that may be received out of order and to eliminate duplicates.

### Example: Sequence and Acknowledgment Numbers

Let's see a small example of how sequence and acknowledgment numbers are used. For this specific example, we will assume that when the session was established, it was agreed that the segment size is 10 bytes, and that the sender can send 30 bytes before expecting to receive an acknowledgment from the receiver.

In our example, the sender sends three segments of 10 bytes each. The sequence for the first segment is zero, representing the first 10 bytes numbered 0-9. The sequence number for the second segment is 10, representing bytes 10 through 19. The sequence number for the third segment is 20, representing bytes 20 through 29. If the first three segments or 30 bytes numbered 0-29 were correctly received within a defined interval, the receiver will send acknowledgment Number 30, indicating it is expecting Byte Number 30 to be received. Now, let's assume that the second segment arrived damaged or got lost. In that case, the receiver would ask for its re-transmission by sending back ACK Number 10, telling the sender it is expecting byte Number 10. This is a very simplified example just to convey the idea of how TCP uses sequence and acknowledgment numbers to provide reliability. Also, we've shown only one side of the communication. But since TCP sessions are bidirectional, data is sent in both directions.

## TCP Flow Control

Another mechanism provided by TCP is flow control. Flow control is a process of managing the rate of data transmission between two nodes to prevent a fast sender from overwhelming a slow receiver. The idea is that the receiver will send feedback to the sender to let it know about its current condition. To control the amount of data that the sender sends, the receiver will advertise its receive Window size, that is the spare room in the receiver buffer, or the number of bytes it is prepared to receive before an acknowledgment is sent. It is important to notice that the Window size is dynamically adjusted, increased or decreased as needed. Once again, we have seen only one side of the communication. But since TCP sessions are bidirectional, data is sent and received in both directions. This means that each side controls its receive Window size independently.

## TCP/IP vs UDP

While TCP provides many mechanisms for reliability, it comes at a cost. TCP consumes more resources, uses more network bandwidth, and results in slower transfers. The User Datagram Protocol (UDP), on the other hand, allows applications to transfer data with minimum protocol overhead. With UDP, data is continuously sent to the recipient, whether it is ready to receive it or not. Re-transmission of lost data is not supported, and packets may arrive out of order. UDP avoids the unnecessary overheads of TCP transport, making it incredibly efficient in terms of bandwidth and less demanding on poor performing networks. Although UDP is not ideal for sending an email, viewing a web page, or downloading a file, it is largely preferred for real-time applications like voice or video.

## Port Numbers in TCP/IP and UDP

One thing that TCP and UDP have in common is that they both use source and destination port numbers to identify the specific process within the local and remote nodes. The destination port is a well-known number identifying the service requested on the remote server. The source port is a dynamically allocated number, identifying the process that sends the data.

## Example: Using Port Numbers

Consider a single server that runs two services, HTTP and FTP. When a client generates a request targeted at that server, the client must specify which service is requested, either HTTP or FTP. In this example, the client generates an HTTP request for a webpage. When this request arrives at the server, it must be able to identify that it is an HTTP request and forward it to the HTTP service. Only the HTTP service can respond to the HTTP request. The request generated by the client, the destination port number is the field that identifies the service requested at the destination node. For HTTP, the well-known port number is 80. It is customary to say that HTTP servers listen to port 80. As you can see in the request generated by the client, a source port is also present. The source port is a dynamically allocated number identifying the process that sends the data since many active concurrent processes are supported. Please note that when the server responds, the destination and source port change places, so the HTTP server responses with source port 80 and the destination port of the sending process. Port numbers are 16-bit in size, hence ranging from 1-65,535, 0 is reserved. Port numbers in the range of 0-1023 are the well-known ports that are used by common TCP/IP applications.

## Internet Layer: IPv4

We are now ready to move on to the Internet layer. IPv4 is a network layer protocol. There is another version of IP known as IPv6, but it is outside the scope of this course. IP provides network services to Layer 4 protocols, such as TCP and UDP, and in return asks Layer 2 protocols to carry the packet over the physical medium. IP is a best effort protocol and hence relies on upper layer protocol mechanisms. As such, it does not include mechanisms for reliability, flow control, and sequencing. Just a reminder, the Internet layer provides the functions necessary to deliver a packet from a source to destination over an interconnected system of networks. While transport layer protocols operate end-to-end, Internet layer protocols operate between any two directly connected layer three nodes. An example, an end node, and it's directly connected router or a router and its neighboring router. In order to fulfill this function, Internet layer protocols should define the following Layer 3 addressing, Layer 3 packet format, routing functionalities, when routing occurs, one router after another or hop-by-hop.

## IP Addressing

In an IP network, every network interface of a node is assigned with an IP address. An IPv4 address is a sequence of 32-bits divided into four groups of 8-bits per group known as octets. For a more readable representation, the four octets are separated with dots and each octet is represented by decimal equivalent, also known as the dotted decimal notation. IP addresses contain two parts. Network address identifies the systems that are located on the same subnet and host address, which identifies a specific host within the subnet. All host in the same subnet share a common subnet address. Every router interface defines an IP subnet. In this example, we have a router with three network interfaces hence three subnets are defined. The network address for all host in subnet A is 192.168.1.0, where the fourth octet represents the host unique address within the subnet.

## Routing in IP Networks

Routing is the process of choosing the best path to reach a destination. A router is a computer that has been dedicated to the task of forwarding IP packets between networks. A router makes forwarding decisions based on its forwarding database called a routing table. The routing table includes entries that map remote IP networks to next hop routers that are identified by local interfaces. Routing occurs one router after another, or hop-by-hop.

This concludes the discussion on TCP/IP protocol suite. We've seen how the application layer protocol formats the message that needs to be carried over the network. The application layer protocol then requests transport services from the transport layer. The transport layer adds a Layer 4 header and requests network services from the network layer. The network layer IP adds a Layer 3 header. Now, the IP packet is ready to be carried over the physical medium. The specifics of that are defined in a network access layer. Even though IP is a medium independent protocol, meaning it can be carried over different media types, the most commonly used one is Ethernet. We'll cover the details of Ethernet in the next unit.