# 7] Application Layer Protocols:
  - This converts data in required format 
    EX. if http then text format
  - HTTP,FTP,Telnet,SSH etc
  - aap:DATA --[Application_Layer]--> Transport Layer
  - after formating data it will be sent to transport layer

# 4] Transport Layer Protocols:
  - Transport Layer Protocols are responsible to 
    establish end to end communcation between applications
  - asks Layer 3 : network layer to carry data to destination
  - carry out error checking, flow control and verification
  - EX. TCP and UDP 
 ## TCP :
  - Reliable : TCP uses sequence numbers and acknowledgements(ACKs)
    to recover from damaged or lost data
  - Flow Control : TCP allows Receiver to govern amount of data sent by sender
    - TCP uses WINDOW size to indicate Allowd number of bytes the sender may
      transmit before receiving furthur permisssion
  - Sequencing : Ordered Delivery - Sequence Numbers are used to order segments

  ### Process :
  1) 3 way Handshake 
      1. client ----[Sync]---> server
      2. client <--[ACK+SYNC]-- server
      3. client --[ACK]----> Server
  2) Decide [SEGMENT] SIZE [Bytes_of_msg] 
    [SEQ#] segment: number of first byte in Segment
  3) Decide Window Size : 
    [ACK#] Acknowledgment - is number for next byte it expect to receive
  3) client <-------> server [SEQ#+ACK#]

  ## UDP
    - no handshake
    - no relability 
    - for real time data transmission 
    - ex. voice or vdo

# 3] Internet Layer Protocols [Network_Layer]:
    - IP operates at network layer
    - IP provide services to layer 3 protocols
    - IP asks layer 2 protocols to carry the ip packets
    - IP provides the funtions necessary to deliver packet from a source
      to a destination over an interconnected system of networks
    - TCP : operates end to end
    - IP :  any directly connected nodes EX device to router or router to router
    - for communicataion : 1) IP addressing 2) Packet Format 3) routing func.
    - IP addressing :
      - Network Address + Subnet Address
