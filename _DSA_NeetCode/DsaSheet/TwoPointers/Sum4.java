package DsaSheet.TwoPointers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Sum4 {
    public static void main(String[] args) {
        Sum4 sum4 = new Sum4();
        int[] nums = { 1, 0, -1, 0, -2, 2 };
        System.out.println(sum4.fourSum(nums, 0));
    }

    public List<List<Integer>> fourSum(int[] nums, int target) {
        if (nums.length < 4)
            return null;
        Arrays.sort(nums); // -2 -1 0 0 1 2
        List<List<Integer>> lst = new ArrayList<>();
        int start = 0;
        int mid1 = start + 1;
        int mid2 = mid1 + 1;
        int end = mid2 + 1;
        while (start < mid1 && mid1 < mid2 && mid2 < end && end < nums.length) {
            int sum = nums[start] + nums[mid1] + nums[mid2] + nums[end];
            if (sum == target) {
                // add
                lst.add(Arrays.asList(nums[start], nums[mid1], nums[mid2], nums[end]));

            }else{
                while(end<nums.length-1){
                    end++;
                    sum = nums[start] + nums[mid1] + nums[mid2] + nums[end];
                    if (sum == target) {
                        // add
                        lst.add(Arrays.asList(nums[start], nums[mid1], nums[mid2], nums[end]));
                    }
                }

            }
            start++;
            mid1 = start + 1;
            mid2 = mid1 + 1;
            end = mid2 + 1;
        }

        return lst;

    }

}