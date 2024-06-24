package DsaSheet.Array;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/*
 * 128. Longest Consecutive Sequence
 * Example 1:
 *  Input: nums = [100,4,200,1,3,2]
 * Output: 4
 * Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
 * ------------------------------------
 * Algorithm:
 * 1. Create a set and add all the elements of the array to the set.
 * 2. Initialize a variable max to store the maximum length of the sequence.
 * 3. Iterate over the array.
 * 4. If the current element is the starting point of the sequence then find the length of the sequence.
 * 5. Update the max if the length of the sequence is greater than the max.
 * 6. Return the max.
 * 
 */
public class LongestConsecutiveSeq {
    public static void main(String[] args) {
        int[] nums = { 100,4,200,1,3,2 };
        // System.out.println(longestConsecutive(nums));
        System.out.println(long2(nums));
        System.out.println(longestConsecutive3(nums));
    }

    static int longestConsecutive(int[] arr) {
        int max = 1;
        Arrays.sort(arr);
        for (int i = 0; i < arr.length; i++) {
            int count = 1;
            while (i < arr.length - 1 && arr[i + 1] == arr[i] + 1) {
                count++;
                i++;
            }
            max = Math.max(max, count);
        }
        return max;
    }
    static int long2(int[] nums){
        Set<Integer> set = new HashSet<>();
        for(int i:nums){
            set.add(i);
        }
        int maxC=1;
        int c=1;
        for(int i:nums){
            if(!set.contains(i-1)){ //if not starting point
                c=1;
                while(set.contains(i+1)){
                    c++;
                    i++;
                }
            }
            maxC=Math.max(c,maxC);
        }
        return maxC;
    }
    static int longestConsecutive3(int[] arr) {
        int max=1;
        int count=1;
        Arrays.sort(arr);
        for(int i=1;i<arr.length;i++){
            while(i<arr.length && (arr[i]==arr[i-1] || arr[i]-arr[i-1]==1)){
                count++;
                i++;
            }
            max=Math.max(max,count);
            if(i<arr.length && arr[i]-arr[i-1]!=1){
                count=1;
            }
            
        }
        return max-1;
    }
}
