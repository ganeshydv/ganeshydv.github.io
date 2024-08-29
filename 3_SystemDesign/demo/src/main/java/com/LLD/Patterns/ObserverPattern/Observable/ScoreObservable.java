package com.LLD.Patterns.ObserverPattern.Observable;

import java.util.ArrayList;
import java.util.List;

import com.LLD.Patterns.ObserverPattern.Observer.IObserver;

public class ScoreObservable implements IObservable{
    private List<IObserver> observers = new ArrayList<>();
    private int score;
    public void add(IObserver observer){
        observers.add(observer);
    }
    public void remove(IObserver observer){
        observers.remove(observer);
    }
    public void setData(int data){
        // set data
        score = data;
        if(score > 0)this.SendToAll();
    }
    public void SendToAll(){
        for(IObserver observer: observers){
            observer.update("score");
        }
    }
    public int getData(){
        return score;
    }
    
}
