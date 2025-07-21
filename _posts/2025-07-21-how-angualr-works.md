---
layout: post
title: "How Angualr works?"
date: 2025-07-21
categories: [frontend, angular]
tags: [frontend]
author: "GGurkhude"
excerpt: "Learning notes on how angualr works?"
original_path: "React_Angular/Angular/Angular_1_basic.md"
---

## How Angualr works?

### `Only decoratores are used by Angualr to decide to include any module/component/service in its' DI and even if something is included based on decorator after build it removes unused  module/component/service from it's DI`

## How Angualr includes Module, Component, Service in it's DI?

- ###  Angular uses the metadata provided by decorators to determine how to handle services and other injectable dependencies. When you use the @Injectable decorator with the providedIn property, Angular knows to include the service in the dependency injection system and make it available for injection.

### Here's a summary of how Angular handles this:

- ### Decorator Metadata: 
    - The `@Injectable` decorator with the providedIn property tells Angular that the service should be provided in the specified injector (e.g., root for the root injector).

- ### Static Analysis: 
    - During the build process, Angular performs static analysis on the code to read the metadata provided by decorators. This helps Angular understand the dependencies and how they should be provided.

- ### Tree Shaking: 
    - Angular's build tools (like the Angular CLI, which uses Webpack) perform tree shaking to remove unused code from the final bundle. If a service is not used anywhere in the application, it will be removed from the final bundle.

- ### Dependency Injection: 
    - Based on the metadata, Angular registers the service with the appropriate injector. If providedIn: 'root' is used, the service is registered with the root injector and is available application-wide as a singleton.

