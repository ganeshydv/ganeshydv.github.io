// Abstract Factory: Every Object have own Factory Class for creating the object.

interface IVehicle {
    public void start();
    public void stop();
}

interface IVehicleAbstractFactory {
    public IVehicle getVehicle(String vehicleType);
}

class Tata implements IVehicle {
    public void start() {
        System.out.println("Tata is starting...");
    }

    public void stop() {
        System.out.println("Tata is stopping...");
    }
}

class TataFactory implements IVehicleAbstractFactory {
    public IVehicle getVehicle() {
        return new Tata();
    }
}
class Honda implements IVehicle {
    public void start() {
        System.out.println("Honda is starting...");
    }

    public void stop() {
        System.out.println("Honda is stopping...");
    }
}
class HondaFactory implements IVehicleAbstractFactory {
    public IVehicle getVehicle() {
        return new Honda();
    }
}
class MainClass {
    public static void main(String[] args) {
        IVehicleAbstractFactory tataFactory = new TataFactory();
        IVehicle tata = tataFactory.getVehicle();
        tata.start();
        tata.stop();

        IVehicleAbstractFactory hondaFactory = new HondaFactory();
        IVehicle honda = hondaFactory.getVehicle();
        honda.start();
        honda.stop();
    }
}