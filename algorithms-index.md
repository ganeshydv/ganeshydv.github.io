---
layout: page
title: "Algorithms & Data Structures"
permalink: /algorithms/
---

# 🧮 Algorithms & Data Structures

Computer science fundamentals, coding patterns, and problem-solving techniques.

## 📖 All DSA Articles

{% assign dsa_docs = site.dsa | sort: 'title' %}
{% for doc in dsa_docs %}
### [{{ doc.title }}]({{ doc.url | relative_url }})
{% if doc.subcategory %}_{{ doc.subcategory }}_{% endif %}
{% if doc.excerpt %}{{ doc.excerpt | strip_html | truncatewords: 20 }}{% endif %}

---
{% endfor %}

## 🏷️ Topics Covered

- **Sorting Algorithms**: Quick sort, Merge sort, Heap sort, Bubble sort
- **Data Structures**: Arrays, Linked lists, Trees, Graphs, Hash tables
- **Algorithm Patterns**: Two pointers, Sliding window, Dynamic programming
- **Problem Solving**: Coding interview preparation, LeetCode patterns
- **Analysis**: Time complexity, Space complexity, Big O notation
- **Practice Tips**: Study strategies, Implementation techniques

[← Back to Collections](/collections/)
