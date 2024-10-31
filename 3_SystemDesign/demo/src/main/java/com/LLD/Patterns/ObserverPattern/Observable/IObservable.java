package com.LLD.Patterns.ObserverPattern.Observable;

import java.util.List;

import com.LLD.Patterns.ObserverPattern.Observer.IObserver;

public interface IObservable {
    List<IObserver> observers = null;
	void add(IObserver observer);
    void remove(IObserver observer);
    void SendToAll();
    void setData(int data);
    int getData();
}
