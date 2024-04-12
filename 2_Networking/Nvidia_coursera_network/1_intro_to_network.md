# Introduction to Network

## Network Components

1. **End Nodes**: These include compute, storage, and management nodes. They serve as the source or destination nodes.
2. **Intermediate Nodes**: These are switches and routers. They receive traffic generated from end nodes and decide where to forward the traffic.

## Connection of Network Components

Network components are connected using hardware Network Interface Cards (NICs) and cables.

## Communication Between Nodes

Communication between two nodes happens through a protocol suite, which is a group of protocols that run concurrently to implement network communication. Each protocol defines a common format and a set of rules for exchanging messages between devices.

## Network Models

- OSI Model
- TCP/IP Model

## Encapsulation of Data

At each layer of the network model, data is encapsulated and a header is added. There can be encoding, decoding, or formatting at different layers.

## Protocol Data Units (PDUs)

Encapsulated data at each layer is referred to as a Protocol Data Unit (PDU). Examples of PDUs include packets, segments, datagrams, or frames. Each layer in the OSI model is associated with different protocols, PDUs, addresses, and devices.

- **Application Layer (Layer 7)**: The PDU is referred to as a message or data.
- **Transport Layer (Layer 4)**: The data is encapsulated and a port number is added. The PDU is known as a TCP segment or UDP datagram at this stage.
- **Internet Layer (Network Layer, Layer 3)**: A header containing source and destination IP addresses is added (at router or mobile). The PDU is called a packet. Packets are forwarded on layer 3 devices, such as routers.
- **Data Link Layer (Layer 2)**: The header contains source and destination MAC addresses. The PDU is referred to as a frame. Frames are forwarded on layer 2 devices, such as switches.
- **Physical Layer (Layer 1)**: The data is transmitted as bits (0s and 1s).
### ============================================

# Network components :
1] End Nodes -compute, storage, mangement nodes 
   - these are source / destination nodes
2] Intermediate Nodes - switches and routers 
   - receives traffic generated from end nodes
   - makes decision where to forward traffic.
### ==========================================
How network component are conncted ? 
- using hardware NIC and cables
### ========================================
## How communcation between two nodes happen?
- Protocol suite : group of protocols that run
concurrently to implement network communication
- Each protocol defines a common format and
 set of rules for exchnaging messages between devices
### ======================================
OSI model 
TCP/IP model 
### ====================================
## Encapsulation of Data:
- at each layer data is encapsulated and a header
is added at each layer
- there can be encoding, decoding or formating 
at layers
### =====================================

# general
- Protocol Data Units [PDU]: enacpsulated data at each layer
  ex: packet,segment, datagram or frame is PDU
-Each layer in OSI model is associated with
different protocols, Protocol Data Units (PDU),
addresses and devices

## 7] Application Layer :  message : [DATA] 
   - message is called as DATA
## 4] Transport Layer : [TCP_PORT+DATA]   : TCP segment/UDP Datagram
   - Data is encapuslate also added PORT number
   - Data is know as TCP segmnent or UDP datagram at this stage
## 3] Internet Layer [Network layer] : [IP+TCP+DATA] : Packet
  - adds header -source and destination IP [at router or mobile] 
  - PDU is called Packet
  - Packets are forwarded on layer 3 devices EX: Router
## 2] Data Link Layer: [Ethernet_MAC+IP+TCP+DATA] : Frame
  - header contains SOurce and Destination Mac Addresses
  - frames are forwared on layer 2 devices EX: switch
## 1] Physical Layer : BITS --010101010101






