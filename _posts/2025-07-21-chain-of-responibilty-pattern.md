---
layout: post
title: "Chain Of Responibilty Pattern"
date: 2025-07-21
categories: [system-design, lld-design-patterns]
tags: [java]
author: "GGurkhude"
excerpt: "Learning notes on chain of responibilty pattern"
original_path: "3_SystemDesign/LLD_Design_Patterns/3_ChainOfResponsibiltyPattern_logging.md"
---


## Chain Of Responibilty Pattern 

#### - *EX: Logger, ATM, Vending Machine, etc.*
#### - Working: Sender -- Req --> [RECV1, RECV2,REC3,...RECVn]
   - when Clients send req but don't know which receiver will full fill
   then each receiver will send that req to next receiver.
#### - EX 1 : ATM 
  - Lets say user wants to withdraw 2000 rs then 
  - 2000 req --> ATM [ 2000 Handler , 1000 Handler, 500 Handler] 
  - 1. In this if 2000 handler have 2000 then it will fulfuil else it will send that to 1000 handler
  - 2. if 1000 Rs Handler have 2000 then it will fulfil else it will
    send that to 500 handler
  - 3. if 500 handler is able to fulfil it will send 2000 else not enough money.

```java

//parent class must have child idetntification
// in this example child takes another object and child calls log of next one
class LogProcessor{
  public static int INFO=1;
  public static int DEBUG=2;
  public static int ERROR=3;
  LogProcessor nextLogProcessor;
  LogProcessor(Logprocessor nextLogProcessor){
    this.nextLogProcessor=nextLogProcessor;
  }

  public void log(int level,String msg){
    if(nextLogProcessor!=null){
      nextLogProcessor.log(level,msg);
    }
  }

}

class LogInfo extends LogProcessor{
  LogProcessor nextLogProcessor;
  LogInfo(LogProcessor nextLogProcessor){
    this.nextLogProcessor=nextLogProcessor;
  }

  public void log(int level,String msg){
    if(level== INFO){
      //do
      sout(msg);
    }else{
      this.nextLogProcesspor.log(level,msg);
    }
  }
}

class LogDebug extends LogProcessor{
  LogProcessor nextLogProcessor;
  LogDebug(LogProcessor nextLogProcessor){
    this.nextLogProcessor= nextLogProcessor;
  }

  public void log(int level,String msg){
    if(level == DEBUG){
      //do
      sout(msg);
    }else{
      this.nextLogProcesspor.log(level,msg);
    }
  }
}

class LogError extends LogProcessor{
  LogProcessor nextLogProcessor;
  LogError(LogProcessor nextLogProcessor){
    this.nextLogProcessor= nextLogProcessor;
  }

  public void log(int level,String msg){
    if(level == ERROR){
      //do
      sout(msg);
    }else{
      this.nextLogProcesspor.log(level,msg);
    }
  }
}

public static void main(){
  LogProcessor logger=new LogInfo(new LogDebug(new LogError(null)));

  logger.log(LogProcessor.ERROR,"this is error msg");
}

```
#### Exmple 2: In this Parent Takes Responsibility to Call next Objects Method

```java
//parent class must have child idetntification
class LogProcessor{
  public static int INFO=1;
  public static int DEBUG=2;
  public static int ERROR=3;
  LogProcessor nextLogProcessor;
  LogProcessor(Logprocessor nextLogProcessor){
    this.nextLogProcessor=nextLogProcessor;
  }

  public void log(int level,String msg){
    if(nextLogProcessor!=null){
      nextLogProcessor.log(level,msg);
    }
  }

}

class LogInfo extends LogProcessor{
  // LogProcessor nextLogProcessor;
  LogInfo(LogProcessor nextLogProcessor){
    // this.nextLogProcessor=nextLogProcessor;
    super(nextLogProcessor);
  }

  public void log(int level,String msg){
    if(level== INFO){
      //do
      sout(msg);
    }else{
      // this.nextLogProcesspor.log(level,msg);
      super.log(level,msg);
    }
  }
}

class LogDebug extends LogProcessor{
  // LogProcessor nextLogProcessor;
  LogDebug(LogProcessor nextLogProcessor){
    // this.nextLogProcessor= nextLogProcessor;
    super(nextLogProcessor);
  }

  public void log(int level,String msg){
    if(level == DEBUG){
      //do
      sout(msg);
    }else{
      // this.nextLogProcesspor.log(level,msg);
      super.log(level,msg);
    }
  }
}

class LogError extends LogProcessor{
  // LogProcessor nextLogProcessor;
  LogError(LogProcessor nextLogProcessor){
    // this.nextLogProcessor= nextLogProcessor;
    super(nextLogProcessor);
  }

  public void log(int level,String msg){
    if(level == ERROR){
      //do
      sout(msg);
    }else{
      // this.nextLogProcesspor.log(level,msg);
      super.log(level,msg);
    }
  }
}

public static void main(){
  LogProcessor logger=new LogInfo(new LogDebug(new LogError(null)));

  logger.log(LogProcessor.ERROR,"this is error msg");
}
```