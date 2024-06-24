# Rate Limiting:

1. Fixed window : time period and request count based

- user can make requests between some fixed interval of time
  for max limit specified

2. Token Bucket :

- Burst
- sustain : rate in which req is hitting in time interval
- working:
  The Token Bucket algorithm is a popular method for rate limiting in computer networks and distributed systems. It allows you to control the rate at which requests are processed or transmitted.

The concept behind the Token Bucket algorithm is similar to a physical bucket that holds tokens. Each token represents the permission to perform a specific action, such as making a request or sending data. The bucket has a maximum capacity, which determines the maximum burst rate or the number of requests that can be processed in a short period of time.

Here's how the Token Bucket algorithm works:
Burst: The bucket initially starts with a certain number of tokens, known as the burst capacity. This allows for a burst of requests to be processed immediately without any delay.

Sustain: After the initial burst, the bucket refills tokens at a fixed rate, known as the sustain rate. This rate determines the number of tokens added to the bucket per unit of time.

Request Processing: When a request arrives, the algorithm checks if there are enough tokens in the bucket. If there are sufficient tokens, the request is processed, and a token is consumed from the bucket. If there are not enough tokens, the request is either delayed or rejected, depending on the implementation.

Token Refill: The bucket continues to refill tokens at the sustain rate over time. If the bucket is already full, no additional tokens are added.

The Token Bucket algorithm provides a flexible way to control the rate of requests by adjusting the burst capacity and sustain rate. It allows for bursts of requests to be handled quickly while maintaining a sustainable rate of processing over time.
In the context of rate limiting, the Token Bucket algorithm can be used to enforce limits on the number of requests that can be made within a specific time interval. By regulating the rate at which tokens are consumed, you can prevent excessive usage and protect your system from being overwhelmed.
 