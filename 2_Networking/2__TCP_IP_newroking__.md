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