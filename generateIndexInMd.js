const fs = require('fs');
const path = require('path');

// Root directory of your workspace
const rootDir = __dirname;

// Recursively build a nested structure of folders and their .md files
function buildFolderTree(dir, basePath = '') {
    const files = fs.readdirSync(dir);
    let tree = {};
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const relativePath = path.join(basePath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file === 'node_modules') return;
            const subTree = buildFolderTree(fullPath, relativePath);
            if (Object.keys(subTree).length > 0) {
                tree[file] = subTree;
            }
        } else if (file.endsWith('.md')) {
            tree[file] = relativePath;
        }
    });
    return tree;
}

// Extract a meaningful title from a Markdown file (first heading or comment)
function extractTitle(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');
        for (let line of lines) {
            const headingMatch = line.match(/^#\s*(.+)/);
            if (headingMatch) return headingMatch[1].trim();
            const commentMatch = line.match(/^<!--\s*(.+?)\s*-->/);
            if (commentMatch) return commentMatch[1].trim();
        }
    } catch (e) {}
    return null;
}

// Generate Markdown index from the folder tree
function generateMarkdown(tree, parentPath = '') {
    let content = '';
    for (const key in tree) {
        if (typeof tree[key] === 'string') {
            const filePath = path.join(rootDir, tree[key]);
            let title = extractTitle(filePath);
            if (!title) {
                title = path.basename(key, '.md').replace(/_/g, ' ');
            }
            const link = tree[key].replace(/\\/g, '/');
            content += `- [${title}](${link})\n`;
        } else {
            content += `\n### ${key}\n`;
            content += generateMarkdown(tree[key], path.join(parentPath, key));
        }
    }
    return content;
}

// Write the index to Readme.md
function writeReadme(tree) {
    let content = '# Project Documentation\n\n## Index\n';
    content += generateMarkdown(tree);
    fs.writeFileSync(path.join(rootDir, 'Readme.md'), content, 'utf-8');
}

// Main execution
const folderTree = buildFolderTree(rootDir);
writeReadme(folderTree);

console.log('Readme.md index updated successfully!');