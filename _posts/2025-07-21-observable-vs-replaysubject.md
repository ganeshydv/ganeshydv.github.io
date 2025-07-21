---
layout: post
title: "Observable vs ReplaySubject"
date: 2025-07-21
categories: [frontend, angular]
tags: [typescript]
author: "GGurkhude"
excerpt: "Learning notes on observable vs replaysubject"
original_path: "React_Angular/Angular/Angular_4_Observable_ReplySubject.md"
---

## Observable vs ReplaySubject

### Observable:

- Emits values as they occur.
- New subscribers only receive values emitted after they subscribe.
- Does not store any emitted values.

### ReplaySubject:

- Stores a specified number of past values (or all values until completion if not specified).
- New subscribers receive these stored (buffered) values immediately upon subscription.
- Also emits new values to all subscribers.


### Observable Example: 
```typescript
import { Observable } from 'rxjs';

// Create an Observable
const observable = new Observable<number>(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  setTimeout(() => subscriber.next(3), 1000);
  setTimeout(() => subscriber.complete(), 1500);
});

// Subscriber 1
observable.subscribe({
  next: value => console.log('Subscriber 1:', value),
  complete: () => console.log('Subscriber 1: Complete')
});

// Wait for 500ms before subscribing Subscriber 2
setTimeout(() => {
  observable.subscribe({
    next: value => console.log('Subscriber 2:', value),
    complete: () => console.log('Subscriber 2: Complete')
  });
}, 500);

```

### Output:

- Subscriber 1: Receives 1, 2, and 3.
- Subscriber 2: Subscribes after 500ms, so it only receives 3.

```yaml
Subscriber 1: 1
Subscriber 1: 2
Subscriber 2: 3
Subscriber 1: 3
Subscriber 1: Complete
Subscriber 2: Complete
```

### ReplySubject Example:

```typescript
import { ReplaySubject } from 'rxjs';

// Create a ReplaySubject with buffer size of 2
const replaySubject = new ReplaySubject<number>(2);

// Emit values
replaySubject.next(1);
replaySubject.next(2);
replaySubject.next(3);

// Subscriber 1
replaySubject.subscribe({
  next: value => console.log('Subscriber 1:', value),
  complete: () => console.log('Subscriber 1: Complete')
});

// Emit another value
replaySubject.next(4);

// Subscriber 2
replaySubject.subscribe({
  next: value => console.log('Subscriber 2:', value),
  complete: () => console.log('Subscriber 2: Complete')
});

// Complete the subject
replaySubject.complete();

```
### Output :

- Subscriber 1: Receives buffered values 2 and 3, then receives 4.
- Subscriber 2: Subscribes after 4 is emitted and immediately receives buffered values 3 and 4

```yaml
Subscriber 1: 2
Subscriber 1: 3
Subscriber 1: 4
Subscriber 2: 3
Subscriber 2: 4
Subscriber 1: Complete
Subscriber 2: Complete

```