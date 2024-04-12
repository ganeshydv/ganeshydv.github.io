/*
 Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

 

Example 1:

Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
Example 2:

Input: nums = [1], k = 1
Output: [1]
 

Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
k is in the range [1, the number of unique elements in the array].
It is guaranteed that the answer is unique.
 
 */

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

class Top_k_frequent_ele {
    public static void main(String[] args) {
        //
        int k=1;
        int[] nums = {1,1,1,2,2,3,3,3,3};
        int[] result = new int[k];
        List lst =topKFrequent(nums,k);
        for(int i=0;i<lst.size();i++){
            result[i]=(Integer) lst.get(i);
        }
        System.out.println(Arrays.toString(result));
    }

    static List<Integer> topKFrequent(int[] nums, int k) {
        // create a hashmap to store the frequency of each element
        Map<Integer, Integer> map = new HashMap<>();
        // iterate over the array and store the frequency of each element in the hashmap
        for (int num : nums) {
            map.put(num, map.getOrDefault(num, 0) + 1);
        }
        
        List<Integer> res = new ArrayList<>();
        // create a min heap to store the k most frequent elements
        PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> map.get(a) - map.get(b));
        // iterate over the hashmap and store the k most frequent elements in the min heap
        for (int key : map.keySet()) {
            pq.add(key);
            if (pq.size() > k) {
                pq.poll();
            }
        }
        // add the k most frequent elements to the result list
        while (!pq.isEmpty()) {
            res.add(pq.poll());
        }
        return res;

        // return null;
    }
}
