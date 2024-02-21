function isAnagram(s, t) {
    if(s.length!=t.length)return false;
    let hash1={};
    let hash2={};

    for(let i=0;i<s.length;i++){
        if(hash1[s.charAt(i)]){
            hash1[s.charAt(i)]+=1;
        }else{
            hash1[s.charAt(i)]=1;
        }
        if(hash2[t.charAt(i)]){
            hash2[t.charAt(i)]+=1;
        }else{
            hash2[t.charAt(i)]=1;
        }
    }
    for(let i=0;i<s.length;i++){
        if(!hash2[s.charAt(i)])return false;
        if(hash1[s.charAt(i)]!=hash2[s.charAt(i)])return false;
        
    }

return true;
    
    
};

console.log(isAnagram("anagram","nagaram"));