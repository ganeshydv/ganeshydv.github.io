# Large File Upload to S3 Using Pre-Signed URLs & Processing with Lambda

## **🔹 Overview**
This guide explains how to **upload large files to Amazon S3** using **multipart upload** with **pre-signed URLs** and how to **trigger an AWS Lambda function** after the upload to process the video.

---

## **🔹 Step 1: Backend - Generate Pre-Signed URLs for Multipart Upload**
`Front end calulates total file size and decides total chunks based on size.`

Your **backend (Lambda, API Gateway, or an EC2 instance)** generates a **pre-signed URL** for each chunk of the file.

### **Backend Code (Node.js - Generate Pre-Signed URLs)**
```javascript
import AWS from "aws-sdk";

const s3 = new AWS.S3();
const BUCKET_NAME = "my-large-files-bucket";

export async function handler(event) {
    const { fileName, totalChunks } = JSON.parse(event.body);

    // Step 1: Initiate Multipart Upload
    const multipartUpload = await s3.createMultipartUpload({
        Bucket: BUCKET_NAME,
        Key: fileName,
    }).promise();

    const uploadId = multipartUpload.UploadId;

    // Step 2: Generate pre-signed URLs for each chunk
    const presignedUrls = await Promise.all(
        Array.from({ length: totalChunks }, async (_, i) => {
            return await s3.getSignedUrlPromise("uploadPart", {
                Bucket: BUCKET_NAME,
                Key: fileName,
                UploadId: uploadId,
                PartNumber: i + 1, // 1-based index
                Expires: 3600,
            });
        })
    );

    return {
        statusCode: 200,
        body: JSON.stringify({ uploadId, presignedUrls }),
    };
}
```

---

## **🔹 Step 2: Frontend - Upload File in Chunks**
The frontend **splits the file** into **chunks (e.g., 10MB each)** and **uploads each chunk** using the **pre-signed URLs**.

### **Frontend Code (JavaScript - Upload Chunks)**
```javascript
async function uploadFile(file) {
    const chunkSize = 10 * 1024 * 1024; // 10MB
    const totalChunks = Math.ceil(file.size / chunkSize);

    // Step 1: Request Pre-Signed URLs from Backend
    const response = await fetch("/generate-presigned-urls", {
        method: "POST",
        body: JSON.stringify({ fileName: file.name, totalChunks }),
    });

    const { uploadId, presignedUrls } = await response.json();
    const uploadedParts = [];

    // Step 2: Upload each chunk
    for (let i = 0; i < totalChunks; i++) {
        const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize);
        await fetch(presignedUrls[i], {
            method: "PUT",
            body: chunk,
            headers: { "Content-Type": "application/octet-stream" }
        });
        uploadedParts.push({ PartNumber: i + 1, ETag: "etag-placeholder" });
    }

    // Step 3: Complete Multipart Upload
    await fetch("/complete-upload", {
        method: "POST",
        body: JSON.stringify({ fileName: file.name, uploadId, uploadedParts }),
    });
}
```

---

## **🔹 Step 3: Backend - Complete Multipart Upload**
Once all chunks are uploaded, the backend calls **S3 to merge the chunks**.

### **Backend Code (Node.js - Complete Upload)**
```javascript
export async function completeUpload(event) {
    const { fileName, uploadId, uploadedParts } = JSON.parse(event.body);

    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        UploadId: uploadId,
        MultipartUpload: { Parts: uploadedParts },
    };

    await s3.completeMultipartUpload(params).promise();
    
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Upload Complete!" }),
    };
}
```

---

## **🔹 Step 4: Trigger Lambda After Upload to Process Video**
Once the file is successfully uploaded, we can **trigger a Lambda function** via an **S3 event notification**.

### **Enable S3 Event Notification to Trigger Lambda**
1. Go to your **S3 Bucket** in AWS Console.
2. Navigate to **Properties** → **Event Notifications**.
3. Create a new event notification:
   - **Event Type:** `PUT`
   - **Prefix:** `videos/` (if applicable)
   - **Send To:** AWS Lambda
   - **Lambda Function:** `video-processing-lambda`

---

## **🔹 Step 5: Process Video in Lambda**
Lambda will receive an event containing the uploaded video details and trigger **FFmpeg (running on EC2, ECS, or AWS Batch)** to convert it into multiple resolutions.

### **Lambda Code to Process Video**
```javascript
export async function handler(event) {
    console.log("S3 Event: ", JSON.stringify(event, null, 2));
    
    const s3Event = event.Records[0].s3;
    const bucket = s3Event.bucket.name;
    const key = decodeURIComponent(s3Event.object.key.replace(/\+/g, " "));

    console.log(`Processing video: ${bucket}/${key}`);
    
    // Trigger an ECS Fargate Task, EC2 instance, or AWS Batch job to process the video using FFmpeg
    // Example: Send a message to SQS for an ECS service to pick up
    
    return { statusCode: 200, body: "Processing started." };
}
```

---

## **🔹 Summary**
| **Step** | **Description** |
|----------|---------------|
| **1. Generate Pre-Signed URLs** | Backend provides URLs for uploading file chunks. |
| **2. Upload File in Chunks** | Frontend splits file and uploads each chunk to S3. |
| **3. Complete Multipart Upload** | Backend merges chunks into a full file. |
| **4. Trigger Lambda on Upload** | S3 event triggers Lambda to process video. |
| **5. Process Video** | Lambda sends video to FFmpeg (via ECS/EC2) for conversion. |

---

## **🔹 Benefits of This Approach**
✅ **Handles Large Files (up to 5TB)**  
✅ **Parallel Uploads (Faster & Efficient)**  
✅ **Event-Driven Processing (S3 → Lambda → ECS)**  
✅ **Optimized for Cost & Performance**  

---

