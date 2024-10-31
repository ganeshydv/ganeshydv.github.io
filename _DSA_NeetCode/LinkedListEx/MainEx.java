// package LinkedListEx;

public class MainEx {
    public static void main(String[] args) {
        SinglyLL ll = new SinglyLL();
        ll.addAtHead(10);
        ll.addAtHead(20);
        ll.addAtHead(30);
        ll.display();
        System.out.println();
        //as Node is prvate we can't access it from here
        // System.out.println("Head: "+ll.getHead().data);
        // System.out.println("Tail: "+ll.getTail().data);
    }
}
