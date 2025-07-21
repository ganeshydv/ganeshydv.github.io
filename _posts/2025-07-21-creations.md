---
layout: post
title: "Creations"
date: 2025-07-21
categories: [system-design, lld-design-patterns]
tags: [java]
author: "GGurkhude"
excerpt: "Learning notes on creations"
original_path: "3_SystemDesign/LLD_Design_Patterns/overview.md"
---


## Creations

### 1. Single Ton: create single object every time
### 2. Builder Pattern: First build properties then in end get object
- EX. want a customized car then use builder pattern because before asking for object need to create object properties first 
- This is like first create properties like ac, windshield, sunroof, etc. then get object
```java
class Vehicle{
    private boolean isRooftop;
    private int airBags;
    private boolean ac;
    private Vehicle(VehicleBuilder vb){
        this.isRooftop=vb.isRooftop;
        this.airBags=vb.airBags;
        this.ac=vb.ac;

    }
    public int getAirBags{
        return this.airBags;
    }
    public boolean isAc(){
        return this.ac;
    }
    public static class VehicleBuilder{
        private boolean isRooftop;
        private int airBags;
        private boolean ac;
        public VehicleBuilder setRoofTop(boolan b){
            this.isRooftop=b;
            retrun this;
        }
        public VehicleBuilder setAirBags(int b){
            this.airBags=b;
            return this;
        }
        public VehicleBuilder setAc(boolan b){
            this.ac=b;
            return this;
        }
        public Vehicle build(
            return new Vehicle(this);
        )
    }
}
class MainClass{
    psvm(String[] args){
        Vehicle.VehicleBuilder vehcileBuilder = new Vehicle.VehicleBuilder();
        Vehicle v= vehcileBuilder.setRoofTop(True).setAirBags(4).setAc(True).build();
    }
}

```

### 2. Factory Pattern: give asked objects
- This give specific object 
```java
class Car{
   
}
claas Tata extends car{

}
class Ford extends Car{

}

class Factory{
    public Car getObject(String carType){
        if(carType.equals("tata")){
            return new Tata();
        }else if(carType.equals("ford")){
            return new Ford();
        }
    }
}
```

### Abstrach Factory: Each Type have own factory class which gives Object of that Type
- if want to decide which type of vehicle like tata suv use strategy pattern why because it can create differnet objects in run time
```java

interface Vehicle{
    public void start();
    public void stop();
}

class Tata implements Vehicle{
    public void start(){

    }
    public void stop(){

    }
}
class Ford implements Vehicle{
    public void start(){

    }
    public void stop(){

    }
}

interface AbstractFactory{
    public Vehicle getVehicle();
}

class TataFactory implements AbstractFactory{
    public Vehicle getVehicle(){
        return new Tata();
    }
}
class FOrdFactory implements AbstractFactory{
    public Vehicle getVehicle(){
        return new Ford();
    }
}

class MainClass{
    psvm(String args[]){
        //create factory to get car
    }
}
``