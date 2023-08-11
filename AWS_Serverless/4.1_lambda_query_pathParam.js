const greet={
    "en":'hello',
    "hi":'namste'
}

exports.handler=async(event)=>{
    let name= event.pathParameters.name;
    // let postData =event.input;
    let {lang, ...info}=event.queryStringParameters || {}; //...info : additional params by user

    let message =`${greet[lang] ? greet[lang] :greet['en']} ${name}`;
    let response={
        message:message,
        info:info,
        timestamp : moment().unix()
    }
    return {
        satusCode:200,
        headers:{ 
            "Access-Control-Allow-origin":"*"     // access to all sites
        },
        body:JSON.stringify(response)
    }
}