---
layout: post
title: "� Uploading Large Files to S3 Using PreSigned URLs and Multipart Upload"
date: 2025-07-21
categories: [system-design, hld]
tags: [aws, java, javascript, frontend]
author: "GGurkhude"
excerpt: "Learning notes on � uploading large files to s3 using presigned urls and multipart upload"
original_path: "3_SystemDesign/HLD/VideoUpload/1_vdo_large_file_upload_s3_presigned.md"
---

## **🔹 Uploading Large Files to S3 Using Pre-Signed URLs and Multipart Upload**  

The process involves **splitting the file into chunks**, uploading them **in parallel**, and then **finalizing** the upload.  

---

## **🔹 Step-by-Step Process**  

### **1️⃣ Backend: Generate Pre-Signed URLs for Each Chunk**
`Front end calulates total file size and decides total chunks based on size.`

Your **backend (Lambda, API Gateway, or an EC2 instance)** will generate a pre-signed URL for each chunk of the file.  

✔ **Initiate Multipart Upload** → Get an `UploadId` from S3.  
✔ **Generate Pre-Signed URLs** for each chunk.  
✔ **Send URLs to the frontend.**  

#### **🔹 Backend (Node.js - Generate Pre-Signed URLs)**
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
    console.log("Upload ID:", uploadId);

    // Step 2: Generate pre-signed URLs for each chunk
    const presignedUrls = await Promise.all(
        Array.from({ length: totalChunks }, async (_, i) => {
            return await s3.getSignedUrlPromise("uploadPart", {
                Bucket: BUCKET_NAME,
                Key: fileName,
                UploadId: uploadId,
                PartNumber: i + 1, // 1-based index
                Expires: 3600, // URL valid for 1 hour
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

### **2️⃣ Frontend: Split the File & Upload Chunks**
✔ **Read file in chunks (e.g., 10MB each).**  
✔ **Use Fetch/Axios to upload each chunk via pre-signed URLs.**  
✔ **Keep track of uploaded parts.**  

#### **🔹 Frontend (React/JavaScript - Upload Chunks)**
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

        uploadedParts.push({ PartNumber: i + 1, ETag: "etag-placeholder" }); // Store ETag from response
    }

    // Step 3: Complete Multipart Upload
    await fetch("/complete-upload", {
        method: "POST",
        body: JSON.stringify({ fileName: file.name, uploadId, uploadedParts }),
    });

    console.log("Upload Complete!");
}
```

---

### **3️⃣ Backend: Complete Multipart Upload**
✔ **Once all chunks are uploaded, call S3 to merge them into a complete file.**  
✔ **Pass `UploadId` and the list of `ETags` received from each chunk.**  

#### **🔹 Backend (Node.js - Complete Upload)**
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

## **🔹 Summary: Flow of Multipart Upload**
| **Step** | **Description** |
|----------|---------------|
| **1. Backend generates pre-signed URLs** | Create `UploadId` and pre-signed URLs for each chunk. |
| **2. Frontend uploads each chunk** | Splits file and uploads chunks via pre-signed URLs. |
| **3. Backend completes upload** | Calls `completeMultipartUpload()` to merge chunks. |

---

## **🔹 Key Benefits of This Approach**
✅ **Handles Large Files (up to 5TB)**  
✅ **Uploads in Parallel (Faster Uploads)**  
✅ **Resumable Uploads (If a part fails, retry that chunk only)**  
✅ **Optimized for Low Network Speed (Retries only failed chunks instead of re-uploading the whole file)**  

