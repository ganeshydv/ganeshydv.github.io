public class IncreaseDecreaseArrayBSearch {
    public static void main(String[] args) {
        int[] arr = {4,5,6,7,3,2,1};
        System.out.println();
        System.out.println(arr[findMaxEle(arr)]);
    }
    static int findMaxEle(int[] arr){
        int left = 0;
        int right = arr.length-1;
        while(left<right){
            int mid=left+(right-left)/2;
            // if mid is greater than mid+1 then max is on the left side so shift right to mid
            // see this is true for increase/decresing array not fot shifte array as in shifte array mid+1 and mid can not be helpful to determine the which side the max element can be so we compare mid with right/end or left/start
            if(arr[mid]>arr[mid+1]){ 
                right=mid;
            }else{
                left=mid+1;
            }
        }
        return left;
    }

}
