---
layout: post
title: "@Valid: for validations"
date: 2025-07-21
categories: [java, springboot]
tags: [java]
author: "GGurkhude"
excerpt: "Learning notes on @valid: for validations"
original_path: "JAVA/SpringBoot/2.1_spring_boot_request_validation_.md"
---

# @Valid: for validations
### 1. Dependecy:
```yml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```
## 2. Annotate in DTO with ValidationConstaints
```java
import jakarta.validation.constraints.NotBlank;

public class CreateEmployeeRequest {

    @NotBlank(message = "Name is required")
    private String name;

    // getters and setters
}
```

## ✅ 3. Use @Valid in Controller
```java
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @PostMapping
    public String createEmployee(@RequestBody @Valid CreateEmployeeRequest request) {
        return "Employee created: " + request.getName();
    }
}
```
# DTO Validation Exception Handling:
## @ControllerAdvice:
```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidation(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(error -> error.getField() + ": " + error.getDefaultMessage())
            .toList();

        return ResponseEntity.badRequest().body(Map.of("errors", errors));
    }
}
```