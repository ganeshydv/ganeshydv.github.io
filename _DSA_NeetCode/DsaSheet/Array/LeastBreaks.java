package DsaSheet.Array;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LeastBreaks {
    public static void main(String[] args) {
        List<List<Integer>> bricList=new ArrayList();
        bricList.add(new ArrayList<Integer>(List.of(1,2,2,1)));
        bricList.add(new ArrayList<Integer>(List.of(3,1,2)));
        bricList.add(new ArrayList<Integer>(List.of(1,3,2)));
        bricList.add(new ArrayList<Integer>(List.of(2,4)));
        bricList.add(new ArrayList<Integer>(List.of(3,1,2)));
        bricList.add(new ArrayList<Integer>(List.of(1,3,1,1)));
        System.out.println(leastBricks(bricList));
    }
     static int leastBricks(List<List<Integer>> wall) {
        Map<Integer,Integer> map=new HashMap<>();
        //add edge and their frequeny
        for(int row=0;row<wall.size();row++){
            int sum=0;
            for(int col=0;col<wall.get(row).size()-1;col++){
                sum+=wall.get(row).get(col);
                int edgePosition=sum;
                if(map.containsKey(edgePosition)){
                    map.put(edgePosition,map.get(edgePosition)+1);
                }else{
                    map.put(edgePosition,1);
                }
            }
        }
        //take max freq edge and substract from total rows
        int maxVal=0;
        for(int key:map.keySet()){
            maxVal=Math.max(maxVal,map.get(key));
        }
        return wall.size()-maxVal;
    }
}
