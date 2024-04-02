
Network components :
1] End Nodes -compute, storage, mangement nodes 
   - these are source / destination nodes
2] Intermediate Nodes - switches and routers 
   - receives traffic generated from end nodes
   - makes decision where to forward traffic.
==========================================
How network component are conncted ? 
- using hardware NIC and cables
========================================
How communcation between two nodes happen?
- Protocol suite : group of protocols that run
concurrently to implement network communication
- Each protocol defines a common format and
 set of rules for exchnaging messages between devices
======================================
OSI model 
TCP/IP model 
====================================
Encapsulation of Data:
- at each layer data is encapsulated and a header
is added at each layer
- there can be encoding, decoding or formating 
at layers
=====================================
- Protocol Data Units [PDU]: enacpsulated data at each layer
  ex: packet,segment, datagram or frame is PDU
-Each layer in OSI model is associated with
different protocols, Protocol Data Units (PDU),
addresses and devices

7] Application Layer :  message : [DATA] 
   - message is called as DATA
4] Transport Layer : [TCP_PORT+DATA]   : TCP segment/UDP Datagram
   - Data is encapuslate also added PORT number
   - Data is know as TCP segmnent or UDP datagram at this stage
3] Internet Layer [Network layer] : [IP+TCP+DATA] : Packet
  - adds header -source and destination IP [at router or mobile] 
  - PDU is called Packet
  - Packets are forwarded on layer 3 devices EX: Router
2] Data Link Layer: [Ethernet_MAC+IP+TCP+DATA] : Frame
  - header contains SOurce and Destination Mac Addresses
  - frames are forwared on layer 2 devices EX: switch
1] Physical Layer : BITS --010101010101






