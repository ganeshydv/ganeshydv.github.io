---
layout: post
title: "1. Single Responsibility Principle"
date: 2025-07-21
categories: [system-design, solid--md]
tags: [java, database]
author: "GGurkhude"
excerpt: "Learning notes on 1. single responsibility principle"
original_path: "3_SystemDesign/SOLID_.md"
---

## 1. Single Responsibility Principle
- **Definition**: A class should have one, and only one, reason to change. In other words, a class should have only one responsibility or job.

- **Key Idea**:
   - Each class should focus on doing one thing well, which makes the class more focused and easier to maintain. If a class has multiple responsibilities, changes in one responsibility could affect others, leading to a fragile design.

- **Example**:
 Consider a class that handles both user authentication and email notifications. If the email logic changes, you might need to modify this class, even though it’s also responsible for authentication. This violates the SRP. The solution is to split these into two classes: one for authentication and another for sending emails.
 ```java
 // Violation of SRP: Handles both user login and sending email
class UserService {
    login(user: User) {
        // Login logic
    }
    
    sendWelcomeEmail(user: User) {
        // Email logic
    }
}

// Refactor to follow SRP
class AuthenticationService {
    login(user: User) {
        // Login logic
    }
}

class EmailService {
    sendWelcomeEmail(user: User) {
        // Email logic
    }
}
```
## 2. O – Open/Closed Principle (OCP)

- **Definition**: Software entities (classes, modules, functions) should be open for extension but closed for modification.

- **Key Idea**:
You should be able to extend a class's behavior without modifying its existing code. This helps avoid introducing bugs in already working code. The common solution is to use polymorphism or interfaces to make code extensible.

- **Example**:
Imagine you have a class that calculates area for various shapes, but every time you add a new shape, you have to modify the class. This violates the OCP. Instead, you can define an interface that each shape implements, allowing you to extend behavior by adding new shapes without modifying existing code.
```java
// Violation of OCP: Modification is required to add new shapes
class AreaCalculator {
    calculateArea(shape: any) {
        if (shape.type === 'circle') {
            return Math.PI * shape.radius ** 2;
        } else if (shape.type === 'square') {
            return shape.side * shape.side;
        }
    }
}

// Refactor to follow OCP
interface Shape {
    calculateArea(): number;
}

class Circle implements Shape {
    constructor(public radius: number) {}
    calculateArea() {
        return Math.PI * this.radius ** 2;
    }
}

class Square implements Shape {
    constructor(public side: number) {}
    calculateArea() {
        return this.side * this.side;
    }
}

class AreaCalculator {
    calculateArea(shape: Shape) {
        return shape.calculateArea();
    }
}
```
## 3. L – Liskov Substitution Principle (LSP)

- **Definition**: Subtypes must be substitutable for their base types without altering the correctness of the program. In simpler terms, derived classes should extend base classes without changing their behavior in unexpected ways.

- **Key Idea**:
When you replace an object of a base class with an object of a derived class, the program should still behave correctly. Violating LSP leads to inheritance that does not work well with polymorphism.

- **Example**:
Imagine you have a class Bird with a method fly(), and you create a subclass Penguin. Penguins can’t fly, so adding a fly() method for Penguin would violate LSP because Penguin doesn’t behave like a typical bird. Instead, you could refactor by separating flying birds from non-flying birds.
```java
// Violation of LSP: Penguin cannot fly
class Bird {
    fly() {
        console.log("Flying");
    }
}

class Penguin extends Bird {
    fly() {
        throw new Error("Penguins can't fly");
    }
}

// Refactor to follow LSP
interface Bird {
    makeSound(): void;
}

interface FlyingBird extends Bird {
    fly(): void;
}

class Sparrow implements FlyingBird {
    fly() {
        console.log("Flying");
    }
    makeSound() {
        console.log("Chirp");
    }
}

class Penguin implements Bird {
    makeSound() {
        console.log("Honk");
    }
}
```
## 4. I – Interface Segregation Principle (ISP)
- **Definition**: Clients should not be forced to depend on methods they do not use. In other words, create small, specific interfaces rather than a large, general-purpose one.

- **Key Idea**:
Instead of creating one large interface that tries to cover all possible behaviors, split it into smaller, more focused interfaces. This allows classes to only implement what they actually need, reducing the chance of implementing unnecessary methods.

- **Example**:
If you have a Machine interface that includes methods like print(), scan(), and fax(), a class that only implements a printer shouldn't have to implement methods like scan() or fax(). This would violate ISP.

```java
// Violation of ISP: Printer has to implement unused methods
interface Machine {
    print(): void;
    scan(): void;
    fax(): void;
}

class Printer implements Machine {
    print() {
        console.log("Printing...");
    }
    scan() {
        // Not needed
    }
    fax() {
        // Not needed
    }
}

// Refactor to follow ISP
interface Printer {
    print(): void;
}

interface Scanner {
    scan(): void;
}

interface FaxMachine {
    fax(): void;
}

class BasicPrinter implements Printer {
    print() {
        console.log("Printing...");
    }
}
```
## 5. D – Dependency Inversion Principle (DIP)
- **Definition**: High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces). Additionally, abstractions should not depend on details; details should depend on abstractions.

- **Key Idea**:
Instead of having higher-level components depend directly on low-level components (which can make the code brittle and hard to change), both should depend on abstractions (like interfaces or abstract classes). This decouples components and makes it easier to swap out implementations.

- **Example**:
If a UserService directly depends on a MySQLDatabase, any change in the database layer will require changes in the UserService. By introducing an abstraction, such as DatabaseInterface, we can decouple the service from the concrete database implementation.
```java
// Violation of DIP: High-level module directly depends on low-level module
class MySQLDatabase {
    getData() {
        return "data from MySQL";
    }
}

class UserService {
    db: MySQLDatabase;
    
    constructor() {
        this.db = new MySQLDatabase();
    }
    
    getUserData() {
        return this.db.getData();
    }
}

// Refactor to follow DIP
interface Database {
    getData(): string;
}

class MySQLDatabase implements Database {
    getData() {
        return "data from MySQL";
    }
}

class MongoDBDatabase implements Database {
    getData() {
        return "data from MongoDB";
    }
}

class UserService {
    db: Database;
    
    constructor(db: Database) {
        this.db = db;
    }
    
    getUserData() {
        return this.db.getData();
    }
}
```