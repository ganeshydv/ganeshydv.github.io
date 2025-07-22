---
layout: page
title: "Technical Notes Collection"
permalink: /collections/
---

# Technical Notes Collection

Welcome to my comprehensive collection of technical notes organized by topic. Each section contains practical guides, tutorials, and reference materials.

## 📚 Browse by Collection

### ☕ Java & Spring Framework
Explore Java fundamentals, Spring Boot, JPA/Hibernate, multithreading, and enterprise development patterns.

**Topics:** Core Java, Spring Boot, Maven, JDBC, Hibernate, Multithreading, Memory Management

{% assign java_docs = site.java | sort: 'title' %}
{% for doc in java_docs limit:5 %}
- [{{ doc.title }}]({{ doc.url | relative_url }})
{% endfor %}
{% if site.java.size > 5 %}
[View all {{ site.java.size }} Java articles →](/java/)
{% endif %}

---

### ☁️ AWS & Cloud Services  
AWS services, serverless architecture, ECS, Lambda, IAM, and cloud deployment strategies.

**Topics:** Lambda, ECS, IAM, API Gateway, CloudWatch, CI/CD, Serverless

{% assign aws_docs = site.aws | sort: 'title' %}
{% for doc in aws_docs limit:5 %}
- [{{ doc.title }}]({{ doc.url | relative_url }})
{% endfor %}
{% if site.aws.size > 5 %}
[View all {{ site.aws.size }} AWS articles →](/aws/)
{% endif %}

---

### 🌐 JavaScript & Node.js
Modern JavaScript, ES6+, Node.js, async programming, and frontend development.

**Topics:** Event Loop, Promises, Closures, Prototypes, Async/Await, DOM Manipulation

{% assign js_docs = site.jstutorials | sort: 'title' %}
{% for doc in js_docs limit:5 %}
- [{{ doc.title }}]({{ doc.url | relative_url }})
{% endfor %}
{% if site.jstutorials.size > 5 %}
[View all {{ site.jstutorials.size }} JavaScript articles →](/javascript/)
{% endif %}

---

### 🧮 Algorithms & Data Structures
Computer science fundamentals, coding patterns, and algorithmic problem-solving techniques.

**Topics:** Sorting, Searching, Data Structures, Algorithm Analysis, Coding Patterns

{% assign dsa_docs = site.dsa | sort: 'title' %}
{% for doc in dsa_docs limit:5 %}
- [{{ doc.title }}]({{ doc.url | relative_url }})
{% endfor %}
{% if site.dsa.size > 5 %}
[View all {{ site.dsa.size }} DSA articles →](/algorithms/)
{% endif %}

---

## 🔍 All Categories

<div class="collection-grid">
  <div class="collection-card">
    <h3>☕ Java & Spring</h3>
    <p>{{ site.java.size }} articles</p>
    <a href="/java/">Browse Java →</a>
  </div>
  
  <div class="collection-card">
    <h3>☁️ AWS Services</h3>
    <p>{{ site.aws.size }} articles</p>
    <a href="/aws/">Browse AWS →</a>
  </div>
  
  <div class="collection-card">
    <h3>🌐 JavaScript</h3>
    <p>{{ site.jstutorials.size }} articles</p>
    <a href="/javascript/">Browse JavaScript →</a>
  </div>
  
  <div class="collection-card">
    <h3>🧮 Algorithms</h3>
    <p>{{ site.dsa.size }} articles</p>
    <a href="/algorithms/">Browse DSA →</a>
  </div>
</div>

<style>
.collection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.collection-card {
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 1rem;
  text-align: center;
  background: #f6f8fa;
}

.collection-card h3 {
  margin: 0 0 0.5rem 0;
  color: #0366d6;
}

.collection-card p {
  margin: 0.5rem 0;
  color: #586069;
}

.collection-card a {
  display: inline-block;
  margin-top: 0.5rem;
  color: #0366d6;
  text-decoration: none;
  font-weight: 500;
}

.collection-card a:hover {
  text-decoration: underline;
}
</style>
