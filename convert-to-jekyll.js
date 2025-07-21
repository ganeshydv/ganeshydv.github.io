const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const postsDir = path.join(rootDir, '_posts');

// Ensure _posts directory exists
if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir);
}

// Category mapping for better organization
const categoryMapping = {
    '0_AWS': 'aws',
    '0_AWS_SAM': 'aws',
    '0_AWS_SAM_Localstack': 'aws',
    '0_AWS_sdk_v2_v3': 'aws',
    '0_AWS_Serverless': 'aws',
    '1_OS': 'operating-systems',
    '2_Networking': 'networking',
    '3_SystemDesign': 'system-design',
    '4_DataBase_RDS_DynamoDB': 'databases',
    '4_Docker': 'devops',
    '5_Auth_JWT': 'authentication',
    '6_Node_Dev': 'nodejs',
    'JAVA': 'java',
    'JMeter': 'testing',
    'keycloak_': 'authentication',
    'NestJs': 'nodejs',
    'React_Angular': 'frontend',
    'RustEx': 'rust',
    'SonarQube': 'code-quality',
    'Testing': 'testing',
    'VideoProcessing': 'multimedia',
    '_DSA_NeetCode': 'algorithms',
    '_JsTutorials': 'javascript',
    '_Ts': 'typescript',
    'ExportTut': 'nodejs',
    'Js_30days_leetcode.js': 'algorithms',
    'Mongodb': 'databases',
    'Nodemailer': 'nodejs',
    'RoolsEngine_Rewards': 'nodejs',
    'socket_chat_ex': 'nodejs'
};

// Extract title from markdown content
function extractTitle(content) {
    const lines = content.split('\n');
    for (let line of lines) {
        const headingMatch = line.match(/^#+\s*(.+)/);
        if (headingMatch) {
            return headingMatch[1].replace(/[#*`>\-🔒🎯🔍💡🧵🔥🧠]/g, '').trim();
        }
    }
    return null;
}

// Generate slug from title
function generateSlug(title) {
    let slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    
    // Limit slug length to prevent filename issues
    if (slug.length > 50) {
        slug = slug.substring(0, 50).replace(/-[^-]*$/, ''); // Cut at word boundary
    }
    
    return slug;
}

// Get appropriate tags based on content
function generateTags(filePath, content) {
    const tags = [];
    const fileName = path.basename(filePath, '.md').toLowerCase();
    const contentLower = content.toLowerCase();
    
    // Add tags based on content analysis
    if (contentLower.includes('aws') || contentLower.includes('lambda') || contentLower.includes('s3')) tags.push('aws');
    if (contentLower.includes('dynamodb')) tags.push('dynamodb');
    if (contentLower.includes('java') || contentLower.includes('spring')) tags.push('java');
    if (contentLower.includes('javascript') || contentLower.includes('node')) tags.push('javascript');
    if (contentLower.includes('typescript')) tags.push('typescript');
    if (contentLower.includes('database') || contentLower.includes('sql')) tags.push('database');
    if (contentLower.includes('docker')) tags.push('docker');
    if (contentLower.includes('react') || contentLower.includes('angular')) tags.push('frontend');
    if (contentLower.includes('networking') || contentLower.includes('tcp') || contentLower.includes('http')) tags.push('networking');
    if (contentLower.includes('multithreading') || contentLower.includes('thread')) tags.push('concurrency');
    if (contentLower.includes('acid') || contentLower.includes('isolation')) tags.push('transactions');
    
    return [...new Set(tags)]; // Remove duplicates
}

// Convert file to Jekyll post format
function convertToPost(filePath, relativePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const title = extractTitle(content);
        
        if (!title) {
            console.log(`Skipping ${relativePath} - no title found`);
            return;
        }
        
        // Determine category from path
        const pathParts = relativePath.split(path.sep);
        const topLevelDir = pathParts[0];
        const category = categoryMapping[topLevelDir] || 'general';
          // Generate filename and date
        const today = new Date();
        const dateStr = today.toISOString().split('T')[0];
        const slug = generateSlug(title);
        
        // Ensure total filename length is reasonable
        const maxSlugLength = 80; // Leave room for date and extension
        const finalSlug = slug.length > maxSlugLength ? slug.substring(0, maxSlugLength) : slug;
        
        const postFileName = `${dateStr}-${finalSlug}.md`;
        const postPath = path.join(postsDir, postFileName);
        
        // Skip if post already exists
        if (fs.existsSync(postPath)) {
            console.log(`Post already exists: ${postFileName}`);
            return;
        }
        
        const tags = generateTags(filePath, content);
        const categories = [category];
        
        // Add subcategory if applicable
        if (pathParts.length > 1) {
            const subCategory = pathParts[1].toLowerCase().replace(/[^a-z0-9]/g, '-');
            if (subCategory !== category) {
                categories.push(subCategory);
            }
        }
        
        // Create front matter
        const frontMatter = `---
layout: post
title: "${title}"
date: ${dateStr}
categories: [${categories.join(', ')}]
tags: [${tags.join(', ')}]
author: "GGurkhude"
excerpt: "Learning notes on ${title.toLowerCase()}"
original_path: "${relativePath.replace(/\\/g, '/')}"
---

`;
        
        // Write the Jekyll post
        const postContent = frontMatter + content;
        fs.writeFileSync(postPath, postContent, 'utf-8');
        console.log(`Created post: ${postFileName}`);
        
    } catch (error) {
        console.error(`Error converting ${relativePath}:`, error.message);
    }
}

// Recursively find and convert markdown files
function convertMarkdownFiles(dir, basePath = '') {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const relativePath = path.join(basePath, file);
        
        if (fs.statSync(fullPath).isDirectory()) {
            // Skip certain directories
            if (['node_modules', '_posts', '_site', '.git', '.jekyll-cache'].includes(file)) {
                return;
            }
            convertMarkdownFiles(fullPath, relativePath);
        } else if (file.endsWith('.md') && file !== 'README.md' && file !== 'Readme.md' && 
                   file !== 'index.md' && file !== 'about.md' && file !== 'categories.md') {
            convertToPost(fullPath, relativePath);
        }
    });
}

// Main execution
console.log('Converting Markdown files to Jekyll posts...');
convertMarkdownFiles(rootDir);
console.log('Conversion complete!');
console.log('\nNext steps:');
console.log('1. Run: bundle install');
console.log('2. Run: bundle exec jekyll serve');
console.log('3. Visit: http://localhost:4000');
