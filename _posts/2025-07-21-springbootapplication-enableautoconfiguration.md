---
layout: post
title: "@SpringBootApplication = @EnableAutoConfiguration + @ComponentScan + @Configuration"
date: 2025-07-21
categories: [java, springboot]
tags: [java]
author: "GGurkhude"
excerpt: "Learning notes on @springbootapplication = @enableautoconfiguration + @componentscan + @configuration"
original_path: "JAVA/SpringBoot/1.1_spring_boot_@SpringBootApplication_.md"
---

# @SpringBootApplication = @EnableAutoConfiguration + @ComponentScan + @Configuration

## @EnableAutoConfiguration
- Scans package based on class path and registers BEANs in Application Context
- Spring Boot considers the package of the class declaring
the `@EnableAutoConfiguration` as the default package. Therefore, if we apply this
annotation in the root package of the application, every sub-packages & classes will
be scanned. As a result, we won’t need to explicitly declare the package names
using `@ComponentScan`.