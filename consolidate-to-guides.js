#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Main folders to process and their configurations
const folderConfigs = {
  'JAVA': {
    title: 'Java & Spring Boot Complete Guide',
    category: 'Programming Languages',
    subcategory: 'Java & Spring',
    description: 'Comprehensive guide covering Java fundamentals, Spring Boot, Maven, JPA, Hibernate, and Multithreading'
  },
  '0_AWS': {
    title: 'AWS Cloud Services Complete Guide',
    category: 'Cloud & DevOps', 
    subcategory: 'AWS Services',
    description: 'Complete AWS guide covering Lambda, ECS, IAM, API Gateway, DynamoDB, and deployment strategies'
  },
  '_JsTutorials': {
    title: 'JavaScript & Node.js Complete Guide',
    category: 'Programming Languages',
    subcategory: 'JavaScript & Node.js',
    description: 'Modern JavaScript development guide covering ES6+, Node.js, async programming, and frontend frameworks'
  },
  '4_DataBase_RDS_DynamoDB': {
    title: 'Database Design & Management Guide',
    category: 'System Design & Architecture',
    subcategory: 'Database Design',
    description: 'Complete database guide covering RDS, DynamoDB, SQL optimization, and database architecture'
  },
  '3_SystemDesign': {
    title: 'System Design & Architecture Guide',
    category: 'System Design & Architecture',
    subcategory: 'Distributed Systems',
    description: 'Comprehensive system design guide covering scalability, consistency, CAP theorem, and architecture patterns'
  },
  '2_Networking': {
    title: 'Computer Networking Complete Guide',
    category: 'Computer Science Fundamentals',
    subcategory: 'Networking',
    description: 'Complete networking guide covering TCP/IP, DNS, routing, protocols, and network security'
  },
  '_DSA_NeetCode': {
    title: 'Data Structures & Algorithms Guide',
    category: 'Computer Science Fundamentals',
    subcategory: 'Algorithms & Data Structures',
    description: 'Complete DSA guide covering sorting, searching, trees, graphs, and coding patterns'
  }
};

function parseFileIndex(filename) {
  // Extract numerical index from filename like "RDS_0.md", "1.1_IAM_MFA.md", "3.2.1_multithreading_monitor_lock_.md"
  const indexMatch = filename.match(/^(\d+(?:\.\d+)*)/);
  if (indexMatch) {
    return indexMatch[1].split('.').map(num => parseInt(num));
  }
  
  // Check for patterns like "RDS_0.md"
  const altMatch = filename.match(/.*?(\d+(?:\.\d+)*)(?:_|\.)/);
  if (altMatch) {
    return altMatch[1].split('.').map(num => parseInt(num));
  }
  
  return [999]; // Put non-indexed files at the end
}

function compareIndices(a, b) {
  const aIndex = parseFileIndex(a);
  const bIndex = parseFileIndex(b);
  
  for (let i = 0; i < Math.max(aIndex.length, bIndex.length); i++) {
    const aNum = aIndex[i] || 0;
    const bNum = bIndex[i] || 0;
    if (aNum !== bNum) {
      return aNum - bNum;
    }
  }
  return 0;
}

function cleanSectionTitle(filename) {
  return filename
    .replace(/\.md$/, '')
    .replace(/^\d+(?:\.\d+)*[_\-]*/, '') // Remove leading numbers
    .replace(/[_\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ') || 'Introduction';
}

function generateSectionId(filename) {
  const index = parseFileIndex(filename);
  return index.join('-');
}

function processFolder(folderPath, config) {
  if (!fs.existsSync(folderPath)) {
    console.log(`Folder ${folderPath} does not exist, skipping...`);
    return null;
  }

  console.log(`\nProcessing folder: ${folderPath}`);
  
  let allContent = [];
  let processedFiles = new Set();

  function processDirectory(dirPath, level = 0) {
    const items = fs.readdirSync(dirPath);
    const files = items.filter(item => {
      const itemPath = path.join(dirPath, item);
      return fs.statSync(itemPath).isFile() && item.endsWith('.md') && !processedFiles.has(item);
    });

    const subfolders = items.filter(item => {
      const itemPath = path.join(dirPath, item);
      return fs.statSync(itemPath).isDirectory();
    });

    // Sort files by index
    files.sort(compareIndices);

    // Process files in current directory
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const relativePath = path.relative(folderPath, dirPath);
      
      if (processedFiles.has(file)) return;
      processedFiles.add(file);

      try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove existing front matter if present
        content = content.replace(/^---[\s\S]*?---\n/, '');
        
        // Skip empty files
        if (content.trim().length === 0) return;

        const sectionTitle = cleanSectionTitle(file);
        const sectionId = generateSectionId(file);
        const headerLevel = level + 2; // Start from ## for main sections
        const headerPrefix = '#'.repeat(Math.min(headerLevel, 6));
        
        let sectionHeader = `${headerPrefix} ${sectionId}. ${sectionTitle} {#section-${sectionId}}\n\n`;
        
        // Add subsection info if in subfolder
        if (relativePath && relativePath !== '.') {
          sectionHeader += `> **Topic: ${relativePath.replace(/[_\-]/g, ' ')}**\n\n`;
        }

        allContent.push({
          index: parseFileIndex(file),
          title: sectionTitle,
          content: sectionHeader + content.trim(),
          level: level,
          file: file,
          subfolder: relativePath !== '.' ? relativePath : null
        });

        console.log(`  ✓ Added section ${sectionId}: ${sectionTitle}`);
      } catch (error) {
        console.log(`  ✗ Error processing ${file}: ${error.message}`);
      }
    });

    // Process subfolders
    subfolders.forEach(subfolder => {
      const subfolderPath = path.join(dirPath, subfolder);
      console.log(`  Processing subfolder: ${subfolder}`);
      
      // Add subfolder header
      const subfolderTitle = subfolder.replace(/[_\-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const subfolderHeaderLevel = level + 2;
      const subfolderHeaderPrefix = '#'.repeat(Math.min(subfolderHeaderLevel, 6));
      
      allContent.push({
        index: [0], // Folder headers come first
        title: subfolderTitle,
        content: `${subfolderHeaderPrefix} ${subfolderTitle}\n\n`,
        level: level + 1,
        file: `__folder_${subfolder}`,
        subfolder: subfolder
      });

      processDirectory(subfolderPath, level + 1);
    });
  }

  processDirectory(folderPath);

  if (allContent.length === 0) {
    console.log(`No content found in ${folderPath}`);
    return null;
  }

  // Sort all content by index and level
  allContent.sort((a, b) => {
    if (a.level !== b.level) return a.level - b.level;
    return compareIndices(a.file, b.file);
  });

  // Generate table of contents
  let toc = "## 📚 Table of Contents\n\n";
  allContent.forEach(section => {
    if (!section.file.startsWith('__folder_')) {
      const indent = '  '.repeat(section.level);
      const sectionId = generateSectionId(section.file);
      toc += `${indent}- [${sectionId}. ${section.title}](#section-${sectionId})\n`;
    }
  });
  toc += "\n---\n\n";

  // Combine all content
  const combinedContent = allContent.map(section => section.content).join('\n\n---\n\n');

  // Create front matter
  const frontMatter = `---
layout: post
title: "${config.title}"
categories: ["${config.category}", "${config.subcategory}"]
tags: [${config.subcategory.toLowerCase().replace(/\s+/g, '-')}, complete-guide]
date: ${new Date().toISOString().split('T')[0]}
author: "GGurkhude"
description: "${config.description}"
toc: true
---

# ${config.title}

${config.description}

${toc}

${combinedContent}

---

## 🎯 Summary

This comprehensive guide covers all aspects of ${config.subcategory.toLowerCase()}, providing practical examples and best practices for real-world implementation.

## 🔗 Related Topics

- [All Categories](/categories/)
- [Technical Collections](/collections/)
- [Latest Posts](/)

---

*📝 **Note:** This guide consolidates multiple learning materials into a single comprehensive resource. Each section represents hands-on learning and practical implementation experience.*
`;

  return frontMatter;
}

// Process all folders and generate consolidated posts
function generateConsolidatedPosts() {
  console.log('🚀 Starting consolidated post generation...\n');

  // Clear existing consolidated posts
  const postsDir = '_posts';
  if (fs.existsSync(postsDir)) {
    const existingPosts = fs.readdirSync(postsDir).filter(file => 
      file.includes('complete-guide') || file.includes('comprehensive')
    );
    existingPosts.forEach(post => {
      fs.unlinkSync(path.join(postsDir, post));
      console.log(`Removed old consolidated post: ${post}`);
    });
  }

  let generatedCount = 0;

  Object.entries(folderConfigs).forEach(([folderName, config]) => {
    const consolidatedContent = processFolder(folderName, config);
    
    if (consolidatedContent) {
      const date = new Date().toISOString().split('T')[0];
      const slug = config.title.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');
      
      const filename = `${date}-${slug}.md`;
      const filepath = path.join('_posts', filename);
      
      if (!fs.existsSync('_posts')) {
        fs.mkdirSync('_posts');
      }
      
      fs.writeFileSync(filepath, consolidatedContent);
      console.log(`\n✅ Generated consolidated post: ${filename}`);
      generatedCount++;
    }
  });

  console.log(`\n🎉 Successfully generated ${generatedCount} consolidated blog posts!`);
  console.log('\n📁 Generated posts:');
  
  if (fs.existsSync('_posts')) {
    const newPosts = fs.readdirSync('_posts')
      .filter(file => file.includes(new Date().toISOString().split('T')[0]))
      .sort();
    
    newPosts.forEach(post => {
      console.log(`   📄 ${post}`);
    });
  }

  console.log('\n✨ All content is now organized into comprehensive guides!');
}

// Run the script
generateConsolidatedPosts();
