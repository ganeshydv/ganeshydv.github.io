// Factory Pattern is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created. It is used when the exact type of the object to be created is not known until runtime. The Factory Pattern promotes loose coupling by eliminating the need to bind application-specific classes into your code. The Factory Pattern uses a factory method to create objects without specifying the exact class of object that will be created.
// It is a way to create objects without exposing the instantiation logic to the client and refer to the newly created object through a common interface.

interface Vehcile {
    public void start();
    public void stop();
}

class Tata implements Vehcile {
    public void start() {
        System.out.println("Tata is starting...");
    }

    public void stop() {
        System.out.println("Tata is stopping...");
    }
}

class Honda implements Vehcile {
    public void start() {
        System.out.println("Honda is starting...");
    }

    public void stop() {
        System.out.println("Honda is stopping...");
    }
}

public class FactoryPattern {
    public Vehcile getVehicle(String vehicleType) {
        if (vehicleType == null) {
            return null;
        }
        if (vehicleType.equalsIgnoreCase("TATA")) {
            return new Tata();
        } else if (vehicleType.equalsIgnoreCase("HONDA")) {
            return new Honda();
        }
        return null;
    }
}

class MainClass {
    public static void main(String[] args) {
        FactoryPattern factory = new FactoryPattern();
        Vehcile vehicle1 = factory.getVehicle("TATA");
        vehicle1.start();
        vehicle1.stop();

        Vehcile vehicle2 = factory.getVehicle("HONDA");
        vehicle2.start();
        vehicle2.stop();
    }
}




