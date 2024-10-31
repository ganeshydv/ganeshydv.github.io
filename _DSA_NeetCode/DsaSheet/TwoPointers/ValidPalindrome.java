package DsaSheet.TwoPointers;

/*
#125. Valid Palindrome

Solved
Easy
Topics
Companies
A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

 

Example 1:

Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
Example 2:

Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
Example 3:

Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.

---------------------

Logic :
1. Remove all non-alphanumeric characters and convert all characters to lowercase.
2. Check if the string is palindrome or not.
3. If the string is palindrome then return true else return false.

 */

public class ValidPalindrome {

    public static void main(String[] args) {
        String s = "A man, a plan, a canal: Panama";
        System.out.println(isPalindrome(s));
    }

    static boolean isPalindrome_2(String s){
        // iterate from both ends 
        // if both are alphanumeric and equal then continue
        // else return false
        if(s.length()==0){
            return true;
        }
        int start=0;
        int end=s.length()-1;
        while (start<=end) {
            char c1=s.charAt(start);
            char c2=s.charAt(end);
            // check if c1 is alphanumeric
            if(!Character.isLetterOrDigit(c1)){ // skip if not alphanumeric
                start++;
            }else if(!Character.isLetterOrDigit(c2)){ // skip if not alphanumeric
                end--;
            }else{
                if(Character.toLowerCase(c1)!=Character.toLowerCase(c2)){ // check if both are equal
                    return false;
                }
                // if equal then move to next
                start++;
                end--;
            }
        }

        return true;
    }

    static boolean isPalindrome(String s) {

        // remove all non-alphanumeric characters
        s = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase(); // O(n)=n time
        for(int i=0;i<s.length()/2;i++){ // O(n)=n/2 time
            if(s.charAt(i)!=s.charAt(s.length()-1-i)){
                return false;
            }
        }


        return true;
        
    }
} 