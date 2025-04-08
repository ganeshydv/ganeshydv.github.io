const fs = require('fs');
const path = require('path');

// Root directory of your workspace
const rootDir = __dirname;

// Function to recursively find all .md files
function findMarkdownFiles(dir, basePath = '') {
    let files = fs.readdirSync(dir);
    let markdownFiles = [];

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const relativePath = path.join(basePath, file);

        // Exclude node_modules or any other folder
        if (fs.statSync(fullPath).isDirectory()) {
            if (file === 'node_modules') return; // Skip node_modules
            markdownFiles = markdownFiles.concat(findMarkdownFiles(fullPath, relativePath));
        } else if (file.endsWith('.md')) {
            markdownFiles.push(relativePath);
        }
    });

    return markdownFiles;
}

// Function to generate the index
function generateIndex(markdownFiles) {
    const index = {};
    markdownFiles.forEach(file => {
        console.log(`Processing file: ${file}`); // Debugging line
        
        const parts = file.split(path.sep);
        const category = parts.length > 1 ? parts[0] : 'Miscellaneous';
        const fileName = parts.slice(1).join('/');
        console.log(`File: ${fileName}, Category: ${category}`); // Debugging line
        
        if (!index[category]) {
            index[category] = [];
        }
        index[category].push(file);
    });

    return index;
}

// Function to write the index to Readme.md
function writeReadme(index) {
    let content = '# Project Documentation\n\n## Table of Contents\n\n';

    Object.keys(index).forEach((category, i) => {
        content += `${i + 1}. [${category}](#${category.toLowerCase().replace(/\s+/g, '-')})\n`;
    });

    content += '\n---\n\n';

    Object.keys(index).forEach(category => {
        content += `## ${category}\n\n`;
        index[category].forEach(file => {
            const link = file.replace(/\\/g, '/');
            const name = path.basename(file, '.md').replace(/_/g, ' ');
            content += `- [${name}](${link}) - *(${link})*\n`; // Added relative path
        });
        content += '\n---\n\n';
    });

    fs.writeFileSync(path.join(rootDir, 'Readme.md'), content, 'utf-8');
}

// Main execution
const markdownFiles = findMarkdownFiles(rootDir);
const index = generateIndex(markdownFiles);
writeReadme(index);

console.log('Readme.md index updated successfully!');