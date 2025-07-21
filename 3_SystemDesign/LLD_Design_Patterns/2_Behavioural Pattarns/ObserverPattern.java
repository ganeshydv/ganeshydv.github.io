interface ISubscriber {
    void update(String message);
}

interface ISubject {
    void registerSubscriber(ISubscriber subscriber);
    void unregisterSubscriber(ISubscriber subscriber);
    void notifySubscribers(String message);
}

// Concrete implementation of the Subject
// and Observer interfaces

// Example of Weather Station
import java.util.ArrayList;
import java.util.List;

class Person implements ISubscriber {
    private String name;

    public Subscriber(String name) {
        this.name = name;
    }

    @Override
    public void update(String message) {
        System.out.println(name + " received message: " + message);
    }
}
class WeatherStation implements ISubject {
    private List<ISubscriber> subscribers = new ArrayList<>();

    @Override
    public void registerSubscriber(ISubscriber subscriber) {
        subscribers.add(subscriber);
    }

    @Override
    public void unregisterSubscriber(ISubscriber subscriber) {
        subscribers.remove(subscriber);
    }

    @Override
    public void notifySubscribers(String message) {
        for (ISubscriber subscriber : subscribers) {
            subscriber.update(message);
        }
    }
}

// Example of Youtube Channel
class YoutubeChannel implements ISubject {
    private List<ISubscriber> subscribers = new ArrayList<>();
    
    @Override
    public void registerSubscriber(ISubscriber subscriber) {
        subscribers.add(subscriber);
    }

    @Override
    public void unregisterSubscriber(ISubscriber subscriber) {
        subscribers.remove(subscriber);
    }

    @Override
    public void notifySubscribers(String message) {
        for (ISubscriber subscriber : subscribers) {
            subscriber.update(message);
        }
    }

}
class YoutubeSubscriber implements ISubscriber {
    private String name;

    public YoutubeSubscriber(String name) {
        this.name = name;
    }

    @Override
    public void update(String message) {
        System.out.println(name + " received notification: " + message);
    }
}
