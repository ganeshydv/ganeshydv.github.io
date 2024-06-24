package DsaSheet.TwoPointers;

/*
 Ex. 2149 : Rearrange array in alternating positive & negative items with O(1) extra space
    Given an array of positive and negative numbers, arrange them in an alternate fashion such that every positive number is followed by negative and vice-versa maintaining the order of appearance.
    ex : 1, 2, 3, -4, -1, 4
    o/p : 1, -4, 2, -1, 3, 4

    Logic:
    1. We will use two pointer approach.
    2. We will find the first positive element from the left and the first negative element from the right.
    3. We will swap the elements.
    4. We will continue this until the left pointer is less than the right pointer.
    5. We will get the desired output.
    6. Time complexity is O(n) and space complexity is O(1).
    
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
        // creat two lists to store positive and negative numbers
        // iterate over the array and store the positive and negative numbers in the lists
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