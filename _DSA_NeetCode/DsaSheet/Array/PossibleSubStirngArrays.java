package DsaSheet.Array;

import java.util.ArrayList;
import java.util.List;

public class PossibleSubStirngArrays {
    public static void main(String[] args) {
        String s="abcabcbb";
        System.out.println(subStrArrList(s));
    }

    static List<String> subStrArrList(String s){

        List<String> sList=new ArrayList<>();
        for(int i=0;i<s.length();i++){
            for(int j=i+1;j<=s.length();j++){
                sList.add(s.substring(i,j));
            }
        }
        return sList;
    }

    static List<String> recurrsionList(String s){

        List<String> sList=new ArrayList<>();

        if(s.length()==0){
            sList.add(s);
            return recurrsionList(s.substring(1));
        }
        
        return sList;
    }
}
