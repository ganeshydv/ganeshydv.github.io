# 📌 How to Identify the Type of Data in a Media File

## 1️⃣ Key Atom Types

### 🔹 `mdat` (Media Data)
- Contains the **raw media data** (audio, video, or subtitles).
- The actual type of data is determined by the associated `trak` (track) atom.

### 🔹 `moov` (Movie Atom)
- Contains **metadata** about the media file, including track information.

Inside `moov`, you'll find:

#### 🔹 `trak` (Track Atom)
- Represents a **single track** (audio, video, or subtitles).

Inside `trak`, you'll find:

#### 🔹 `mdia` (Media Atom)
- Contains **information about the type of media**.

Inside `mdia`, you'll find:

#### 🔹 `hdlr` (Handler Reference Atom)
- Specifies the **type of track**:
  - `vide` → **Video track**
  - `soun` → **Audio track**
  - `subt` → **Subtitle track**

#### 🔹 `minf` (Media Information Atom)
- Contains additional **details about the media**.

---

## 2️⃣ Steps to Identify Data Type

To determine whether a track is **audio, video, or subtitle**:

1️⃣ **Parse** the `moov` atom.  
2️⃣ Inside `moov`, locate the `trak` atoms (**each `trak` represents a track**).  
3️⃣ Inside each `trak`, locate the `mdia` atom.  
4️⃣ Inside `mdia`, locate the `hdlr` atom and check its **handler_type** field:
   - `vide` → **Video**
   - `soun` → **Audio**
   - `subt` → **Subtitle**

🚀 **Using this method, you can analyze media files and determine their track types!**
