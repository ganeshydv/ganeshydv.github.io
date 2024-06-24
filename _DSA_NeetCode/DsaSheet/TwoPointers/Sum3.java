package DsaSheet.TwoPointers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Sum3 {
    public static void main(String[] args) {
        Sum3 sum3=new Sum3();
        int[] nums={-2,0,0,2,2};
        System.out.println(sum3.threeSum(nums));
    }
    public List<List<Integer>> threeSum(int[] nums){
        Arrays.sort(nums);
        List<List<Integer>> lst=new ArrayList<>();

        for(int start=0;start<nums.length;start++){
            if(start>0 && nums[start]==nums[start-1]){
                continue;
            }
            int mid=start+1;
            int end=nums.length-1;
            while(mid<end){
                int total=nums[start]+nums[mid]+nums[end];
                if(total>0){
                    end--;
                }else if (total<0){
                    mid++;
                }else{
                    lst.add(Arrays.asList(nums[start],nums[mid],nums[end]));
                    mid++;
                    while (nums[mid]==nums[mid-1] && mid<end){
                        mid++;
                        
                    }
                }
            }
        }
        return lst;
    }

    public List<List<Integer>> threeSum2DontTakeSimilarElements(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> lst=new ArrayList<>();
        int start=0;
        int mid=1;
        int end=nums.length-1;
        while(start<mid && mid<end){
            if(nums[start]+nums[mid]+nums[end]==0){
                List<Integer> lst2=new ArrayList<>();
                lst2.add(nums[start]);
                lst2.add(nums[mid]);
                lst2.add(nums[end]);
                lst.add(lst2);
                end--;
            }else if(nums[start]+nums[mid]+nums[end]>0){
                end--;
            }else{
                mid++;
            }

            if(mid==end){
                start++;
                mid=start+1;
            }
        }
        return lst;
    }
}
