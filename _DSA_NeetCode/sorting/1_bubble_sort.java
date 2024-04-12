package sorting;

import java.util.Arrays;

class BubbleSort {
    public static void main(String[] args) {
        int[] nums={0,5,4,3,2,1};
        bubbleSort(nums);
        System.out.println(Arrays.toString(nums));
    }

    static void bubbleSort(int[] nums){
        int len=nums.length;
        
        for(int i=0;i<nums.length;i++){
            boolean swapped=false;
            for(int j=1;j<len;j++){
                if(nums[j-1]>nums[j]){
                    int temp=nums[j-1];
                    nums[j-1]=nums[j];
                    nums[j]=temp;
                    swapped=true;
                }
            }
            if(!swapped)break;
            len--;
        }
    }
}
