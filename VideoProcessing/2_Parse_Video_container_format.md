## Understanding Container Formats
- A container format is like a "wrapper" that bundles together various streams such as video, audio, subtitles, and metadata. Think of it as a folder that contains multiple files (data streams) and a table of contents (metadata) that tells you what each file is and where it is located.

### Key Components of a Container:
1. ### Video Stream:
   - Contains the compressed video data (using codecs like H.264, VP9, etc.).
 
1. ### Audio Stream:
   -  Contains the compressed audio data (using codecs like AAC, MP3, etc.). 
1. ### Metadata:
   - Information about the video such as duration, resolution, codec details, and sometimes even subtitles or chapters.

1. ### Indexing and Timing Information:
   - Provides details on how to synchronize the audio and video during playback.

### Popular Container Formats:
- MP4:
   - Widely used for online streaming and mobile devices. It organizes data in structures called atoms or boxes.

- MKV (Matroska):
   - Known for its flexibility and support for a wide range of codecs and subtitle formats.
#
### How Containers Are Structured: 
### 1. The MP4 Example
- MP4 files are organized in a hierarchical structure of atoms (or boxes). 
- Each atom has:
   - A size (how many bytes the atom occupies).
   - A type (a 4-character code like ftyp, moov, mdat, etc.).
   - Payload/Data (the actual information).