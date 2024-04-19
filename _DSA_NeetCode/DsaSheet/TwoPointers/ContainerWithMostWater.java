package DsaSheet.TwoPointers;

/*
#11. Container With Most Water

Logic:
1. We have to find the max area of water that can be stored between two lines.
2. The area is calculated by the minimum of the two heights multiplied by the distance between them.
3. We have to maximize the area.
4. We will use two pointers L and R.
5. We will calculate the area and update the max area.
6. We will move the pointer with the smaller height to the right.
7. We will continue this until L<R.

*/
public class ContainerWithMostWater {
    public static void main(String[] args) {
        int[] height = {1,8,6,2,5,4,8,3,7};
        System.out.println(maxArea(height));
        System.out.println(maxVolume(height));
    }
    static int maxArea(int[] height) {
        int max=0;
        int L=0;
        int R=height.length-1;
        while(L<R){
            int area=Math.min(height[L],height[R])*(R-L);
            if(area>max)max=area;
            if(height[L]<height[R]){ // if height of L is less than height of R then move L to right
                L++;
            }else{
                R--;
            }
        }
        return max;
    }

    // / Kadanes_Algo_Sliding_Window
    static int maxVolume(int[] height){
        int max=0;
        int current=0;
        int hMaxIndex=0;
        int currentWidth=1;
        for(int i=0;i<height.length;i++){
            if(height[i]>height[hMaxIndex]){
                hMaxIndex=i; 
                currentWidth=1;
            }
            current=Math.max(current, Math.min(height[hMaxIndex],height[i])*(currentWidth)); // i: width
            max=Math.max(max, current);
            currentWidth++;
        }
        return max;
    }

}
