

//--------- AWS.DynamoDB vs AWS.DynamoDB.DocumetClient --------------

// AWS.DynamoDB.DocumetClient() : both are used for same
// purpose
// - used for query over items and is simple
// - DynamoDb internal data types are mapped with00
//   javascripts data type so while working we can
//   use js data types instead of DynamoDB data
//   type 
// 

const AWS = require('aws-sdk');
AWS.config.update({
    region:"us-west-2",
    accessKeyId:"",
    secretAccessKey:""
})
const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

// -----------------------------------------
  //                PUT : can INSERT/Update
//--------------- using DynamoDB()------------
var params = {
    Item: {
        user_id: {
            "S": cdbUserId.toString()
        },
        course_master_code: {
            "S": course_master_code
        },
        course_code: {
            "S": course_code
        },
        prescribe_ts: ts,
        available_ts: ts,
        factor: {
            "M": {
                "type": {
                    "S": factorType
                }
            }
        }
    },
    TableName: "tableNames"
};
dynamodb.putItem(params).promise();

//------------- using DocumentClient() -----------

var params = {
    Item: {
        user_id: parseInt(userId),
        course_master_code: masterProductCode,
        course_code: productCode,
        last_complete_ts: completeOn,
        complete_ts: completeOn,
    },
    TableName: "tableNAme"
};
docClient.put(params, function (err, data) { // can use promise and await as well
    if (err) {
        console.error(
            "Unable to insert item. Error JSON:",
            JSON.stringify(err, null, 2)
        );
    } else {
         console.log(data.Attributes);
    }
});