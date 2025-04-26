
interface IPayments{
    public void processPayment();
}

class Gpay implements IPayments{
    public void processPayment(){
        System.out.println("Gpay is processing payment...");
    }
}

class CreditCard implements IPayments{
    public void processPayment(){
        System.out.println("CreditCard is processing payment...");
    }
}

class PaymentStrategy{
    IPayments payment;
    public void addPayementMedium(IPayments payment){
        this.payment=payment;
    }
    public void processPayment(){
        if(this.payment!=null){
            this.payment.processPayment();
        }else{
            System.out.println("please add Payement mentod ");
        }
    }
}

public class StrategyPattern{
    public static void main(String[] args){
        System.out.println("Strategy Pattern Example");
        PaymentStrategy paymentStrategy = new PaymentStrategy();
        paymentStrategy.addPayementMedium(new Gpay());
        paymentStrategy.processPayment();
        paymentStrategy.addPayementMedium(new CreditCard());
        paymentStrategy.processPayment();
        paymentStrategy.addPayementMedium(null);
        paymentStrategy.processPayment();
        
    }
}