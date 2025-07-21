/*
> Builder Pattern: first build properties then build the object but object can not be changed after it is created
> constructor: private
> builder: static inner class which has
    1. same properties as the outer class 
    2. SETTER for each property NOT GETTERS
    3. build method which will return the outer class object
*/
//car constructor: private

class Car{
    private String color;
    private String engine;
    private String seats;

    private Car(String color, String engine, String wheels, String seats) {
        this.color = color;
        this.engine = engine;
        this.seats = seats;
    }

    @Override
    public String toString() {
        return "Car{" +
                "color='" + color + '\'' +
                ", engine='" + engine + '\'' +
                ", seats='" + seats + '\'' +
                '}';
    }

    public String getColor() {
        return color;
    }
    public String getEngine() {
        return engine;
    }
    public String getSeats() {
        return seats;
    }

    public static class CarBuilder{
        private String color;
        private String engine;
        private String seats;

        public CarBuilder setColor(String color) {
            this.color = color;
            return this;
        }

        public CarBuilder setEngine(String engine) {
            this.engine = engine;
            return this;
        }

        public CarBuilder setSeats(String seats) {
            this.seats = seats;
            return this;
        }

        public Car build(){
            return new Car(color,engine,seats);
        }
    }
}

public class BuilderPattern {
    public static void main(String[] args) {
        Car car = new Car.CarBuilder()
                .setColor("Red")
                .setEngine("V8")
                .setSeats("4")
                .build();
        System.out.println(car);
    }
}