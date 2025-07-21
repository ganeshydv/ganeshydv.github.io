---
layout: post
title: "Hibernate (via JPA annotations & used internally by Spring Data JPA) helps manage these automatically by:"
date: 2025-07-21
categories: [java, springboot]
tags: [java, database]
author: "GGurkhude"
excerpt: "Learning notes on hibernate (via jpa annotations & used internally by spring data jpa) helps manage these automatically by:"
original_path: "JAVA/SpringBoot/5.2_spring_boot_hql_relations.md"
---

## Hibernate (via JPA annotations & used internally by Spring Data JPA) helps manage these automatically by:
- Mapping foreign keys
- Handling cascading operations
- Managing lazy vs eager loading
- Avoiding infinite loops during serialization (with help from Jackson or DTOs)

## OneToMany + ManyToOne
### 📘 User Entity (One user has many orders)
```java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // One-to-many: mapped by "user" in Order
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Order> orders = new ArrayList<>();
}
```
### 📦 Order Entity (Each order belongs to one user)
```java
@Entity
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")  // FK to products table
    private Product product;

    // Many orders → one user
    @ManyToOne
    @JoinColumn(name = "user_id") // FK in orders table
    private User user;
}
```

### Product
```java
@Entity
public class Product {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @OneToMany(mappedBy = "product")
    private List<Order> orders;
}
```

### 🧠 Hibernate Will Generate:
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

CREATE TABLE orders (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  quantity INT,
  user_id BIGINT,
  product_id BIGINT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

```
## Insert Example
```java
User user = new User("Jack");
Product product = new Product("iPhone");

Order order = new Order();
order.setUser(user);
order.setProduct(product);
order.setQuantity(2);

user.setOrders(List.of(order));
product.setOrders(List.of(order));

userRepo.save(user); // saves all due to cascading
productRepo.save(product); // optional if not cascaded
```

## ⚙️ Lazy vs Eager Loading

| Fetch Type                         | Behavior                                     |
| ---------------------------------- | -------------------------------------------- |
| `LAZY` (default for `@OneToMany`)  | Doesn’t load related entities until accessed |
| `EAGER` (default for `@ManyToOne`) | Loads related entity immediately             |

```java
@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
private List<Order> orders;
```