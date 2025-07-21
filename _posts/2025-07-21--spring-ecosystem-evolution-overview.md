---
layout: post
title: "✅ Spring Ecosystem Evolution Overview"
date: 2025-07-21
categories: [java, springboot]
tags: [java, database, networking]
author: "GGurkhude"
excerpt: "Learning notes on ✅ spring ecosystem evolution overview"
original_path: "JAVA/SpringBoot/0_before_spring_boot.md"
---


## ✅ **Spring Ecosystem Evolution Overview**

| Term             | Description                                                                 | Key Features / Responsibility                                                                                 | Use Case Example                                       |
|------------------|-----------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|
| **Before Spring** | Java EE (J2EE) era using Servlets, JSPs, EJBs, JDBC manually                | Complex configurations, tightly coupled, heavy XML, boilerplate code                                          | JDBC connection with raw `DriverManager`              |
| **Spring (Core)**| Lightweight framework for dependency injection (DI) and inversion of control (IoC) | Bean management using ApplicationContext/BeanFactory, POJO-based development                                 | Configuring services using `@Component`, `@Autowired` |
| **Spring MVC**   | Web framework part of Spring for building web applications                   | Uses DispatcherServlet, Controllers, REST APIs, request mapping, model-view-controller structure             | `@Controller`, `@GetMapping`, form handling            |
| **Spring Framework**| Umbrella term for all Spring modules (Core, MVC, AOP, JDBC, Security, etc.) | Full-stack framework with loosely coupled modules                                                             | Web + data + security integration                     |
| **Spring Boot**  | Convention-over-configuration framework built on top of Spring Framework     | Auto-configuration, embedded servers (Tomcat), starters, production-ready apps fast                          | `@SpringBootApplication`, no `web.xml` needed         |

## ✅ **Difference: JPA vs Servlet**

| Concept | Stands For                    | Responsibility / Purpose                             | Operates On        | Example Use Case                                   |
|---------|-------------------------------|-------------------------------------------------------|--------------------|----------------------------------------------------|
| **JPA** | Java Persistence API          | ORM (Object Relational Mapping); handles DB operations | Entity Classes     | Save, update, delete, query records from database  |
| **Servlet** | Java Servlet API             | Handles low-level HTTP requests & responses            | HTTP Layer (Web)   | Handle form submissions, return HTML/JSON          |


-----

# Servlet Structure:
1. web.xml for mapping api's
2. need to create servlet class (hanlder/controller) and map in web.xml
```
Req -> Servlet Container (Req Handler) web.xml [collection of servlet]--> App
```
------
# Spring Framework (Spring MVC):
### 1. No web.xml
### 2. Mapping is handled by Spring framework(i.e. spring MVC) using Dispatcher Servlet
  - `Need to deploy app on tomact server - servlet container`
### 3. Dependencies:
```xml
<dependencies>
    <dependency>
       <groupId> org.springframework</groupId>
       <artifactId>spring-webmvc</artifactId>
       <version>6.1.4</version>
    </dependency>
    <dependency>
       <groupId> javax.servlet</groupId>
       <artifactId>servlet-api</artifactId>
       <version>2.t</version>
    </dependency>
</dependencies>
```
---
### 4. Structure:


```
                                                           --> 1. Choose Controller --> Uses HandlerMapping
 Req --> Servlet Container (Tomcat) --> DispatcherServlet  --> 2. Create Instance   --> IOC [Creates instance as well as Dependency]
                                                           --> 3. Invoke Controller --> Respctive API get Invoked
             [APP Deployed here]
```


### 5. config class:
   - `@Configuration`
   - `@EnableWebMvc`
   - `@ComponentScan(basePackages="pkg")` // to tell speing mvc to start scan for registering component

### 6. Need to create Dispatcher Servlet class: first controller
   - This is where each request comes first
   - Need to regiseter config class here as config class know all API/controllers
   - This class extends `AbstractAnnotationConfigDispatcherServletInitializer` and overrides class methods :
      - `getRootConfigClasses()`
      - `getServletConfigClasses()`: returns config.class - as this class has all controllers registered
      - `getServletMapping()` : returns String initial path like "/"

------



# Spring boot: spring MVC+extra
### 1. No need to add seperate dependency: Makes dependency management easy
   - Spring MVC: need to add dependency seperatly - problem: may some version become incompatable in future
   - No need of Version : loads compatable dependency automatically

```xml
<parent>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-parent</artifactId>
	<version>3.4.5</version>
	<relativePath/> <!-- lookup parent from repository -->
</parent>
<dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <aritfactId>spring-boot-starter-web</aritfactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <aritfactId>spring-boot-starter-test</aritfactId>
    </dependency>
</dependencies>
```


### 2. Autoconfig:
 -` @SpringBootApplication`:  No Need to for Dispatcher Servlet config, `@Configuration`, `@ComponentScan`, `@EnableWebMvc`

### 3. Embedded Server:
 - No need to create APP WAR and deploy on Tomcat as it was needed in Servlet and Spring MVC.
