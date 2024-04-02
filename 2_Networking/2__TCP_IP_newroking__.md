## Network Layers and Data Encapsulation

1. **Application Layer (Layer 7)**: The Protocol Data Unit (PDU) is referred to as a message or data.
2. **Transport Layer (Layer 4)**: The data is encapsulated and a port number is added. The PDU is known as a TCP segment or UDP datagram at this stage.
3. **Internet Layer (Network Layer, Layer 3)**: A header containing source and destination IP addresses is added (at router or mobile). The PDU is called a packet. Packets are forwarded on layer 3 devices, such as routers.
4. **Data Link Layer (Layer 2)**: The header contains source and destination MAC addresses. The PDU is referred to as a frame. Frames are forwarded on layer 2 devices, such as switches.
5. **Physical Layer (Layer 1)**: The data is transmitted as bits (0s and 1s).

====================================
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