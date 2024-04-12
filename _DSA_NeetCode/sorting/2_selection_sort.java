package sorting;

class SelcectionSort {
    public static void main(String[] args) {
        int[] nums = { 0, 5, 4, 3, 2, 1 };
        selectionSort(nums);
        System.out.println(java.util.Arrays.toString(nums));
    }

    // find the max element and swap it with the last element
    // decrement the length of the array by 1 i.e. len and repeat the process
    static void selectionSort(int[] nums) {
        int len = nums.length;
        for (int i = 0; i < nums.length; i++) {
            int max = nums[0];
            int index = 0;
            for (int j = 1; j < len; j++) {
                // decide max element
                if (nums[j] > max) {
                    max = nums[j];
                    index = j;
                }

            }

            len--;
            int temp = nums[len];
            nums[len] = max;
            nums[index] = temp;

        }
    }
}
