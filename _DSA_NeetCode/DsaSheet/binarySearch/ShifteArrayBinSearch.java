
public class ShifteArrayBinSearch{
    public static void main(String[] args) {
        int[] arr = {7,8,1,2,3,4,5};
        System.out.println();
        // findPivotPositon(arr);
        System.out.println(arr[findPivotPositon(arr)]);
        // System.out.println(arr[findPivotPositon2(arr)]);
    }

    //this give -1 if the array is sorted / not shifted
    static int findPivotPositon(int[] arr){
        System.out.println("findPivotPositon  ----  1");
        int left = 0;
        int right = arr.length-1;

        while(left<=right){
            int mid=left+(right-left)/2;
            if(mid < right && arr[mid]>arr[mid+1])return mid;
            if(mid > left && arr[mid]<arr[mid-1])return mid-1;
            // if mid is less than right then the pivot is on the left side so shift right to mid
            if(arr[left]<=arr[mid]){
                left=mid+1;
            }else{
                right=mid-1;
            }
            
        }
        return -1;
    }

    // wrong for finding in shifte array as mid+1 and mid can not be helpful do detrmine the which side the max element can be : solution compare mid with right/end or left/start
    static int findPivotPositon2(int[] arr){
        System.out.println("findPivotPositon ------ 2");
        int left = 0;
        int right = arr.length-1;

        while(left<=right){
            int mid=left+(right-left)/2;
            // if mid is less than right then the pivot is on the left side so shift right to mid
            
            if(mid < right && arr[mid]>arr[mid+1])return mid;
            if(mid > left && arr[mid]<arr[mid-1])return mid-1;
            if(arr[mid]<=arr[mid+1]){
              
                left=mid+1;
            }else{
                right=mid-1;
            }
           
        }
       
        return -1;
    }

    /*

    Example 1:

Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
Example 2:

Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
Example 3:

Input: nums = [1], target = 0
Output: -1
     * class Solution {
    public int search(int[] nums, int target) {
        // int left = 0;
        // int right = nums.length - 1;

        // while (left <= right) {
        //     int mid = (left + right) / 2;

        //     if (nums[mid] == target) {
        //         return mid;
        //     } else if (nums[mid] >= nums[left]) { // if target in sorted manner i.e. as mid greater than left
        //         if (nums[left] <= target && target <= nums[mid]) { // but if target is greater > = left  and 
        //             right = mid - 1;
        //         } else {
        //             left = mid + 1;
        //         }
        //     } else {
        //         if (nums[mid] <= target && target <= nums[right]) {
        //             left = mid + 1;
        //         } else {
        //             right = mid - 1;
        //         }
        //     }
        // }

        // return -1;        
        return solution2(nums,target);        
    }

    int solution2(int[] nums, int target){
        //find pivot/max in shifted array
        int p=pivotIndex(nums);
        int s=0;
        int e=nums.length-1;
        if(p==-1){
            //do binary search array is sorted
            return bSearch(nums,target,s,e);
        }
        if(nums[p]==target)return p;
        // decide which side to search
        if(nums[s]>target){
            s=p+1;
        }else{
            e=p-1;
        }
       
        return bSearch(nums,target,s,e);
    }
    int bSearch(int[]nums,int target,int s,int e){
         while(s<=e){
             int mid=s+(e-s)/2;
             if(nums[mid]==target)return mid;
             if(nums[mid]>target){
                e=mid-1;
             }else{
                s=mid+1;
             }
        }
        return -1;
    }
    int pivotIndex(int[] nums){
        if(nums.length==1)return 0;
        int left=0;
        int right=nums.length-1;
        while(left<=right){
            int mid=left+(right-left)/2;
            if(mid<right && nums[mid] > nums[mid+1]) return mid;
            if(mid>left && nums[mid] < nums[mid-1]) return mid-1;
            if(nums[mid]>=nums[left]){
                left=mid+1;
            }else{
                right=mid-1;
            }
        }
        return -1;
    }
}
     */
}