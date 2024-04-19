package DsaSheet.TwoPointers;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/*
Problem : No. 80
Title : Remove Duplicates from Sorted Array II
Link : https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/
Example :
Input: nums = [1,1,1,2,2,3]
Output: 5, nums = [1,1,2,2,3] 
Explained :
Given a sorted array nums, remove the duplicates in-place such that duplicates appeared at most twice and return the new length.
Do not allocate extra space for another array; you must do this by modifying the input array in-place with O(1) extra memory.
Constraints:
Remove the duplicates in-place such that duplicates appeared at most twice and return the new length.
All elements in nums are sorted.
nums.length <= 3 * 104
-104 <= nums[i] <= 104
-------------------------
-----------------------
Algorithm :
1. 
 */

public class RemoveDuplicates2 {
    
    public static void main(String[] args) {
        // int[] nums={1,1,1,2,2,3};
        int[] nums={1,2,3};

        Set<Integer> a=removeDuplicates(nums).keySet();
        System.out.println(a);
        System.out.println(Arrays.toString(removeDuplicates(nums).get(a.toArray()[0])));
    }
    static Map<Integer,int[]> removeDuplicates(int[] nums) {
        // shifting sub array is problem if need to do it in O(1) space
        // so we can use two pointer approach
        int count=2;
        for(int i=2;i<nums.length;i++){
            if(nums[i]>nums[count-2]){
                nums[count++]=nums[i];
            }
        }
        HashMap<Integer,
        int[]> map=new HashMap<>();
        map.put(count,nums);
        return map;
    
    }
}
