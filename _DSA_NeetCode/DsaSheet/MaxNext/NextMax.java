import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Stack;

public class NextMax {
    public static void main(String[] args) {
        int[] arr = {1, 2, 8, 10, 10, 12, 19};
        int[] ans = findNextMax(arr);
        System.out.println(Arrays.toString(ans));
        
    }

    static int[] findNextMax(int[] arr){
        int n=arr.length;
        Map<Integer,Integer> map=new HashMap<>();
        Stack<Integer> stack=new Stack<>();

        for(int i=arr.length-1;i>=0;i--){

            // remove all the elements which are smaller than current element
            
            while(!stack.isEmpty() && arr[i]>stack.peek()){
                stack.pop();
            }

            // if stack is empty then there is no element greater than current element
            if(stack.isEmpty()){
                map.put(arr[i],-1);
            }else{
                map.put(arr[i],stack.peek());
            }

            // push the current element to stack it will be removed if we it's less than previous element in above while loop 
            stack.push(arr[i]);
        }

        for(int i=0;i<n;i++){
            arr[i]=map.get(arr[i]);
        }

        return arr;
    }
}
