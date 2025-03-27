const AWS =require('aws-sdk');

AWS.config.update({region:"us-west-2"})
AWS.config.update(
    {
        accessKeyId:"",
        secretAccessKey:""
    })

const DynamoDB =new AWS.DynamoDB();

// list existing DB and describe 
async function list_describe_Tables(){
    let tables;
    let tableDescription={};
    try {
        tables=await DynamoDB.listTables({}).promise();//{TableNames: [table1,...]}
        tables.TableNames.forEach(async(ele)=>{
            let tablesDesc;
            try {
                tablesDesc=await DynamoDB.describeTable(ele).promise()
            } catch (error) {
                
            }
            if(!tableDescription[ele]){
                tableDescription[ele]=tablesDesc;
            }
        })
    } catch (error) {
        
    }
    return tableDescription;
}
// -------------------create table-----------------------

async function createTable(){
    schema1 = {
        TableName:"",
        AttributeDefinations:[
            {
                AttributeName:"xyz",
                AttributeType:"S"
            },{
                AttributeName:"abc",
                AttributeType:"N"
            }
        ],
        KeySchema:[
            {
                AttributeName:"xyz",
                KeyType:"HASH"
            },{
                AttributeName:"abc",
                KeyType:"RANGE"
            }
        ],
        ProvisionedThroughPut:{
            ReacCapacityUnit:"1",
            WriteCapacityUnit:"1"
        }
    }
    let table=await DynamoDB.createTable(schema1).promise();
    console.log(JSON.stringify(table));
}
//--------------- Update --------------------------------
async  function updateTableNotItem(){
    DynamoDB.updateTable({
        TableName:"tableName",
        ProvisionedThroughput:{
            ReadCapacityUnits:3,
            WriteCapacityUnits:1
        }
    },(err,data)=>{
        console.log(err?err:data);
    })
}
//--------------- Delete Table --------------------------------
function deleteTableable(){
    DynamoDB.deleteTable({
        TableName:"tableName",
    },(err,data)=>{
        console.log(JSON.stringify(data,null,2));
    })
}