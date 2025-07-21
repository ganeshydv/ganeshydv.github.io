---
layout: post
title: "Thread Creation"
date: 2025-07-21
categories: [java, adv-java]
tags: [aws, java, concurrency]
author: "GGurkhude"
excerpt: "Learning notes on thread creation"
original_path: "JAVA/Adv_Java/3.1_Multithreading_thread_creation_.md"
---

## Thread Creation
2 ways:
1. Implement `Runnable` interface
2. Extend `Thread` class

## Structure:
```java
interface Runnable{
    public void run()
}

class Thread implements Runnable{
    Runnable target;
    public Thread(Runnable target){
        this.target=target;
    }

    public void run(){
        if(target!=null){
            this.target.run();
        }
    }
    public void init(){

    }
    public void start(){

    }
    public void sleep(){

    }
    public void stop(){

    }
    public void interrupt(){

    }
   
}
```
- Runnable --implemented by--> Thread
### Runnable Interface
- It's functional interface - can pass lambda function
- for custom implementation
- in the end Thread class will run 
```java
class Drive implements Runnable{
    public void run(){
        sout("driving");
    }
}

class Main{
    psvm(String[] args){
        Drive drive=new Drive();
        Thread td=new Thread(drive); // thread takes runnable
        td.start();// this will start new thread
        td.run();// this will call thread Run method which internally call drive.run();
    }
}
```
### Thread Class
```java
class MultiThreadDemo extends Thread{
    @Override
    public void run(){
        ///
    }
}

class Main{
    psvm(String[] args){
        MultiThreadDemo demo= new MultiThreadDemo();
        demo.start(); //creates new Thread
        demo.run();
        demo.stop();
    }
}
```
## Thread Lifecycle:
- New → start() → Runnable (waiting for CPU)
- Runnable ↔ run()/yield() ↔ Running (got CPU time)
- Running → run() → Blocked / Waiting / Timed waiting
- Any of these → stop() → Terminated
### `New` --Start()--> { `Runnable` (waiting for CPU time - then context switching) <--run()--> <--yield()-->`Running`} (got cpu time) --Run()--> [`Blocked` (due to IO/lock) || `Waiting` (wait()/notify())|| `Timed waiting`(sleep() or join())] --stop()--> `Terminated`
```text
       ┌───────┐                                  
       │  New  │         ──────stop()────────▶     Terminated
       └───┬───┘                                
        start()                                                                   
           │                                     
           ▼                                     
┌──────────────────────────────┐                  
│ Runnable (waiting for CPU)   │──────────────▶    Terminated
└───┬─────────────┬────────────┘      stop()             
    │             │                                
    │ run()       │ yield()                              
    ▼             ▲                              
┌──────────────────────────────┐                              
│ Running (got CPU time)       │──────────────▶     Terminated                             
└───┬───────┬───────────┬──────┘      stop()                              
    │       ▼           │                              
    │     wait()   sleep()/join()                              
    │       │           │                              
    │    notify()       │                              
    ▼       ▲           ▼                              
┌───────────┴─────────────────┐                              
│ Blocked │ Waiting  │ Timed  │──────────────▶      Terminated                     
│ (IO/    │ (wait/   │ waiting│      stop()                              
│ lock)   │ notify())│        │                              
└─────────┴──────────┴────────┘                              
```
