# Video-Related Terms Explained

## 1. Encoding
Encoding is the process of converting raw video and audio data into a digital format using a specific codec. This process compresses the data to reduce file size while maintaining quality as much as possible.

### Example:
A raw 4K video file (huge in size) is encoded using the H.264 codec to create a smaller MP4 file suitable for online streaming.
```
VDO [ Raw ] --> Encoding [in Digital - Compressed]
```
---

## 2. Decoding
Decoding is the reverse of encoding. It is the process of converting encoded video or audio back into a format that can be played or processed by a device.

### Example:
A media player like VLC decodes an H.264 encoded MP4 file so that it can be displayed on the screen.
```
Encoded --> Decoding --> VDO
```
---

## 3. Transcoding
Transcoding refers to the process of converting a video file from one format, codec, or resolution to another. This is typically done to ensure compatibility with different devices or to optimize streaming quality.

### Example:
A 4K video in HEVC (H.265) is transcoded to a 1080p H.264 format to make it playable on older devices that do not support HEVC.

---

## 4. Codec
A codec (coder-decoder) is a software or hardware tool that compresses and decompresses digital media files. Codecs are essential for reducing file sizes while maintaining quality.

### Common Video Codecs:
- **H.264 (AVC)** – Commonly used for streaming (YouTube, Netflix)
- **H.265 (HEVC)** – More efficient than H.264, used for 4K and HDR content
- **VP9** – Google’s alternative to H.265, used on YouTube
- **AV1** – Next-generation open-source codec with better compression

### Common Audio Codecs:
- **AAC** – Used in MP4, common in streaming
- **MP3** – Popular for audio files
- **Opus** – Used in VoIP and modern web applications

---

## 5. Bitrate
Bitrate refers to the amount of data processed per second in a video or audio file, usually measured in kilobits per second (kbps) or megabits per second (Mbps). Higher bitrates mean better quality but larger file sizes.

### Example:
A YouTube 1080p video typically streams at 5 Mbps, while a 4K video streams at 15-25 Mbps.

---

## 6. Resolution
Resolution refers to the number of pixels in a video frame, typically represented as width × height.

### Common Resolutions:
- **720p (HD)** – 1280 × 720
- **1080p (Full HD)** – 1920 × 1080
- **4K (Ultra HD)** – 3840 × 2160
- **8K (Super UHD)** – 7680 × 4320

---

## 7. Frame Rate (FPS)
Frame rate, measured in frames per second (FPS), indicates how many frames are displayed per second in a video. Common frame rates include:
- **24 FPS** – Standard for movies
- **30 FPS** – Standard for TV broadcasts
- **60 FPS** – Used for gaming and sports

### Example:
A slow-motion video might be recorded at 120 FPS and then played back at 30 FPS to create a smooth slow-motion effect.

---

## 8. Container Formats
A container format holds video, audio, subtitles, and metadata in a single file. Common containers include:
- **MP4** – Widely used for streaming and playback
- **MKV** – Supports multiple audio tracks and subtitles
- **AVI** – Older format with less compression
- **MOV** – Apple’s format used in QuickTime

### Example:
An MP4 file may contain an H.264 video stream and an AAC audio stream.

---

## 9. Streaming Protocols
Streaming protocols are used to deliver video content over the internet in real time.
- **HLS (HTTP Live Streaming)** – Used by Apple devices
- **DASH (Dynamic Adaptive Streaming over HTTP)** – Used by YouTube and Netflix
- **RTMP (Real-Time Messaging Protocol)** – Used for live streaming

### Example:
Netflix uses DASH to adaptively stream different resolutions based on the user’s internet speed.

---

## 10. Adaptive Bitrate Streaming (ABR)
ABR allows a video player to switch between different quality levels based on network conditions to ensure smooth playback.

### Example:
If a user’s internet speed drops while watching a YouTube video, the quality automatically reduces from 1080p to 720p to prevent buffering.

---

## Conclusion
Understanding these video-related terms helps in working with video processing, streaming, and playback technologies. These concepts are crucial for developing video applications, encoding pipelines, and optimizing streaming performance.