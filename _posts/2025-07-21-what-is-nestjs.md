---
layout: post
title: "What is NestJS?"
date: 2025-07-21
categories: [nodejs, 0-nestjs--md]
tags: [java, javascript, typescript, frontend, networking]
author: "GGurkhude"
excerpt: "Learning notes on what is nestjs?"
original_path: "NestJs/0_nestJs_.md"
---

## What is NestJS?
NestJS is a progressive Node.js framework for building efficient, scalable server-side applications. It uses:

- TypeScript (or JavaScript),
- Is heavily inspired by Angular (in terms of structure & decorators),
- Built on top of `Express.js` (or optionally Fastify).

It emphasizes modularity, testability, and maintainability, and is great for microservices, REST APIs, or GraphQL backends.
## How NestJs works?

- NestJs looks for `main.ts` file for starting application
```ts
// main.ts 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```
### 🔍 What is NestFactory.create() doing?
- It `creates` a NestJS `application` instance.
- `Loads` the `dependency injection` container.
- `Scans` the `AppModule` for all controllers, providers, and sub-modules.
- Sets up `HTTP server` internally (default is `Express.js`).
## Core Concepts
### 1. Module (.module.ts)
- Think of it as a "container" for a cohesive set of features.
- Decorated with @Module, it bundles services, controllers, and providers.
- Annotation: `@Module({})`
```ts
@Module({
    imports:[], // import other modules
    controllers:[AppController],
    providers:[AppService],
    exports:[]  //service to be exported can be used outside office
})
export class AppModule {}
```
### 2. Controller (.controller.ts)
- Handles HTTP requests and delegates work to services.
- Annotation: `@Controller()`
```ts
@Controller('path')
export class UserController{
    constructor(private readonly userService:UserService){}

    @Get("path")
    getAllUsers(){
        return this.userService.getAllUsers();
    }
}
```
### 3. Service (.service.ts)
- for business logic.
- Annotation: `@Injectable()`
```ts
@Injectable()
export class UsersService {
  private users = [{ id: 1, name: 'Jack Sparrow' }];

  getAllUsers() {
    return this.users;
  }
}
```
### 4. DTO (Data Transfer Object)
- Used for validation and typing of request data.
- Works with `class-validator` and `class-transformer`.
```ts
export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
```