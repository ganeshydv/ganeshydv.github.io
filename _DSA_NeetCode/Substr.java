
class Substr{
    public static void main(String[] args) {
        
        substr("","abc");
    }
    static void substr(String processed,String unprocessed){
        if(unprocessed.isEmpty()){
            System.out.println(processed);
            return;
        }
        char ch=unprocessed.charAt(0);
        unprocessed=unprocessed.substring(1);
        substr(processed+ch,unprocessed);
        substr(processed,unprocessed);
    }
}