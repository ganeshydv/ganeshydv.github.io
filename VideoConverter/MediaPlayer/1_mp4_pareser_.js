const fs = require("fs");

// Helper to safely read a 32-bit unsigned integer in big-endian from a Buffer.
function readUInt32BE(buffer, offset) {
  if (offset + 4 > buffer.length) return null;
  return buffer.readUInt32BE(offset);
}
//log start time
console.log("Start Time: ", new Date().toLocaleTimeString());

function processBuffer(buffer) {
  let offset = 0;

  // Process as many complete atoms as possible.
  while (offset + 8 <= buffer.length) {
    // Read the atom size (first 4 bytes) and type (next 4 bytes)
    const atomSize = readUInt32BE(buffer, offset);
    if (!atomSize) break; // Not enough data for the size.

    // Ensure that the complete atom is within the buffer.
    if (offset + atomSize > buffer.length) {
      // Incomplete atom: wait for more data.
      break;
    }

    // Read the atom type.
    const atomType = buffer.toString("utf8", offset + 4, offset + 8);
    console.log(`Found atom: ${atomType}, Size: ${atomSize}`);

    // For demonstration, you can implement specific logic for different atom types.
    // e.g., if (atomType === "ftyp") { ... }

    // Move the offset to the end of the current atom.
    offset += atomSize;
  }

  // Return the leftover buffer (incomplete data) that wasn't processed.
  return buffer.slice(offset);
}

function parseMP4Stream(filename) {
  let leftoverBuffer = Buffer.alloc(0);

  const stream = fs.createReadStream(filename, { highWaterMark: 64 * 1024 });
  
  stream.on("data", (chunk) => {
    // Append new chunk to leftover buffer.
    leftoverBuffer = Buffer.concat([leftoverBuffer, chunk]);

    // Process the accumulated buffer.
    leftoverBuffer = processBuffer(leftoverBuffer);
  });

  stream.on("end", () => {
    // After the stream ends, check if there's any remaining unprocessed data.
    if (leftoverBuffer.length > 0) {
      console.log("Remaining unprocessed data:", leftoverBuffer.length, "bytes");
      // Optionally handle any final processing if the data is complete or report an error.
    } else {
      console.log("Finished parsing file.");
    }
    //log end time
    console.log("End Time: ", new Date().toLocaleTimeString());
  });

  stream.on("error", (err) => {
    console.error("Stream error:", err);
  });
}


// Run parser on a sample MP4 file
parseMP4Stream("C:/Users/GGurkhude/Pictures/Mentor_app_weekly_meeting_28032023.mp4");

