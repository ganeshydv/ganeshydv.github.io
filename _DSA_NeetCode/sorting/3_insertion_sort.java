package sorting;

class InseertionSort {
    public static void main(String[] args) {
        int[] nums = { 0, 5, 4, 3, 2, 1 };
        insertionSort(nums);
        System.out.println(java.util.Arrays.toString(nums));
    }

    // iterate and put element at its correct position
    static void insertionSort(int[] nums){
        for(int i=0;i<nums.length-1;i++){
            for(int j=i+1;i>0;j--){
                if(nums[j]<nums[j-1]){
                    int temp=nums[j];
                    nums[j]=nums[j-1];
                    nums[j-1]=temp;
                }else{
                    break;
                }
            }
        }
    }
}
