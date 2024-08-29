package com.example;

import com.LLD.Patterns.ObserverPattern.Observable.IObservable;
import com.LLD.Patterns.ObserverPattern.Observable.ScoreObservable;
import com.LLD.Patterns.ObserverPattern.Observable.WeatherObservable;
import com.LLD.Patterns.ObserverPattern.Observer.IObserver;
import com.LLD.Patterns.ObserverPattern.Observer.Mobile;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        System.out.println( "Hello World! 2" );
        // actions
        // cretae observable
        // create observer with observable HAS-A
        // add observer to observable
        // set data
        // send to all
        
        IObservable weather1 = new WeatherObservable();
        
        IObservable weather2 = new WeatherObservable();
        IObserver mobile = new Mobile(weather1);
        weather1.add(mobile);  
        weather1.setData(10);

        IObserver mobile2 = new Mobile(weather2);
        weather2.add(mobile2);
        weather2.setData(0);

        IObservable score1=new ScoreObservable();
        IObserver mobile3 = new Mobile(score1);
        score1.add(mobile3);
        score1.setData(30);


        

    }
}
