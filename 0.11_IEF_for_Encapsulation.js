// let Person =(function(){
//     let name="tony";
//     let age=20;
//     function getAge(){return age}
//     function getNAme(){return name}

//     return {
//         getAge:getAge,
//         getName:getNAme
//     }

// }())

// console.log()



var Config = (function() {
    var apiKey;
    var apiUrl;
  
    function setApiKey(key) {
      apiKey = key;
    }
  
    function setApiUrl(url) {
      apiUrl = url;
    }
  
    function getApiKey() {
      return apiKey;
    }
  
    function getApiUrl() {
      return apiUrl;
    }
  
    return {
      setApiKey: setApiKey,
      setApiUrl: setApiUrl,
      getApiKey: getApiKey,
      getApiUrl: getApiUrl
    };
  })();
  
  Config.setApiKey('7890');
  Config.setApiUrl('https://api.example.com/v2');
  
  console.log(Config.getApiKey()); // Output: 7890
  console.log(Config.getApiUrl()); // Output: https://api.example.com/v2



//   so this function can be used for encapsulation purpose

// ChatGPT
// Yes, the function in the Immediately Invoked Function Expression (IIFE) pattern can be used for encapsulation purposes. The IIFE allows you to create a private scope within which you can define variables and functions that are not accessible from the outside, effectively encapsulating them.

// By exposing only the necessary functions or variables through the returned object, you can control the interface and provide access to specific functionalities while keeping the internal implementation hidden.

// This encapsulation helps prevent naming conflicts with other code in the global scope and promotes modular and organized code structure.

// Additionally, encapsulation allows you to hide implementation details and protect sensitive data or logic, making it more secure
  