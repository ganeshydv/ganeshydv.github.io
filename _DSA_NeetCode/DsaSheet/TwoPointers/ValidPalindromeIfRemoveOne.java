package DsaSheet.TwoPointers;

import java.util.Set;
/*
 * 680. Valid Palindrome II
 * Given a string s, return true if the s can be palindrome after deleting at most one character from it.
 * 
 * Example 1:
 * Input: s = "aba"
 * Output: true
 * ------------------------------
 * Logic:
 * 1. We will use two pointer approach.
 * 2. We will check if the characters at the start and end are equal.
 * 3. If they are not equal then we will check if the string is palindrome after removing the character at the start or end.
 * 4. If the string is palindrome after removing the character then we will return true.
 * 5. If the string is not palindrome after removing the character then we will return false.
 * 6. We will get the desired output.
 * 7. Time complexity is O(n) and space complexity is O(1).
 * 
 */

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
