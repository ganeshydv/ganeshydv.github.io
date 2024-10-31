public class ShitArrayBSearch2 {
 
    public static void main(String[] args) {
        int[] arr = {1,1,1,1,1,1};

        int ans=searchInShiftedArray(arr, 2); 
        System.out.println();
        System.out.println(ans);   
    }

    static int searchInShiftedArray(int[] nums,int target){

        //find pivot/max in shifted array
        int pivot=pivot(nums);
        if(pivot==-1){
            return binarySearch(nums, target, 0, nums.length-1);
        }
        if(nums[pivot]==target) return pivot;
        if(nums[0]<=target){
            return binarySearch(nums, target, 0, pivot-1);
        }else{
            return binarySearch(nums, target, pivot+1, nums.length-1);
        }

        // return -1;
    }
    static int pivot(int[] arr){
        int left=0;
        int right=arr.length-1;
        while (left<=right) {
            int mid=left+(right-left)/2;
            if(mid< right && arr[mid]>arr[mid+1] ) return mid;
            if(mid>left && arr[mid-1]>arr[mid]) return mid-1;
            if(arr[mid]>=arr[left]){
                left=mid+1;
            }else{
                right=mid-1;
            }
        }
        return -1;
    }

    static int binarySearch(int[] arr,int target,int left,int right){
        while (left<=right) {
            int mid=left+(right-left)/2;
            if(arr[mid]==target) return mid;
            if(arr[mid]<target){
                left=mid+1;
            }else{
                right=mid-1;
            }
            
        }
        return -1;
    }
}
