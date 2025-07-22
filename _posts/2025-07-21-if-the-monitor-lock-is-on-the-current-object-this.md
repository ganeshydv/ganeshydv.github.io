---
layout: post
title: "If the monitor lock is on the current object (this), then why doesn't it block access to all other methods of that object?"
date: 2025-07-21
categories: [java, adv-java]
tags: [java, concurrency]
author: "GGurkhude"
excerpt: "Learning notes on monitor locks and method access blocking in Java multithreading"
original_path: "JAVA/Adv_Java/3.2.1_multithreading_monitor_lock_.md"
---

## 🧠 "If the monitor lock is on the current object (this), then why doesn't it block access to all other methods of that object?"

### 🔐 Monitor Lock: Only Affects synchronized Code
- The monitor lock only protects code that is inside synchronized blocks or methods.
It does not block access to non-synchronized methods — even though the lock is on the same object.
### 🔁 So Why Doesn't Lock Block the Whole Object?
- Because the monitor is not a gate to the object itself, it’s just a gate to synchronized code sections.

### 🔑 Rule:
- JVM enforces monitor lock only when entering synchronized methods or blocks.
- If a method is not marked as synchronized, the thread does not check or care about the monitor lock on the object.

## 🧠 What If You Want to Prevent Access to All Methods?
If you want to block all access to any part of the object while a thread holds a lock, you must:
- Either synchronize all methods
- Or write a wrapper that checks lock status manually (less common)
- Or use ReentrantLock with tryLock and flags


## Example: lock and wait 
### wait()
- put thread on wait
- releases lock (releases monitor lock on sync block/code)
### notify()
- to resume waiting thread
### Check Item Available
```java
public class MonitorLockEx {
    public static void main(String[] args) throws InterruptedException {
        Product product = new Product();
        Thread producerThread =new Thread(()->{
            try {
                Thread.sleep(5000);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
            product.addItem();
        });
        Thread consumerThread = new Thread(()->{
            product.consumeItem();
        });
        producerThread.start();
        consumerThread.start();

    }
}
class Product{
    private boolean isAvailable;

    public synchronized void addItem(){
        System.out.println("Item added");
        isAvailable= true;
        notifyAll();// Notify all waiting threads that an item is available
    }

    public synchronized  void consumeItem() {
        while(!isAvailable){// if is not used as mentioned in oracle docs if block can be some time create a problem
            System.out.println("Waiting for item to be available...");
            try {
                wait();// Wait until notified that an item is available
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
        System.out.println("Item consumed");
    }
}
```
## Consumer Producer Example
- Producer Thread: Adds user
- Consumer Thread: Removes User
```java
public class MonitorLockEx2 {
    public static void main(String[] args) {
        UserManagement userManagement = new UserManagement(5);

        // Thread to add users every 2 seconds for 5 times
        Thread producerThread = new Thread(()->{
            for(int i=1;i<=10;i++){
                User user =new User(i,"user_"+i);//{id:int,name:String}
                userManagement.userAdd(user);
//                try {
//                    Thread.sleep(2000); // Sleep for 2 seconds before adding the next user
//                } catch (InterruptedException e) {
//                    Thread.currentThread().interrupt(); // Restore interrupted status
//                    throw new RuntimeException(e);
//                }
            }
            userManagement.setUserAddingComplete();
        });

        //consumer thread to remove users
        Thread consumerThread = new Thread(()->{
            while (true) {
                User user = userManagement.userRemove();
                if (user == null) {
                    break; // Exit if no more users to remove and addition is complete
                }
                System.out.println("Removed user: " + user.getName());
                try {
                    Thread.sleep(1000); // Sleep for 1 second before removing the next user
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt(); // Restore interrupted status
                    throw new RuntimeException(e);
                }
            }
        });

        // Start both threads
        producerThread.start();
        consumerThread.start();

        System.out.println("Producer and Consumer threads started.");
//        try {
//            producerThread.join();
//            consumerThread.join();
//        } catch (InterruptedException e) {
//            Thread.currentThread().interrupt();
//            throw new RuntimeException(e);
//        }

    }
}

class UserManagement {
    Queue<User> userList = new LinkedList<>();
    int bufferSize;
    private boolean isUserAddingComplete = false; // Flag to indicate if user addition is complete
    public UserManagement(int bufferSize){
        this.bufferSize=bufferSize;
    }

    public synchronized void userAdd(User user)  {
        while (userList.size()==bufferSize){// not used if as mentioned in oracle docs if block can be some time create a problem
            System.out.println("user buffer is full");
            try {
                wait();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
        userList.add(user);
        System.out.println("User added: " + user.getName());
        notifyAll(); // Notify any waiting threads that a new user has been added
    }

    public synchronized User userRemove() {
        // suggest:return after userAdding is complete and no user is available
//        if (isUserAddingComplete && userList.isEmpty()) {
//            System.out.println("No more users to remove, and user addition is complete.");
//            return null; // No users to remove and addition is complete
//        }
        // Wait until there is at least one user to remove
        while (userList.isEmpty()) {
            if (isUserAddingComplete) {
                System.out.println("No more users to remove, and user addition is complete.");
                return null;
            }
            try {
                System.out.println("Waiting for users to be added...");
                wait();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new RuntimeException(e);
            }
        }
        User user = userList.poll();
        System.out.println("User removed: " + (user != null ? user.getName() : "null"));
        notifyAll();//for adding as it will be in waiting state for adding if buffer is full;
        return user;
    }

    public synchronized void setUserAddingComplete() {
        isUserAddingComplete = true;
        notifyAll(); // Notify any waiting threads that user addition is complete
    }

}
```