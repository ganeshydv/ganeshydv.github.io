package com.LLD.Patterns.ObserverPattern.Observer;

import com.LLD.Patterns.ObserverPattern.Observable.IObservable;

public class Mobile implements IObserver{
    IObservable observable;
    public Mobile(IObservable observable){
        this.observable = observable;
    }
    public void update(String message){
        System.out.println("Mobile update");
        System.out.println(message+" is available "+observable.getData());
    }
    public void update(){
        System.out.println("Mobile update");
        System.out.println("stock is available "+observable.getData());
    }
    
}
