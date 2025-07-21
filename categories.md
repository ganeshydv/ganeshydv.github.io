---
layout: page
title: Categories
permalink: /categories/
---

# Browse by Category

{% assign categories = site.posts | map: 'categories' | join: ',' | split: ',' | uniq | sort %}

{% for category in categories %}
  {% if category != "" %}
## {{ category | capitalize | replace: '-', ' ' }}
    {% assign posts = site.posts | where: 'categories', category %}
    {% for post in posts %}
- [{{ post.title }}]({{ post.url }}) - {{ post.date | date: "%B %d, %Y" }}
    {% endfor %}
  {% endif %}
{% endfor %}
