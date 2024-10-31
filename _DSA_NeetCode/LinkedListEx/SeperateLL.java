import java.util.LinkedList;

public class SeperateLL {
    public static void main(String[] args) {
        SinglyLL ll = new SinglyLL();
        ll.addAtTail(10);
        ll.addAtTail(20);
        ll.addAtTail(30);
        ll.addAtTail(40);
        ll.addAtTail(50);
        ll.display();
        System.out.println();
        divideLL(ll.getHead());
        ll.display();

    }

    static void divideLL(Node head){
        if(head==null)return;
        //create 2 new list and reverse 2nd then merge
        Node even =head;
        Node even_h =head;
        Node odd = head.next;
        Node odd_h = head.next;
        Node curr = odd;
        while(curr!=null && curr.next!=null){
            even.next = curr.next;
            even = even.next;
            odd.next = even.next;
            odd = odd.next;
            curr=odd; 
        }
        //NOW REVERSE ODD
        Node prev=null;
        Node nextN=null;
        curr=odd_h;
        while(curr!=null){
            nextN=curr.next;
            curr.next=prev;
            prev=curr;
            curr=nextN;        
        }
        
        //prev is head of odd
        //now merge with Even 
        curr=prev; 
        even=even_h;

        while(even!=null && even.next!=null){
            nextN=even.next;
            even.next=curr;
            even=nextN;
            curr=curr.next;
        }
    }
}
