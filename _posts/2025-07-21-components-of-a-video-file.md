---
layout: post
title: "Components of a Video File"
date: 2025-07-21
categories: [multimedia, 1-steps--md]
tags: []
author: "GGurkhude"
excerpt: "Learning notes on components of a video file"
original_path: "VideoProcessing/1_steps_.md"
---

# Components of a Video File
## A video file consists of:

- #### Container format (MP4, MKV, AVI, etc.): Holds audio, video, and metadata.
- #### Video codec (H.264, VP9, AV1, etc.): Compresses video streams.
- #### Audio codec (AAC, MP3, Opus, etc.): Compresses audio streams.
- #### Metadata (Subtitles, timestamps, etc.).
## Steps in Conversion
### 1. Parse Input Video

- Read the container format.
- Extract raw video frames and audio samples.
### 2. Decode Video & Audio

- Convert compressed video into raw RGB/YUV pixel format.
- Convert compressed audio into raw PCM format.
### 3. Re-encode into the Target Format

- Convert raw frames to a different video codec (e.g., from H.264 to VP9).
- Compress audio into the target format.
### 4. Mux (Package) into the Target Container

- Combine video and audio streams into a new format.
- Write metadata.

## General Questions
### 1. How Video will read?