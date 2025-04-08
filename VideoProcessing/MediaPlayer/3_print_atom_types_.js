const fs = require("fs");

// Helper to safely read a 32-bit unsigned integer in big-endian from a Buffer.
function readUInt32BE(buffer, offset) {
  if (offset + 4 > buffer.length) return null;
  return buffer.readUInt32BE(offset);
}

// Function to process atoms and identify their type
function processAtom(buffer, offset) {
  const atomSize = readUInt32BE(buffer, offset);
  const atomType = buffer.toString("utf8", offset + 4, offset + 8);

  console.log(`Found atom: ${atomType}, Size: ${atomSize}`);

  // Check for specific atom types
  if (atomType === "moov") {
    console.log("Processing 'moov' atom...");
    processMoov(buffer.slice(offset + 8, offset + atomSize));
  }

  return atomSize;
}

// Function to process the 'moov' atom
function processMoov(buffer) {
  let offset = 0;

  while (offset + 8 <= buffer.length) {
    const atomSize = readUInt32BE(buffer, offset);
    const atomType = buffer.toString("utf8", offset + 4, offset + 8);

    if (atomType === "trak") {
      console.log("Found 'trak' atom...");
      processTrak(buffer.slice(offset + 8, offset + atomSize));
    }

    offset += atomSize;
  }
}

// Function to process the 'trak' atom
function processTrak(buffer) {
  let offset = 0;

  while (offset + 8 <= buffer.length) {
    const atomSize = readUInt32BE(buffer, offset);
    const atomType = buffer.toString("utf8", offset + 4, offset + 8);

    if (atomType === "mdia") {
      console.log("Found 'mdia' atom...");
      processMdia(buffer.slice(offset + 8, offset + atomSize));
    }

    offset += atomSize;
  }
}

// Function to process the 'mdia' atom
function processMdia(buffer) {
  let offset = 0;

  while (offset + 8 <= buffer.length) {
    const atomSize = readUInt32BE(buffer, offset);
    const atomType = buffer.toString("utf8", offset + 4, offset + 8);

    if (atomType === "hdlr") {
      const handlerType = buffer.toString("utf8", offset + 16, offset + 20);
      console.log(`Handler type: ${handlerType}`);
      if (handlerType === "vide") {
        console.log("This is a video track.");
      } else if (handlerType === "soun") {
        console.log("This is an audio track.");
      } else if (handlerType === "subt") {
        console.log("This is a subtitle track.");
      }
    }

    offset += atomSize;
  }
}

// Function to parse atoms recursively
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
      processAtom(buffer, offset);
    }
    atoms.push(atom);
    offset += size;
  }
  return atoms;
}

// Function to print atom details
function printAtom(atom, indent = "") {
  console.log(`${indent}Atom: ${atom.type}, Size: ${atom.size}`);
  // Recursively print children.
  atom.children.forEach(child => printAtom(child, indent + "  "));
}

// Function to process the buffer and parse atoms
function processBuffer(buffer) {
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

// Function to parse an MP4 file stream
function parseMP4Stream(filename) {
  console.log("Start Time: ", new Date().toLocaleTimeString());
  let leftoverBuffer = Buffer.alloc(0);

  const stream = fs.createReadStream(filename, { highWaterMark: 64 * 1024 });

  stream.on("data", (chunk) => {
    leftoverBuffer = Buffer.concat([leftoverBuffer, chunk]);
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

// Run the parser on a sample MP4 file
parseMP4Stream("C:/Users/GGurkhude/Pictures/Mentor_app_weekly_meeting_28032023.mp4");