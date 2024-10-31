// package LinkedListEx;

public class SinglyLL {
    private Node head;
    private Node tail;
    private int size;

    public SinglyLL(Node head) { // when ll is created with head node only tails and head are same
        this.head = head;
        this.tail = head;
        this.size = 1;
    }
    public SinglyLL() {  // when ll is created without head node
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    public void addAtHead(int val){

        //if head is null
        if(this.head == null){
            this.head = new Node();
            this.head.data = val;
            this.tail = head; //when head is null it means tail is also null
            this.size++;
        }else{
            //if head is not null
            Node temp = new Node();
            temp.data = val;
            temp.next = head;
            this.head = temp;
            size++;

        }
       
    }

    public void insertAt(int index,int val){
        if(index < 0 || index > this.size){
            System.out.println("Invalid index");
            return;
        }
        if(index == 0){
            addAtHead(val);
            return;
        }
        if(index == this.size){
            addAtTail(val);
            return;
        }
    }

    public void addAtTail(int val){
        if(this.head == null){
            addAtHead(val);
            return;
        }
        Node temp = new Node();
        temp.data = val;
        this.tail.next = temp;
        this.tail = temp;
        size++;
    }

    public void display(){
        Node temp = this.head;
        System.out.println("Size of LL: " + this.size);
        while(temp != null){
            System.out.print(temp.data + " -> ");
            temp = temp.next;
        }
    }

    public int getSize(){
        return this.size;
    }

    public Node getTail(){
        // System.out.println("Tail: " + this.tail.data);
        return this.tail;
    }
    
    public Node getHead(){
        return this.head;
    }
    
   
}
class Node{
    public int data;
    public Node next;
    //if want double linked list then add prev node
    //private Node prev;
 }