package DsaSheet.Array;

import java.util.HashMap;
import java.util.Map;
 

//https://leetcode.com/problems/majority-element/description/
// 169 Majority Element
public class FindMaxRepeated {
    public static void main(String[] args) {
        int[] nums = {6,5,5};
        System.out.println(majorityElement(nums));
    }
    static int majorityElement(int[] nums) {

        // map = {num: count}
        Map<Integer,Integer> map=new HashMap<>(); // O(n)=n space
        for(int i=0;i<nums.length;i++){    // O(n)=n time
            if(!map.containsKey(nums[i])){
                map.put(nums[i],0);
            }
            map.put(nums[i],map.get(nums[i])+1);
        }
        for(int i:map.keySet()){   // O(n)=n time
            System.out.println(i+" "+map.get(i));
        }
        int max=nums[0]; // let max be the first element
        int MAX_VALUE=map.get(nums[0]); // let max value be the count of first element
        for(int i:map.keySet()){  // O(n)=n time
            if(map.get(i)>MAX_VALUE){
                MAX_VALUE=map.get(i);
                max=i;
            }
        }

        return max;
    }
}
