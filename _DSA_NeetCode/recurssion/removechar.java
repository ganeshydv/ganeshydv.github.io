class RemoveChar{
    public static void main(String[] args) {
        String s = "geeksforgeeks";
        char c = 'e';
        System.out.println();
        System.out.println(removeChar(s, c));
    }

    public static String removeChar(String s, char c){
        if(s.length() == 0){
            return "";
        }
        if(s.charAt(0) == c){
            return removeChar(s.substring(1), c);
        }
        return s.charAt(0) + removeChar(s.substring(1), c);
    }
}