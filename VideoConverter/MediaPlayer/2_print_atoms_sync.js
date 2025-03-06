const fs = require("fs");

// Helper to safely read a 32-bit unsigned integer in big-endian from a Buffer.
function readUInt32BE(buffer, offset) {
  if (offset + 4 > buffer.length) return null;
  return buffer.readUInt32BE(offset);
}

/**
 * Recursively parses atoms (boxes) in a given buffer.
 * Returns an array of atom objects with type, size, start, end, and children.
 */
function parseAtoms(buffer, startOffset = 0, endOffset = buffer.length) {
  let atoms = [];
  let offset = startOffset;
  
  while (offset + 8 <= endOffset) {
    const size = readUInt32BE(buffer, offset);
    if (!size || size < 8 || offset + size > endOffset) {
      // Not enough data to read a full atom header or declared size exceeds available bytes.
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

    // List of container atoms we want to parse recursively.
    const containerTypes = ["moov", "trak", "mdia", "minf", "stbl"];
    if (containerTypes.includes(type)) {
      // Parse children within this container.
      const headerSize = 8; // Standard header size (could be larger if extended size)
      atom.children = parseAtoms(buffer, offset + headerSize, offset + size);
    }
    atoms.push(atom);
    offset += size;
  }
  return atoms;
}

/**
 * Prints atom details recursively.
 */
function printAtom(atom, indent = "") {
  console.log(`${indent}Atom: ${atom.type}, Size: ${atom.size}`);
  // If this atom is a sample table, we might want to print some info.
  // For demonstration, we show details for 'stsz', 'stco', and 'stts' if found as direct children.
  if (atom.type === "stbl") {
    atom.children.forEach(child => {
      if (child.type === "stsz") {
        console.log(indent + "  [stsz] (Sample Size Box) details would be processed here.");
      }
      if (child.type === "stco") {
        console.log(indent + "  [stco] (Chunk Offset Box) details would be processed here.");
      }
      if (child.type === "stts") {
        console.log(indent + "  [stts] (Time-to-Sample Box) details would be processed here.");
      }
    });
  }
  // Recursively print children.
  atom.children.forEach(child => printAtom(child, indent + "  "));
}

/**
 * Processes a complete buffer, parses atoms, and prints details.
 */
function processBuffer(buffer) {
  // Parse the entire buffer to build the atom tree.
  const atoms = parseAtoms(buffer);
  console.log("Parsed MP4 Atom Structure:");
  atoms.forEach(atom => printAtom(atom));
}

/**
 * Reads the entire file into a buffer (assuming file size is manageable)
 * and then processes it.
 */
function parseMP4File(filename) {
  console.log("Start Time: ", new Date().toLocaleTimeString());
  fs.readFile(filename, (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    processBuffer(data);
    console.log("Finished parsing file.");
    console.log("End Time: ", new Date().toLocaleTimeString());
  });
}

// Run parser on a sample MP4 file
parseMP4File("C:/Users/GGurkhude/Pictures/Mentor_app_weekly_meeting_28032023.mp4");

/*
Start Time:  4:41:15 pm
Parsed MP4 Atom Structure:
Atom: ftyp, Size: 24
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
          [stts] (Time-to-Sample Box) details would be processed here.
          [stsz] (Sample Size Box) details would be processed here.
          [stco] (Chunk Offset Box) details would be processed here.
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
          [stts] (Time-to-Sample Box) details would be processed here.
          [stsz] (Sample Size Box) details would be processed here.
          [stco] (Chunk Offset Box) details would be processed here.
          Atom: stsd, Size: 94
          Atom: stts, Size: 24
          Atom: stsc, Size: 50416
          Atom: stsz, Size: 107116
          Atom: stco, Size: 95732
Atom: mdat, Size: 227846165
Finished parsing file.
End Time:  4:41:16 pm
*/