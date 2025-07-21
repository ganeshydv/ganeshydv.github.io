## ✅ 1. Why ReentrantLock is more flexible for dependent writes (multi-object coordination)
### Real-life Problem: Multi-resource consistency
- Let’s say you’re doing something like this:
   - Transfer money from Account A to Account B
   - Or deduct stock from Warehouse X and add to Warehouse Y
- You must lock both A and B together for the operation to be consistent.

### With ReadWriteLock:
```java
a.getLock().writeLock().lock();
b.getLock().writeLock().lock(); // Potential deadlock if thread order differs
try {
   // update both objects
} finally {
   b.getLock().writeLock().unlock();
   a.getLock().writeLock().unlock();
}
```
>❌ No tryLock(), so you can't easily implement deadlock prevention (like checking lock availability before blocking).
### With ReentrantLock:
```java
if (a.lock.tryLock(1, TimeUnit.SECONDS)) {
    try {
        if (b.lock.tryLock(1, TimeUnit.SECONDS)) {
            try {
                // safe to transfer
            } finally {
                b.lock.unlock();
            }
        }
    } finally {
        a.lock.unlock();
    }
}
```
### ✅ ReentrantLock provides:
- Fine-grained coordination using tryLock() and timeouts
- Deadlock avoidance
- Better composition when multiple objects need to be locked together
## ✅ 2. Coordination Between Threads (with Conditions)
Let’s say one thread writes only when some condition is met (e.g., enough stock is present).
- With ReentrantLock:
```java
lock.lock();
try {
    while (stock < demand) {
        condition.await(); // equivalent to wait()
    }
    stock -= demand;
} finally {
    lock.unlock();
}
```
- Another thread signals:
```java
lock.lock();
try {
    stock += 100;
    condition.signalAll(); // equivalent to notifyAll()
} finally {
    lock.unlock();
}
```
### ✅ This kind of coordination between threads is not possible with ReadWriteLock, because:
- It doesn’t support Condition
- No await()/signal() methods
- So no wait-until-available mechanism

## ✅ 3. Write ordering, control, and fairness
### ReentrantLock allows:

- Fairness policy: create a "`fair`" lock where `threads acquire the lock in the order requested`
- Interruptible locks
- Explicit unlocking across different code paths
### This gives more flexibility in designing low-level synchronization strategies, for example:
- Implementing priority-based task execution
- Canceling threads waiting for a lock
- Ensuring timed lock attempts (to reduce contention)
> ReadWriteLock doesn’t give this control — it’s focused purely on isolated read-write separation.