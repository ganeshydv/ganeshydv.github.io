package DsaSheet.TwoPointers;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
/*
 * 3. Longest Substring Without Repeating Characters
 * Given a string s, find the length of the longest substring without repeating characters.
 * 
 * Example 1:
 * Input: s = "abcabcbb"
 * Output: 3
 * Explanation: The answer is "abc", with the length of 3.
 * 
 * Logic:
 * 1. We have to find the length of the longest substring without repeating characters.
 * 2. We will use the two-pointer approach.
 * 3. We will keep track of the start and end of the substring.
 * 4. We will keep track of the maximum length of the substring.
 * 5. We will iterate over the string.
 * 6. If the character at the end is not present in the set then we will add it to the set.
 * 7. If the character at the end is present in the set then we will remove the character at the start and increment the start.
 * 8. We will update the maximum length of the substring.
 * 9. Return the maximum length of the substring.
 * 
 */
import java.util.Set;

public class LongestSubStringWithouRepeatVhar {
    public static void main(String[] args) {
        String s="dvdf";
        // System.out.println(lengthOfLongestSubstring(s));
        // System.out.println(lengthOfLongestSubstring2(s));
        System.out.println(lengthOfLongestSubstring3(s));
    }

    // following is not working for examples like "babcd" 
    // for othe it's working
    // O(n)=n
    static int lengthOfLongestSubstring(String s) {
        if(s.length()==0)return 0;
        int max=1;
        List<Character> list=new ArrayList<>();
        for(int i=0;i<s.length();i++){
            while (!list.contains(s.charAt(i))){
                list.add(s.charAt(i));
                i++;
                if(i==s.length()) break; 
            }
            max=Math.max(max,list.size());
            list.clear();
            i--;
        }
        return max;
    }

    // O(N)=n^2
    static int lengthOfLongestSubstring2(String s) {
        int max=0;
        for(int i=0;i<s.length();i++){
            Set<Character> set=new HashSet<>();
            for(int j=i;j<s.length();j++){
                if(set.contains(s.charAt(j))){
                    break;
                }
                set.add(s.charAt(j));
                max=Math.max(max,j-i+1);
            }
        }
        return max;
    }

    // two pointer approach
    // O(N)= 2*n
    /*
     * 1. We will use two pointer approach.
     * 2. We will keep track of the start and end of the substring.
     * 3. We will keep track of the maximum length of the substring.
     * 4. We will iterate over the string.
     * 5. If the character at the end is not present in the set then we will add it to the set.
     * 6. while If the character at the end is present in the set then we will remove the character at the start
     *    and increment the start.
     *    
     * 7. We will update the maximum length of the substring.
     * 8. Return the maximum length of the substring.
     * 
     */

     static int lengthOfLongestSubstring3(String s){
        int max=1;
        int left=0;
        int right=0;
        Set<Character> set=new HashSet<>();
        while (right<s.length()) {
            while(left<right && set.contains(s.charAt(right))){ 
                set.remove(s.charAt(left));
                left++;
            }
            max=Math.max(max, right-left+1);
            set.add(s.charAt(right));
            right++;
        }
        
        return max;
     }

}
