

// get using fetch:

fetch("url").then(data=>{
    return data.json();    // fetch always return a "STRING"
;});

// post uinsg fetch :
// can send different form of data JSON, Binary, XML , etc.
let data={};
fetch("url",{
    method:"POST",
    body:JSON.stringify(data) // converting DATA in JSON format
}).then(data=>{

})

// HEADERS in FETCH 
fetch("url",{
    method:"POST",
    body:JSON.stringify(data), // converting DATA in JSON format
    headers:{
        'Content-Type':'application/json',
    }
}).then(data=>{

})
// content-type:
// what kind of data is sent from client to server
// When sending data in a request, the Content-Type header specifies the type
// of data being sent, such as JSON (application/json), 
//form data (application/x-www-form-urlencoded), or
// file uploads (multipart/form-data).

// Accept-Encoding : Ex: gzip
//from Clinet --> Content-Encoding in response : from SERVER
// What FORMAT of DATA CLIENT can UNDERSTAND or expecting 
//The Accept-Encoding header is a request header that informs the server about the compression algorithms supported by the client. 
//It specifies the encoding schemes that the client can understand and process in the response body.