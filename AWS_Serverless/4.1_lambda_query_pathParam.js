const greet={
    "en":'hello',
    "hi":'namste'
}

exports.handler=async(event)=>{
    let name= event.pathParameters.name;
    let {lang, ...info}=event.queryStringParameters; //...info : additional params by user

    let message =`${greet[lang] ? gree[lang] :greet['en']} ${name}`;
    let response={
        message:message,
        info:info,
        timestamp : moment().unix()
    }
    return {
        satusCode:200,
        body:JSON.stringify(response)
    }
}