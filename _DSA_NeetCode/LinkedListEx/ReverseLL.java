// import SinglyLL.Node;

public class ReverseLL {
    public static void main(String[] args) {
        SinglyLL ll = new SinglyLL();
        ll.addAtHead(10);
        ll.addAtHead(20);
        ll.addAtHead(30);
        ll.display();
        System.out.println();
        reverseLL(ll.getHead());

    }

    public static Node reverseLL(Node head) {
        Node prev=null;
        Node curr=head;
        Node next=null;
        while (curr!=null){
            next=curr.next; //remember next node
            curr.next=prev; // change next of current to previous
            prev=curr; //change previous to current
            curr=next; //change current to next
        }
        //print the reversed linked list
        while(prev!=null){
            System.out.print(prev.data + " -> ");
            prev=prev.next;
        }
        return prev;
        
    }
}
 