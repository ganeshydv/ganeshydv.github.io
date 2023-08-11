
// 1) AWS.config.update({
//     region:""
// })

// 2) create dynamodb instance or S3 instance
//    new AWS.DynamoDB();
//    new AWS.S3();
// S3: has artay of record we need to map to process it

// Create S3 bucket and then create configure it to trigger
// lambda function that lambda function takes all s3 .jpg 
// files and resizes them and saves into new s3 bucket

// IMP:
// configure source s3 bucket so when ever something is added it will trigger
// the lambda function -> 2 ways by serverless or using console add event to 
// from bucket to listen to only jpg type (suffix)--> send to


const util = require("util");
const AWS =require('aws-sdk');
const fs = require('fs');
const readFileAsync = util.promisify(fs.readFile); 
// promisify() used to convert callback based function to promise-based 
//function
const unlinkAsync = util.promisify(fs.unlink);

AWS.config.update({
    region:"us-west-2"
})
 
const s3= new AWS.S3();

const handler = async(event)=>{
    let filesProcessed = event.Records.map(async (record)=>{
        let bucket =record.s3.bucket.name;
        let filename = record.s3.object.key;

        // get file from s3

        var params ={
            Bucket :bucket,
            Key : filename
        };

        // can use callback or promise for this function
        // s3.getObject(params,(err,data)=>{});
        // s3.getObject(params).promise().then((data)=>{

        // })
        let inputData = await s3.getObject(params).promise();

        // resize file
        let tempFile = os.tmpdir()+ '/' + uuidv4() + ".jpg"
        // read resized file 
        let resizedData =readFileAsync (tempFile);

        // upload new file to S3
        let targetFileName =filename.substring(0,filename.lastIndexOf('.'))+'-small.jpg'

        var params = {
            Bucket :bucket+ '-dest',
            Key :targetFileName,
            Body :new Buffer(resizedData),
            ContentType : 'image/jpg'
        }
        await s3.putObject(params).promise();
        return await unlinkAsync(tempFile);

    })

    await Promise.all(filesProcessed);
    return "done";
}

//--------------------upload code zip to s3 -----------------------------------------
// upload file to s3 using CMD after configuring s3 to trigget EVENT

// aws s3 cp zipFIleNAme s3://bucketName/targetFileNAme

// --------------------run lambda function------------------------------------------
// aws lambda update-function-code --function-name functionName 
// --s3-bucket bucketName --s3-key resize nameOfTHeZipFle.zip