---
layout: post
title: "Welcome to My Tech Journey �"
date: 2025-07-21
categories: [general]
tags: [aws, dynamodb, java, database, docker, networking, concurrency, transactions]
author: "GGurkhude"
excerpt: "Learning notes on welcome to my tech journey �"
original_path: "index-old.md"
---

---
layout: home
title: "Tech Skills Blog"
---

# Welcome to My Tech Journey 🚀

This blog documents my learning journey through various technologies including AWS, Java, Databases, System Design, and more. Each post represents hands-on experience and practical insights gained through real-world projects.

## 📚 What You'll Find Here

- **AWS Services**: Deep dives into Lambda, DynamoDB, ECS, and more
- **Java & Spring**: Multithreading, JPA, Spring Boot best practices  
- **System Design**: ACID properties, isolation levels, distributed systems
- **Databases**: SQL, NoSQL, optimization techniques
- **Networking**: TCP/IP, HTTP, load balancing
- **DevOps**: Docker, CI/CD, monitoring

## 🎯 Recent Posts

{% for post in site.posts limit:5 %}
- [{{ post.title }}]({{ post.url }}) - {{ post.date | date: "%B %d, %Y" }}
{% endfor %}

## 📂 Browse by Category

- [AWS]({{ '/categories/aws' | relative_url }})
- [Java]({{ '/categories/java' | relative_url }})
- [Databases]({{ '/categories/databases' | relative_url }})
- [System Design]({{ '/categories/system-design' | relative_url }})
- [Networking]({{ '/categories/networking' | relative_url }})

---

*Happy learning! 🎉*
