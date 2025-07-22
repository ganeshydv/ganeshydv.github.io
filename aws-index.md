---
layout: page
title: "AWS & Cloud Services"
permalink: /aws/
---

# ☁️ AWS & Cloud Services

Everything you need to know about AWS services, serverless architecture, and cloud deployment.

## 📖 All AWS Articles

{% assign aws_docs = site.aws | sort: 'title' %}
{% for doc in aws_docs %}
### [{{ doc.title }}]({{ doc.url | relative_url }})
{% if doc.subcategory %}_{{ doc.subcategory }}_{% endif %}
{% if doc.excerpt %}{{ doc.excerpt | strip_html | truncatewords: 20 }}{% endif %}

---
{% endfor %}

## 🏷️ Topics Covered

- **Compute**: Lambda, ECS, EC2, Auto Scaling
- **Security**: IAM, Roles, Policies, MFA, Security Groups
- **Networking**: VPC, Subnets, Load Balancers, Target Groups
- **Databases**: RDS, Connection management, Best practices
- **Serverless**: Lambda functions, API Gateway, Step Functions
- **DevOps**: CI/CD, CodePipeline, CloudWatch, Deployment strategies
- **Integration**: SQS, Event mapping, Messaging patterns

[← Back to Collections](/collections/)
