package DsaSheet.Kadanes_Algo_Sliding_Window;

/* 
53. Maximum Subarray

Given an integer array nums, find the 
subarray
with the largest sum, and return its sum.

Example 1:

Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
Example 2:

Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.
Example 3:

Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
 
----
Logic:
1. We have to find the maximum sum of the subarray.
2. We will keep track of the current sum.
3. We will keep track of the maximum sum.
4. We will iterate over the array.
5. If the current sum is less than 0 then we will update the current sum to 0.
6. We will add the current element to the current sum.
7. If the current sum is greater than the maximum sum then we will update the maximum sum.
8. Return the maximum sum.

 */

public class maxSumSubArray {
    public static void main(String[] args) {
        int[] nums = {-2,1,-3,4,-1,2,1,-5,4}; // 6
        System.out.println(maxSubArray(nums));
        
    }
    static int maxSubArray(int[] nums) {

        int maxSum=nums[0];
        int currentSum=nums[0];
        for(int i=0;i<nums.length;i++){
            if(currentSum<0){
                currentSum=0;
            }
            currentSum+=nums[i];
            if(currentSum>maxSum){
                maxSum=currentSum;
            }
        }
        return maxSum;
    }
}
