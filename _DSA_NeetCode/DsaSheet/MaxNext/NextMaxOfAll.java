import java.util.Arrays;

public class NextMaxOfAll {
    public static void main(String[] args) {
        int[] arr = { 1, 2, 8, 10, 10, 12, 19 };
        int[] ans = findNextMaxOfAll(arr);
        System.out.println(Arrays.toString(ans));

    }

    static int[] findNextMaxOfAll(int[] arr) {

        int ans[] = new int[arr.length];
        ans[arr.length - 1] = -1;
        int currentMax = arr[arr.length - 1];
        for(int i=arr.length-2;i>=0;i--){
            if(currentMax<arr[i]){
                currentMax=arr[i];
            }else{
                ans[i]=currentMax;
            }
        }
        

        return ans;
    }
}
