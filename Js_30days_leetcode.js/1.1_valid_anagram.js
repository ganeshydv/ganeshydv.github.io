
function validanagram2(s, t) {
    if (s.length !== t.length) {
        return false;
    }
    let s1 = s.split('').sort().join('');
    let t1 = t.split('').sort().join('');
    return s1 === t1;
}

function validanagram(s,t){
    if(s.length!=t.length)return false;
    let sum=0;
    
    for(let i=0;i<s.length;i++){
        sum+=s.charCodeAt(i);
        sum-=t.charCodeAt(i);
    }
    return sum==0;
}

console.log(validanagram("bb", "ac")); //true


/*

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        
    }

    boolean isAnagram(String s,String t){
        if(s.length()!=t.length())return false;
        Map<char,Integer> map=new HashMap<>();
        Map<char,Integer> map2=new HashMap<>();

        for(int i=0;i<s.kength();i++){
            if(map.containsKey(s.charAt(i))){
                map.put(map. map.get(s.charAt(i))+1;
            }else{
                map.put(s.charAt(i),1);
            }

            if(map2.conatainsKey(t.charAt(i))){
                map.
            }

        }
    }
}
*/