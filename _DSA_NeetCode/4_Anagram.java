import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

class GroupAnagram2 {

    public static void main(String[] args) {
        GroupAnagram2 groupAnagram2 = new GroupAnagram2();
        String[] arr = { "eat", "tea", "tan", "ate", "nat", "bat" };
        List<List<String>> lst = groupAnagram2.groupAnagrams(arr);
        for (List<String> lst1 : lst) {
            for (String s : lst1) {
                System.out.print(s + " ");
            }
            System.out.println();
        }

    }

    List<List<String>> groupAnagrams(String[] arr) {
        HashMap<String, List<String>> map = new HashMap<>(); // max O(n)

        for (String ele : arr) { // n
            // convert string to char array
            char[] charArr = ele.toCharArray(); // n*logn
            // sort the char array
            Arrays.sort(charArr); // n*logn
            // convert char array to string
            String s = new String(charArr);
            // check if the string is present in the map
            // if not present then add it
            if (!map.containsKey(s)) { // O(1)
                map.put(s, new ArrayList<>());
            }
            //check if the string is present in the map
            // if present then add the element to the list
            map.get(s).add(ele); // O(1)
        }

        // return the values of the map which is a list of strings
        return new ArrayList<>(map.values());
    }
}

// brute force solution
/*
  public List<List<String>> groupAnagrams(String[] strArr) {
  List<List<String >> lstInLst=new ArrayList<List<String>>();
  
  for(int i=0;i<strArr.length;i++){
  List<String> lst=new ArrayList<>();
  if(strArr[i]!=null){
  lst.add(strArr[i]);
  // boolean isOtherAnagramPresent=false;
  // find compliment if already then add to existing else add new but this will
  not work as it's not about single ele
  // but about all elements
  for(int j=i+1; j<strArr.length;j++){
  
  if(strArr[j]!=null && isAnagram(strArr[i],strArr[j])){
  lst.add(strArr[j]);
  strArr[j]=null;
  // isOtherAnagramPresent=true;
  }
  }// for end
  // if(!isOtherAnagramPresent)lst.add(strArr[i]);
  lstInLst.add(lst);
  }// if end
  
  }
  return lstInLst;
  }
  
  public boolean isAnagram(String s1, String s2){
  if(s1.length()!=s2.length())return false;
  Map<Character,Integer> s1Map=new HashMap<Character, Integer>();
  Map<Character,Integer> s2Map=new HashMap<Character, Integer>();
  
  
  for(int i=0;i<s1.length();i++){
  if(s1Map.containsKey(s1.charAt(i))){
  s1Map.put(s1.charAt(i),s1Map.get(s1.charAt(i))+1);
  }else {
  s1Map.put(s1.charAt(i),1);
  }
  if(s2Map.containsKey(s2.charAt(i))){
  s2Map.put(s2.charAt(i),s2Map.get(s2.charAt(i))+1);
  }else {
  s2Map.put(s2.charAt(i),1);
  }
  }
  
  // following will go through all the iterations
  for(int i=0;i<s1.length();i++){
  if(!s2Map.containsKey(s1.charAt(i)))return false;
  if(s2Map.get(s1.charAt(i))!=s1Map.get(s1.charAt(i)))return false;
 * }
 * 
 * return true;
 * }
 * 
 */