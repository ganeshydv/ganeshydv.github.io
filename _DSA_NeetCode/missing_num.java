import java.util.Arrays;

class Missing_num {
    public static void main(String[] args) {
        Missing_num missing_num = new Missing_num();
        int[] nums = {3,0,1};
        // System.out.println(missing_num.missingNumber2(nums));
        System.out.println(1^1);
        System.out.println(1^1^1);
    }

    public int missingNumber2(int[] nums) {
        int n = nums.length;
        int ans = 0;
        // EXOR of all the elements from 1 to 
        // ans: 1 ^ 2 ^ 3 ^ 4 ^ 5 ^ 6 = 7
        for (int i = 1; i <= n; i++) {
            ans = ans ^ i;
        }
        // EXOR of all the elements in the array
        // nums: 1 ^ 2 ^ 3 ^ 5 ^ 6
        // same elements will cancel out each other
        // ans: 4
        for (int i = 0; i < nums.length; i++) {
            ans = ans ^ nums[i];
        }
        return ans;
    }

     public int missingNumber(int[] nums) {
        int n = nums.length;
        int[] v = new int[n+1];
        Arrays.fill(v, -1);
        for(int i = 0; i < nums.length; i++) {
            v[nums[i]] = nums[i];
        }
        for(int i = 0; i < v.length; i++) {
            if(v[i] == -1) return i;
        }
        return 0;
    }
}
