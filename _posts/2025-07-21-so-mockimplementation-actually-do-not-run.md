---
layout: post
title: "so mockImplementation actually do not run original method but directly return value we provide in that arrow function"
date: 2025-07-21
categories: [nodejs, unit-test--md]
tags: [typescript]
author: "GGurkhude"
excerpt: "Learning notes on so mockimplementation actually do not run original method but directly return value we provide in that arrow function"
original_path: "NestJs/unit_test..md"
---

## so mockImplementation actually do not run original method but directly return value we provide in that arrow function

- Yes, that's correct. When you use jest.spyOn with mockImplementation or 
mockResolvedValue (or similar methods), you are replacing the original 
implementation of the method with your custom implementation, and the 
original method is not executed.

### Here are a few scenarios:

- ### **mockImplementation**:

  - mockImplementation allows you to provide a custom function as the 
implementation of the mocked method.
  - The original method is completely replaced by your custom implementation.
The provided function is called when the mocked method is invoked.
```typescript
jest.spyOn(service, 'fetchData').mockImplementation(() => ({ count: 42, status: 200 }));
```
- ### **mockResolvedValue:**

  - mockResolvedValue is a specific utility method for promises.
It sets up the mocked method to return a resolved promise with the specified value.
  - The original method is not executed, and the mocked value is immediately returned.
```typescript
jest.spyOn(service, 'fetchData').mockResolvedValue({ count: 42, status: 200 });
```

- ### mockReturnValue:

  - mockReturnValue is similar to mockResolvedValue but is used for non-promise functions.
  - It sets up the mocked method to return the specified value.
The original method is not executed.
```typescript
jest.spyOn(service, 'fetchData').mockReturnValue({ count: 42, status: 200 });
```
In all these cases, the original method is bypassed, and the specified 
implementation or value is used instead. This is intentional and allows you to 
control the behavior of the method during testing without executing the actual implementation.

---

## How can mock objects used inside object

## How can mock Axios request

## How can mock DB
```ts
const module = await Test.createTestingModule({
  providers:[
    {
      provide:getRepositoryToken(TableName,'db_name'),
      useValue:{
        findOne:()=>{return 1},
      }
    }
  ]
}).compile();
```

## How SpyOn is implemented

## How can mock private Properties/Methods of Objects 


```ts
const module = await Test.createTestingModule({
  providers:[
    {
      provide:ExampleService,
      useValue: MockClass
    }
  ]
}).compile()
//when reading
const service = module.get<ExampleService>(ExampleService);
service['id']=1;
```
