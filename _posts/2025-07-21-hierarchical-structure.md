---
layout: post
title: "Hierarchical Structure:"
date: 2025-07-21
categories: [multimedia, mediaplayer]
tags: []
author: "GGurkhude"
excerpt: "Learning notes on hierarchical structure:"
original_path: "VideoProcessing/MediaPlayer/1_parsing_video_meta_data_.md"
---

### Hierarchical Structure:
- ### MP4 files are structured as a hierarchy of atoms, where some atoms can contain other atoms, forming a tree-like structure. 

## How do we know ATOM size in MP4 ?
### MP4 Atom Stucture
- An MP4 file is composed of multiple atoms (also called boxes), and each atom typically has the following structure:
   - Size (4 bytes):
      - A 32-bit integer (big-endian) that tells you how many bytes the atom occupies. This size includes the header itself.
    
   - Type (4 bytes):
      - A 4-character code (e.g., ftyp, moov, mdat) that indicates what the atom contains. These codes are standardized for the MP4 format.
    
   - Payload (variable):
      - The actual data contained in the atom. This can be media data (like in the mdat atom) or metadata (like in moov or ftyp).
- ### The structure of the atom header is fixed: first 4 bytes for the size and next 4 bytes for the type.

## How it works:
- When a media player reads an MP4 file, it parses the atoms, starting from the root (usually the ftyp atom), and then recursively traverses the tree to find and interpret the relevant information for playback
   ```
       <ftyp>  (File Type)
       |
       +--<moov> (Movie)
       |   |
       |   +--<mvhd> (Movie Header)
       |   |
       |   +--<trak> (Track)
       |       |
       |       +--<edts> (Edit List)
       |       |
       |       +--<mdia> (Media)
       |       |
       |       +--<mdhd> (Media Header)
       |       |
       |       +--<hdlr> (Handler)
       |       |
       |       +--<mdin> (Media Data)
       |       |
       |       +--<stbl> (Sample Table)
       |       |
       |       +--<stsd> (Sample Description)
       |       |
       |       +--<stts> (Time-to-Sample)
       |       |
       |       +--<stss> (Sync Sample)
       |       |
       |       +--<stsc> (Sample to Chunk)
       |       |
       |       +--<stsz> (Sample Size)
       |       |
       |       +--<stco> (Chunk Offset)
       |
       +--<mdat> (Media Data)
   ```