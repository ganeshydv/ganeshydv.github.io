---
layout: page
title: Categories
permalink: /categories/
---

# 📚 Blog Categories

Explore my technical learning journey organized by main domains and specialized topics.

---

## ☁️ Cloud & DevOps

### AWS Services
- **Serverless Computing:** Lambda functions, event-driven architecture
- **Storage & Databases:** S3, DynamoDB, RDS integration patterns
- **Container Orchestration:** ECS, Fargate deployment strategies
- **API Management:** API Gateway, authentication, rate limiting
- **Infrastructure:** IAM, VPC, security best practices

**📖 [Read Complete AWS Cloud Services Guide →](/2025/07/22/aws-cloud-services-complete-guide.html)**

### DevOps & Deployment
- **Containerization:** Docker fundamentals, multi-stage builds
- **Infrastructure as Code:** AWS SAM, CloudFormation templates
- **CI/CD Pipelines:** Automated deployment, testing strategies
- **Monitoring:** CloudWatch, logging, performance metrics

---

## 💻 Programming Languages

### Java & Spring Ecosystem
- **Spring Boot:** Application development, dependency injection
- **Data Access:** JPA, Hibernate, database patterns
- **Concurrency:** Multithreading, locks, synchronization
- **Advanced Java:** Memory management, JVM internals

**📖 [Read Complete Java & Spring Boot Guide →](/2025/07/22/java-spring-boot-complete-guide.html)**

### JavaScript & Node.js
- **Core Concepts:** Event loop, closures, prototypes
- **Async Programming:** Promises, async/await, error handling
- **Node.js Runtime:** Modules, file system, networking
- **Modern JavaScript:** ES6+, destructuring, arrow functions

### TypeScript & Rust
- **Type Safety:** Advanced TypeScript patterns
- **Systems Programming:** Rust fundamentals and concepts

---

## 🏗️ System Design & Architecture

### Distributed Systems
- **Consistency Models:** CAP theorem, eventual consistency
- **Scalability Patterns:** Load balancing, horizontal scaling
- **Data Distribution:** Sharding, partitioning strategies
- **Communication:** Message queues, event-driven architecture

**📖 [Read Complete System Design & Architecture Guide →](/2025/07/22/system-design-architecture-guide.html)**

### Database Design
- **SQL Optimization:** Indexing, query performance
- **NoSQL Patterns:** DynamoDB design, data modeling
- **ACID Properties:** Transaction management, isolation levels
- **Performance:** Connection pooling, caching strategies

**📖 [Read Complete Database Design & Management Guide →](/2025/07/22/database-design-management-guide.html)**

---

## 🛠️ Development & Testing

### Testing Frameworks
- **Load Testing:** JMeter performance testing
- **Unit Testing:** Jest, Karma, testing best practices
- **API Testing:** Integration testing patterns

### Frontend Development
- **React Ecosystem:** Component architecture, state management
- **Angular Framework:** Services, dependency injection, testing
- **UI/UX Patterns:** Responsive design, component libraries

### Authentication & Security
- **JWT Implementation:** Token management, security patterns
- **OAuth Flows:** Authentication protocols
- **Keycloak Integration:** Identity management

---

## 🔬 Computer Science Fundamentals

### Operating Systems
- **Process Management:** Scheduling, context switching
- **Memory Management:** Heap, stack, garbage collection
- **System Calls:** OS interaction, device drivers

## 🖥️ Computer Science Fundamentals

### Networking
- **Protocol Stack:** TCP/IP, HTTP/HTTPS fundamentals
- **Network Communication:** DNS resolution, routing
- **Performance:** Network optimization, latency reduction

**📖 [Read Complete Computer Networking Guide →](/2025/07/22/computer-networking-complete-guide.html)**

### Algorithms & Data Structures
- **Sorting Algorithms:** Bubble sort, complexity analysis
- **Data Structures:** Arrays, trees, graphs
- **Problem Solving:** LeetCode patterns, optimization

**📖 [Read Complete Data Structures & Algorithms Guide →](/2025/07/22/data-structures-algorithms-guide.html)**

### Multimedia Processing
- **Video Formats:** MP4, streaming protocols
- **File Processing:** Upload strategies, format conversion

---

## 🔍 Browse All Posts by Category

{% assign categories = site.posts | map: 'categories' | join: ',' | split: ',' | uniq | sort %}

{% for category in categories %}
  {% if category != "" %}
### {{ category | capitalize | replace: '-', ' ' }}
    {% assign posts = site.posts | where: 'categories', category %}
    {% for post in posts limit: 5 %}
- [{{ post.title }}]({{ post.url }}) - {{ post.date | date: "%B %Y" }}
    {% endfor %}
    {% assign remaining = posts.size | minus: 5 %}
    {% if remaining > 0 %}
- *... and {{ remaining }} more posts*
    {% endif %}

  {% endif %}
{% endfor %}

---

## 📊 Content Statistics

- **Total Posts:** {{ site.posts.size }}
- **Categories:** 5 main domains
- **Specialized Topics:** 20+ sub-areas
- **Regular Updates:** New content added weekly

---

*Use the search function to find specific topics across all categories!*
