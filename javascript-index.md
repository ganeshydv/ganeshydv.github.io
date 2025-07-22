---
layout: page
title: "JavaScript & Node.js"
permalink: /javascript/
---

# 🌐 JavaScript & Node.js

Modern JavaScript development, Node.js backend programming, and frontend frameworks.

## 📖 All JavaScript Articles

{% assign js_docs = site.jstutorials | sort: 'title' %}
{% for doc in js_docs %}
### [{{ doc.title }}]({{ doc.url | relative_url }})
{% if doc.subcategory %}_{{ doc.subcategory }}_{% endif %}
{% if doc.excerpt %}{{ doc.excerpt | strip_html | truncatewords: 20 }}{% endif %}

---
{% endfor %}

## 🏷️ Topics Covered

- **ES6+ Features**: Arrow functions, Classes, Modules, Destructuring
- **Async Programming**: Promises, Async/Await, Event Loop, Callbacks
- **Core Concepts**: Closures, Hoisting, Prototypes, `this` keyword
- **Functions**: Pure functions, Factory functions, Higher-order functions
- **Objects**: Object literals, Property checking, Merging, Inheritance
- **Node.js**: Backend development, File handling, Module system
- **Best Practices**: Code organization, Error handling, Performance

[← Back to Collections](/collections/)
