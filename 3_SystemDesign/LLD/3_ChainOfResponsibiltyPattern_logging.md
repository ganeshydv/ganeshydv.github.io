
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
