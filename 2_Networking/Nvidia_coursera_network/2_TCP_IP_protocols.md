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
  - Ordered Delivery - Sequence Numbers are used to order segments

  ### Process :
  1) 3 way Handshake 
      1. client ----[Sync]---> server
      2. client <--[ACK+SYNC]-- server
      3. client --[ACK]----> Server
  2) Decide [SEGMENT] SIZE [Byets_of_msg] 
    [SEQ#] segment: number of first byte in Segment
  3) Decide Window Size : 
    [ACK#] Acknowledgment - is number for next byte it expect to receive
  3) client <-------> server [SEQ#+ACK#]

