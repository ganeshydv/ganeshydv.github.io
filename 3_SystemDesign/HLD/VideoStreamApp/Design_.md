## Requirement
1. Can upload Video
2. Can serach and play Video

## Video Upload :
### 1. Process:
   - Request flow: 
   1. Read video data from device 
   2. Get details : based on size decide count of chunks required --> send to backend
   3. backend : save video details create uuid send in reponse
   4. front end : divide video in chunks +uuid + checksum for each chunk --> to Backend
   5. Backend : save chunk in storage/blob : video_name/chunk_id_or_slide/chunk_id_vdo.mp4
   6. Backend : send response after saving this to storage 
   7. if not saved frontend will resend based on previous response

## 1. Video Upload Architecture
### Initial Metadata Request
###  Client Side:w

- The client sends a request to the backend with video metadata (resolution, size, format, etc.).
- The backend responds with a pre-signed URL or upload token for initiating chunk uploads.
### Backend Side:

- Validate the metadata.
- Generate an identifier for the video (e.g., video_id or UUID).
- Use a distributed cache like Redis to store intermediate metadata (e.g., upload progress, chunk order).
## Chunked Upload Design
### Chunking Strategy:

- Splitting based on size (e.g., 20MB per chunk) is generally more efficient than time-based splitting.
- Use binary data for chunks to ensure compatibility with streaming and storage systems.
### Client to Backend Upload:

- Send each chunk with metadata:
```json
{
  "video_id": "1234",
  "chunk_index": 1,
  "total_chunks": 5,
  "chunk_data": "<binary_data>"
}
```
### Backend Processing:

- Validate and store each chunk in temporary storage (e.g., S3/Blob Storage) with a structure like:

```bash
video_name/resolution/temporary/chunk_1
video_name/resolution/temporary/chunk_2
```
- Use a message queue (e.g., SQS, RabbitMQ, or Kafka) to enqueue chunk processing tasks:

- Ensure each task has video_id and chunk_index.
- Leverage worker threads or serverless functions (e.g., AWS Lambda) to ### process chunks sequentially.
### Completion Notification:

- When the final chunk is uploaded, the client sends a completion request.
- Backend validates chunk integrity and sequence before merging.

## Chunk Merging
- Merge chunks into a single video file after receiving the completion request.
- Use ffmpeg or a similar library to handle video merging efficiently:
```bash
ffmpeg -f concat -safe 0 -i file_list.txt -c copy output.mp4
```
- Where file_list.txt contains:
```
file 'chunk_1'
file 'chunk_2'
```
## Load Balancing and Routing
### Routing Mechanism for Multi-Instance Backend:

- **Use a distributed lock mechanism like Redis Redlock to assign one video upload to a specific server instance**.
- Alternatively, implement a **consistent hashing mechanism to route requests to the same server**.
### Auto-Scaling:

- Use cloud-based scaling solutions like AWS ECS/Fargate or Azure Scale Sets to scale worker instances based on queue length.