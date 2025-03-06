const fs = require('fs');

const profileData = JSON.parse(fs.readFileSync('vscode-profile-2025-02-24-15-23-51.cpuprofile', 'utf8'));

// Print function names sorted by execution time
const functions = profileData.nodes.map(node => ({
    functionName: node.callFrame.functionName,
    scriptId: node.callFrame.scriptId,
    url: node.callFrame.url,
    lineNumber: node.callFrame.lineNumber,
    hitCount: node.hitCount
}));

functions.sort((a, b) => (b.hitCount || 0) - (a.hitCount || 0));

console.table(functions.slice(0, 10)); // Top 10 most CPU-consuming functions
