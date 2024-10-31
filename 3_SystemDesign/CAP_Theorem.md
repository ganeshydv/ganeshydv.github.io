## Distributed system 
- system with Partion of network  [P-CAP]
- Regions
- Shards - database partiton
- Distributed Network

## `IF Netowrk Partion : Choose one -  Availability  OR Consistency`
## `IF NOT : Choose one - Latency OR Consistency`
## `Availibiltiy and Consistency can go along`

## CAP
The CAP theorem states that in any distributed system, you can achieve only two of the following three guarantees at any given time:

1. ### Consistency (C): 
    - Every read receives the most recent write, ensuring `data uniformity across the system`.
2. ### Availability (A): 
    - Every request receives a response (either success or failure), ensuring the `system is always accessible`.
3. ### Partition Tolerance (P): 
    - `The system continues to operate even if communication between nodes is disrupted` (network partition occurs).

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
