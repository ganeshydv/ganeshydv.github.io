---
layout: page
title: "Java & Spring Framework"
permalink: /java/
---

# ☕ Java & Spring Framework

Comprehensive collection of Java tutorials, Spring Boot guides, and enterprise development patterns.

## 📖 All Java Articles

{% assign java_docs = site.java | sort: 'title' %}
{% for doc in java_docs %}
### [{{ doc.title }}]({{ doc.url | relative_url }})
{% if doc.subcategory %}_{{ doc.subcategory }}_{% endif %}
{% if doc.excerpt %}{{ doc.excerpt | strip_html | truncatewords: 20 }}{% endif %}

---
{% endfor %}

## 🏷️ Topics Covered

- **Core Java**: JVM, JRE, JDK, Memory Management, Garbage Collection
- **Spring Boot**: Auto-configuration, Request Handling, Exception Handling
- **Build Tools**: Maven, POM configuration, Lifecycle management  
- **Persistence**: JDBC, Hibernate, JPA, Entity mapping
- **Concurrency**: Multithreading, Locks, Synchronization, ReentrantLock
- **Enterprise**: Server configuration, Dependency injection

[← Back to Collections](/collections/)
