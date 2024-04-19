package DsaSheet.Array;

/*
 Ex. 2149 : Rearrange array in alternating positive & negative items with O(1) extra space
    Given an array of positive and negative numbers, arrange them in an alternate fashion such that every positive number is followed by negative and vice-versa maintaining the order of appearance.
    ex : 1, 2, 3, -4, -1, 4
    o/p : 1, -4, 2, -1, 3, 4
 */

public class ReArrangeBySign {
    public static void main(String[] args) {
        // int[] arr = {1, 2, 3, -4, -1, 4};
        // reArrangeBySign(arr);
        // for (int i : arr) {
        //     System.out.print(i + " ");
        // }

        int[] arr = {1, 2, 3, -4, -1, 4};
        reArrangeBySign(arr);
        for (int i : arr) {
            System.out.print(i + " ");
        }
    }

    // brute force approach
    public static void reArrangeBySign(int[] nums){
        // find the first positive element index from the left
        // and put it at start --> shift all elements to right
        // increment the start index
        // find the first negative element index from the left after start
        // and put it at start+1 --> shift all elements to right
        int pos=0;
        int neg=1;
        for(int i=0;i<nums.length;i++){
            
            // find positive element and place it at expected position
            if(nums[pos] < 0){
                
                // find the first positive element index from the left
                while(pos < nums.length && nums[pos] < 0){
                    pos++;
                }
                if(pos < nums.length){
                    int temp = nums[pos];
                    // shift all elements to right
                    for(int j=i;j<nums.length-1;j++){
                        nums[j+1] = nums[j];
                    }
                }
                // place the positive element at   
                pos=pos+2; 

            }

            if(nums[neg] > 0){
                // find the first negative element index from the left
                while(neg < nums.length && nums[neg] > 0){
                    neg++;
                }
                if(neg < nums.length){
                    int temp = nums[neg];
                    // shift all elements to right
                    for(int j=i;j<nums.length-1;j++){
                        nums[j+1] = nums[j];
                    }
                }
                // place the positive element at   
                neg=neg+2; 
            }
        }
    }

    public static void negativeToRightAndPositiveToLeft(int[] arr) {
        int n = arr.length;
        int i = 0;
        int j = n - 1;
        while (i < j) {
            // find the first positive element index from the left
            while (i < n && arr[i] < 0) {
                i++;
            }
            // find the first negative element index from the right
            while (j >= 0 && arr[j] > 0) {
                j--;
            }

            // swap the elements
            if (i < j) {
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
}