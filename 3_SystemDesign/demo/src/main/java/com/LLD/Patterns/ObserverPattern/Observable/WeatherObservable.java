package com.LLD.Patterns.ObserverPattern.Observable;

import java.util.ArrayList;
import java.util.List;

import com.LLD.Patterns.ObserverPattern.Observer.IObserver;

public class WeatherObservable implements IObservable{
    private List<IObserver> observers = new ArrayList<>();
    private int stock;
    public void add(IObserver observer){
        observers.add(observer);
    }
    public void remove(IObserver observer){
        observers.remove(observer);
    }
    public void setData(int data){
        // set data
        stock = data;
        if(stock > 0)this.SendToAll();
    }
    public void SendToAll(){
        for(IObserver observer: observers){
            observer.update("Weather");
        }
    }
    public int getData(){
        return stock;
    }
}