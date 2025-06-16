
## Amazon SQS Message Limits

| Feature                  | Default   | Maximum   |
|--------------------------|----------|----------|
| **Retention Period**     | 4 days   | 14 days  |
| **Message Size**        | 256 KB   | 256 KB   |
| **Storage for Large Messages** | SQS Extended Client (S3) | SQS Extended Client (S3) |

 
#

## 📌 SQS Message Retention & Size Limits
### 1️⃣ How long can SQS hold messages?
- Default retention: 4 days
- Maximum retention: 14 days (you can configure this)
- After this time, unprocessed messages are deleted automatically.
- ✅ `You can set the retention period in SQS settings`.
### 2️⃣ What is the message size limit?
- Max size per message: 256 KB
- If your message exceeds 256 KB, you have two options:
   - Use S3 for large payloads: Store data in S3 and send the S3 URL in the SQS message.
   - Use SQS Extended Client Library: It stores large messages in S3 automatically.
- ✅ If your message is small (just an ID or small payload), SQS works fine.


### 3️⃣ What happens if messages are not processed?
- If a message is not processed before the retention period, it gets deleted automatically.
- To prevent data loss:
   - Use Dead Letter Queue (DLQ) to capture unprocessed messages.
   - Set up CloudWatch alerts to monitor message backlog.

#

## Q. batchSize means max iteams that sqs will take at a time and maximum Batching window is time that this sqs will wait to fill the toatl batch size iteams in sqs
- Yes, you are correct. Let's break down the concepts of batchSize and maximumBatchingWindow in the context of AWS Lambda and SQS integration:

## `batchSize`
### Definition:
- The batchSize parameter specifies the maximum number of messages that AWS Lambda will retrieve from the SQS queue in a single batch.
- How many messages are fetched per poll request by the consumer.
### Usage:
- This determines how many messages the Lambda function will process in one invocation.
### Example: 
- If batchSize is set to 10, the Lambda function will process up to 10 messages at a time.
## `maximumBatchingWindow`
### Definition: 
- The maximumBatchingWindow parameter specifies the maximum amount of time (in seconds) that Lambda will wait to fill the batch with the specified batchSize of messages before invoking the function.
### Usage: 
- This helps in optimizing the invocation of the Lambda function by allowing it to wait for more messages to arrive, up to the specified batch size, before processing.
### Example: 
- If maximumBatchingWindow is set to 60 seconds, Lambda will wait up to 60 seconds to gather messages before invoking the function, even if the batch size is not yet reached.
## How They Work Together
### Batch Size: 
- Determines the maximum number of messages processed per invocation.
### Batching Window: 
- Determines how long Lambda will wait to fill the batch before invoking the function.
