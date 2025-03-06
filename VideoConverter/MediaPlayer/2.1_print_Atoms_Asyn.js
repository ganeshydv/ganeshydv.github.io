const fs = require("fs");

// Helper to safely read a 32-bit unsigned integer in big-endian from a Buffer.
function readUInt32BE(buffer, offset) {
  if (offset + 4 > buffer.length) return null;
  return buffer.readUInt32BE(offset);
}

/**
 * Recursively parses atoms (boxes) from a given buffer within the specified range.
 * Returns an array of atom objects with type, size, start, end, and children.
 */
function parseAtoms(buffer, startOffset = 0, endOffset = buffer.length) {
  let atoms = [];
  let offset = startOffset;
  
  while (offset + 8 <= endOffset) {
    const size = readUInt32BE(buffer, offset);
    if (!size || size < 8 || offset + size > endOffset) {
      // Incomplete or invalid atom header; break to wait for more data.
      break;
    }
    const type = buffer.toString("utf8", offset + 4, offset + 8);
    let atom = {
      type,
      size,
      start: offset,
      end: offset + size,
      children: []
    };

    // Container atoms that we want to parse recursively.
    const containerTypes = ["moov", "trak", "mdia", "minf", "stbl"];
    if (containerTypes.includes(type)) {
      // Parse children within this container.
      const headerSize = 8; // Standard header size.
      atom.children = parseAtoms(buffer, offset + headerSize, offset + size);
    }
    atoms.push(atom);
    offset += size;
  }
  return atoms;
}

/**
 * Recursively prints atom details.
 */
function printAtom(atom, indent = "") {
  console.log(`${indent}Atom: ${atom.type}, Size: ${atom.size}`);
  // For sample table atoms, show placeholder details.
  if (atom.type === "stbl") {
    atom.children.forEach(child => {
      if (child.type === "stsz") {
        console.log(indent + "  [stsz] (Sample Size Box) details here.");
      }
      if (child.type === "stco") {
        console.log(indent + "  [stco] (Chunk Offset Box) details here.");
      }
      if (child.type === "stts") {
        console.log(indent + "  [stts] (Time-to-Sample Box) details here.");
      }
    });
  }
  // Recursively print children.
  atom.children.forEach(child => printAtom(child, indent + "  "));
}

/**
 * Processes an accumulated buffer by parsing complete atoms and printing their details.
 * Returns a Buffer containing any leftover incomplete data.
 */
function processBuffer(buffer) {
  // Parse the atoms from the buffer.
  const atoms = parseAtoms(buffer);
  if (atoms.length > 0) {
    console.log("Parsed MP4 Atom Structure:");
    atoms.forEach(atom => printAtom(atom));
  }
  
  // Determine how many bytes were processed.
  let processedBytes = 0;
  for (const atom of atoms) {
    processedBytes = Math.max(processedBytes, atom.end);
  }
  // Return leftover data that hasn't been processed yet.
  return buffer.slice(processedBytes);
}

/**
 * Streams the MP4 file, processes atoms as data arrives, and maintains a leftover buffer
 * for incomplete atoms between chunks.
 */
function parseMP4Stream(filename) {
  console.log("Start Time: ", new Date().toLocaleTimeString());
  let leftoverBuffer = Buffer.alloc(0);

  const stream = fs.createReadStream(filename, { highWaterMark: 64 * 1024 });
  
  stream.on("data", (chunk) => {
    // Append the new chunk to any leftover incomplete data.
    leftoverBuffer = Buffer.concat([leftoverBuffer, chunk]);
    // Process as many complete atoms as possible.
    leftoverBuffer = processBuffer(leftoverBuffer);
  });

  stream.on("end", () => {
    if (leftoverBuffer.length > 0) {
      console.log("Remaining unprocessed data:", leftoverBuffer.length, "bytes");
    } else {
      console.log("Finished parsing file.");
    }
    console.log("End Time: ", new Date().toLocaleTimeString());
  });

  stream.on("error", (err) => {
    console.error("Stream error:", err);
  });
}

// Run the streaming parser on a sample MP4 file.
parseMP4Stream("C:/Users/GGurkhude/Pictures/Mentor_app_weekly_meeting_28032023.mp4");
/*
$ node VideoConverter/MediaPlayer/2_print_atoms_.js 
OP:
Start Time:  4:50:42 pm
Parsed MP4 Atom Structure:
Atom: ftyp, Size: 24
Parsed MP4 Atom Structure:
Atom: moov, Size: 521976
  Atom: mvhd, Size: 108
  Atom: trak, Size: 268237
    Atom: tkhd, Size: 92
    Atom: mdia, Size: 268137
      Atom: mdhd, Size: 32
      Atom: hdlr, Size: 33
      Atom: minf, Size: 268064
        Atom: vmhd, Size: 20
        Atom: dinf, Size: 36
        Atom: stbl, Size: 268000
          [stts] (Time-to-Sample Box) details here.
          [stsz] (Sample Size Box) details here.
          [stco] (Chunk Offset Box) details here.
          Atom: stsd, Size: 148
          Atom: stts, Size: 32
          Atom: stsc, Size: 61408
          Atom: stsz, Size: 109516
          Atom: stss, Size: 1160
          Atom: stco, Size: 95728
  Atom: trak, Size: 253623
    Atom: tkhd, Size: 92
    Atom: mdia, Size: 253523
      Atom: mdhd, Size: 32
      Atom: hdlr, Size: 33
      Atom: minf, Size: 253450
        Atom: smhd, Size: 16
        Atom: dinf, Size: 36
        Atom: stbl, Size: 253390
          [stts] (Time-to-Sample Box) details here.
          [stsz] (Sample Size Box) details here.
          [stco] (Chunk Offset Box) details here.
          Atom: stsd, Size: 94
          Atom: stts, Size: 24
          Atom: stsc, Size: 50416
          Atom: stsz, Size: 107116
          Atom: stco, Size: 95732
Parsed MP4 Atom Structure:
Atom: mdat, Size: 227846165
Finished parsing file.
End Time:  4:54:02 pm
*/