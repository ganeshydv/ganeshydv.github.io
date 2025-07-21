---
layout: post
title: "Spring Boot Exception Handling"
date: 2025-07-21
categories: [java, springboot]
tags: [java]
author: "GGurkhude"
excerpt: "Learning notes on spring boot exception handling"
original_path: "JAVA/SpringBoot/3_spring_boot_exception_handling_.md"
---


## Spring Boot Exception Handling
### @ControllerAdvice: Class Level
### @ExceptionHandler: Method Level

### Example

```java
// Custom Exection
class UserNotFoundException extends RuntimeExcetion{
    UserNotFoundException(String message){
        super(message);
    }
}

//Global Exception Handler
@ControllerAdvice
class GlobalExceptionHanlder{
   @ExceptionHandler(UserNotFoundException.class)
   public ResponseEntity<?> HandleUserException(UserNotFoundException ex){
      return ResponsEntity.status(500).body(Map.of("error",ex.getMessage()));
   }
}
```