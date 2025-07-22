---
layout: page
title: Categories
permalink: /categories/
---

# 📚 Blog Categories

Explore my technical learning journey organized by main domains and specialized topics.

<!-- ---

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
- **File Processing:** Upload strategies, format conversion -->

---

## 🔍 Browse All Posts by Category

{% comment %}
Group posts by main category (folder-based) and then by subcategory (subfolder-based)
This creates a logical hierarchy that follows the actual folder structure
{% endcomment %}

{% assign main_categories = site.posts | map: 'categories' | map: 'first' | uniq | sort %}

{% for main_category in main_categories %}
  {% if main_category != "" %}
## 📁 {{ main_category }}

    {% comment %}Get all subcategories for this main category{% endcomment %}
    {% assign main_cat_posts = site.posts | where_exp: "item", "item.categories[0] == main_category" %}
    {% assign subcategories = main_cat_posts | map: 'categories' | map: 'last' | uniq | sort %}
    
    {% for subcategory in subcategories %}
      {% if subcategory != "" and subcategory != main_category %}
### 📂 {{ subcategory }}
        {% assign topic_posts = site.posts | where_exp: "item", "item.categories[0] == main_category and item.categories[1] == subcategory" | sort: 'title' %}
        {% for post in topic_posts limit: 8 %}
- [{{ post.title }}]({{ post.url }}) - {{ post.date | date: "%B %Y" }}
        {% endfor %}
        {% assign remaining = topic_posts.size | minus: 8 %}
        {% if remaining > 0 %}
- *... and {{ remaining }} more posts in {{ subcategory }}*
        {% endif %}

      {% endif %}
    {% endfor %}

    {% comment %}Also show posts that only have main category{% endcomment %}
    {% assign main_only_posts = site.posts | where_exp: "item", "item.categories[0] == main_category and item.categories.size == 1" | sort: 'title' %}
    {% if main_only_posts.size > 0 %}
### 📄 General {{ main_category }} Posts
      {% for post in main_only_posts limit: 5 %}
- [{{ post.title }}]({{ post.url }}) - {{ post.date | date: "%B %Y" }}
      {% endfor %}
      {% assign remaining = main_only_posts.size | minus: 5 %}
      {% if remaining > 0 %}
- *... and {{ remaining }} more general posts*
      {% endif %}

    {% endif %}
---
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
