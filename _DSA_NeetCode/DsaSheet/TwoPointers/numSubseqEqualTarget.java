package DsaSheet.TwoPointers;

import java.util.Arrays;

public class numSubseqEqualTarget {
    public static void main(String[] args) {
        int[] nums = { 3, 5, 6, 7 };
        int target = 9;
        numSubseqEqualTarget numSubseqEqualTarget = new numSubseqEqualTarget();
        System.out.println(numSubseqEqualTarget.numSubseq(nums, target));
        
    }
    public int numSubseq(int[] nums, int target) {
        int MOD = 1000000007;
        int n = nums.length;
        int[] pows = new int[n];
        pows[0] = 1;
        for (int i = 1; i < n; i++) {
            pows[i] = (pows[i - 1] * 2) % MOD;
        }
        Arrays.sort(nums);
        int ans = 0;
        int l = 0, r = n - 1;
        while (l <= r) {
            if (nums[l] + nums[r] > target) {
                r--;
            } else {
                ans = (ans + pows[r - l]) % MOD;
                l++;
            }
        }
        return ans;
    }
}
