---
layout: post
title: "Tech Skills Blog"
date: 2025-07-21
categories: [general]
tags: [javascript, networking]
author: "GGurkhude"
excerpt: "Learning notes on tech skills blog"
original_path: "README-BLOG.md"
---

# Tech Skills Blog

A Jekyll-powered blog documenting my journey through various technologies.

## Quick Start

1. **Install dependencies:**
   ```bash
   bundle install
   ```

2. **Convert existing markdown files to Jekyll posts:**
   ```bash
   node convert-to-jekyll.js
   ```

3. **Run locally:**
   ```bash
   bundle exec jekyll serve
   ```

4. **Visit:** http://localhost:4000

## GitHub Pages Deployment

1. **Create a new repository** named `your-username.github.io`
2. **Push this code** to the repository
3. **Enable GitHub Pages** in Settings → Pages
4. **Your site will be live** at `https://your-username.github.io`

## Customization

- Edit `_config.yml` to update site settings
- Modify `about.md` with your information
- Update social links in `_config.yml`
- Add Google Analytics ID if needed

## Adding New Posts

Either:
1. **Manual:** Create files in `_posts/` with format: `YYYY-MM-DD-title.md`
2. **Automatic:** Run `node convert-to-jekyll.js` to convert new markdown files

## File Structure

```
├── _config.yml          # Site configuration
├── _posts/              # Blog posts
├── index.md             # Homepage
├── about.md             # About page
├── categories.md        # Categories page
├── Gemfile              # Ruby dependencies
└── convert-to-jekyll.js # Conversion script
```

## Features

- ✅ Responsive design with Minima theme
- ✅ Categories and tags
- ✅ SEO optimization
- ✅ RSS feed
- ✅ Sitemap
- ✅ Social links
- ✅ Mobile-friendly

## Original Files

Your original markdown files remain unchanged. The conversion script creates new Jekyll posts in `_posts/` without modifying the source files.
