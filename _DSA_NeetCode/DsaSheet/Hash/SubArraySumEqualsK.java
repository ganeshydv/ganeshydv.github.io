package DsaSheet.Hash;

import java.util.Arrays;
import java.util.HashMap;

public class SubArraySumEqualsK {
    public static void main(String[] args) {
        int[] nums={1,-1,0};
        System.out.println(subarraySum(nums,0) );
    }

    static int subarraySum(int[] nums, int k) {
        int count=0;
        for(int i=0;i<nums.length;i++){
            int sum=0;
            for(int j=i;j<nums.length;j++){
                sum+=nums[j];
                if(sum==k){
                    count++;
                }
            }
        }
        return count;
    }

    static int subarraySum2(int[] nums, int k) {

        HashMap<Integer,Integer> map=new HashMap<>();//sum,count of sum
        map.put(0,1);
        int sum=0;
        int count=0;
        for(int i=1;i<nums.length;i++){
            sum+=nums[i];
            if(map.containsKey(sum-k)){ // ex sum=9, k=2 : sum-k=7
                count+=map.get(sum-k);
            }
            map.put(sum,map.getOrDefault(sum, 0)+1);
        }

        return count;

    }
}
