#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Collection configurations
const collections = {
  '_java': {
    category: 'Java & Spring',
    subcategory: 'Core Java'
  },
  '_aws': {
    category: 'AWS Services',
    subcategory: 'Cloud Computing'
  },
  '_jstutorials': {
    category: 'JavaScript & Node.js',
    subcategory: 'Frontend Development'
  },
  '_dsa': {
    category: 'Algorithms & Data Structures',
    subcategory: 'Computer Science'
  }
};

function cleanTitle(filename) {
  return filename
    .replace(/\.md$/, '')
    .replace(/[\d_\-\.]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function addFrontMatter(collectionPath, config) {
  if (!fs.existsSync(collectionPath)) {
    console.log(`Collection path ${collectionPath} does not exist`);
    return;
  }

  const files = fs.readdirSync(collectionPath);
  
  files.forEach(file => {
    if (!file.endsWith('.md')) return;
    
    const filePath = path.join(collectionPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if already has front matter
    if (content.startsWith('---')) {
      console.log(`Skipping ${file} - already has front matter`);
      return;
    }
    
    const title = cleanTitle(file);
    const frontMatter = `---
layout: page
title: "${title}"
category: "${config.category}"
subcategory: "${config.subcategory}"
date: ${new Date().toISOString().split('T')[0]}
tags: [${config.category.toLowerCase().replace(/\s+/g, '-')}]
---

`;
    
    fs.writeFileSync(filePath, frontMatter + content);
    console.log(`Added front matter to ${file}`);
  });
}

// Process all collections
Object.entries(collections).forEach(([collectionPath, config]) => {
  console.log(`\nProcessing ${collectionPath}...`);
  addFrontMatter(collectionPath, config);
});

console.log('\nFront matter addition complete!');
