
### 1. extends :

ex : T extends X -> means T is subset of X
-in TypeScript, when you see X extends T, it means that X must be a subtype of T.
 In other words, X should be assignable to T. 
 This is often used in generic constraints to ensure that a type parameter meets certain criteria.
```typescript
function exampleFunction<T extends string>(arg: T): T {
    return arg;
}
```

### 2. keyof

- return key of objects

```typescript
type Person = {
    name: string;
    age: number;
};

type PersonKeys = keyof Person; // "name" | "age"

```