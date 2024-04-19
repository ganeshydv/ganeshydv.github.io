package DsaSheet.TwoPointers;

import java.util.Set;

public class ValidPalindromeIfRemoveOne {
    public static void main(String[] args) {
        String s = "cbbcc";
        System.out.println(validPalindrome(s));
        String s2 = "aba";
        System.out.println(validPalindrome(s2));
    }

    static boolean validPalindrome(String s){

        return checkPalindrome(0, s.length()-1, s, 0);
    }

    static boolean checkPalindrome(int start,int end,String s,int count){
        // base case
        if(count>1)return false;
        while(start<end){
            char c1=s.charAt(start);
            char c2=s.charAt(end);
            if(Character.toLowerCase(c2)!=Character.toLowerCase(c1)){ 
                return checkPalindrome(start, end-1, s,count+1)||checkPalindrome(start+1, end, s,count+1);
            }
            start++;
            end--;
        }
        return true;
    }
 /*    static boolean validPalindrome(String s) {
        if(s.length()==0)return true;
        int start=0;
        int end=s.length()-1;
        boolean ans=true;
        while(start<=end){
            char c1=s.charAt(start);
            char c2=s.charAt(end);
            if(Character.toLowerCase(c2)!=Character.toLowerCase(c1)){ 
                boolean b=checkPalindrome(start,end-1,s); // remove c2 : end
                boolean b2=checkPalindrome(start+1,end,s); // remove c1 : start
                if(b || b2){return true;}
                else {
                    ans=false;
                    break;
                }
            }
            start++;
            end--;
            
        }

        return ans;
    }

   static boolean checkPalindrome(int start,int end,String s){
         while(start<=end){
            char c1=s.charAt(start);
            char c2=s.charAt(end);
            if(Character.toLowerCase(c2)!=Character.toLowerCase(c1)){ 
                return false;
            }
            start++;
            end--;
        }
        return true;
    }
    */
}
