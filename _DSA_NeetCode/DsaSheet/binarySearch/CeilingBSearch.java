

public class CeilingBSearch {

    public static void main(String[] args) {
        int[] arr = {1, 2, 8, 10, 10, 12, 19};
        int target = 5;
        int ans = ceiling(arr, target);
        System.out.println("\n"+ans);
        int ans2 = floorValue(arr, target);
        System.out.println( ans2);
    }
    static int ceiling(int[] arr,int target){
        if(target>arr[arr.length-1]){
            return -1;
        }
        int start=0;
        int end=arr.length-1;
        while (start<=end) {
            int mid=start+(end-start)/2;
            if(arr[mid]==target){
                return mid;
            }
            if(arr[mid]>target){
                end=mid-1;
            }else{
                start=mid+1;
            }
        }
        return start;
    }

    static int floorValue(int[] arr,int target){
        if(target<arr[0]){
            return -1;
        }
        int start=0;
        int end=arr.length-1;
        while (start<=end) {
            int mid=start+(end-start)/2;
            if(arr[mid]==target){
                return mid;
            }
            if(arr[mid]>target){
                end=mid-1;
            }else{
                start=mid+1;
            }
        }
        return end;
    }
    
}
