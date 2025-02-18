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