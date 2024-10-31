// // import moment from "moment-timezone";
// // import Axios from "axios";
// // import Config from "./../config";
// // var fs = require("fs");
// // var util = require("./../utils");
// // var config = Config();
// // var logger;
// // var getLogger = require("./../bl/logger_bl").Logger;

// // const LOGEVENT_EMAIL_SENT = "LOGEVENT_EMAIL_SENT";
// // const LOGEVENT_FAILED = "LOGEVENT_FAILED";

// // const EMAIL_RECEIPIENTS_AMZLMM = config.EMAIL_RECEIPIENTS_AMZLMM;
// // const EMAIL_RECEIPIENTS_AMZL_EU = config.EMAIL_RECEIPIENTS_AMZL_EU;


// // var cron_dl = require("./../da/cronjobStatusDa");

// // const job_name = "email_amazon_daily_damage_by_distributor";


// // const FLEET_PROVISION_ENDPOINT = config.FLEET_PROVISIONING_ENDPOINT.DEFAULT;
// // const DVCR_ENDPOINT = config.MENTOR_DVIR_ENDPOINT;

// // const DEFAULT_TIMEZONE = "Europe/London"; //TODO: change to uk


// // /**
// //  * 
// //  * @param {*} distributor 
// //  * @param {*} dateString YYYYMMDD
// //  */
// // async function handleDistributor(distributor, dateString){
// //   console.log(distributor)

// //   // HARD CODED FOR NOW

// //   // distributor='IDS'
// //   var companies = await Axios.get(
// //     FLEET_PROVISION_ENDPOINT + "/v1/companies?distributor=" + distributor
// //   );
// //   // // companies=[2,10000078,29]
// //   // // hard coded for now
// //   companies={
// //     data:[{
// //       id:2,
// //       "createdAt": 1683641561,
// //       "updatedAt": false,
// //       // "id": 0,
// //       "name": "Spit Test",
// //       "billingAdmin": [],
// //       "distributor": null,
// //       "isoCountryCode": null,
// //       "code": null
// //     },
// //     // {
// //     //   id:10000078,
// //     //   code:'test'
// //     // },{
// //     //   id:29,
// //     //   code:'test'
// //     // }
// //   ]
// //   }

// //   var data = ['DSP,Station,Vehicle,Report Type,Report Time,Severity,Category,Comment,Trailer ID'];

// //   for (var i = 0; i < companies.data.length; i++) {
// //     try {
      
// //       var companyProfile;
// //       try {
// //         companyProfile = await Axios.get(
// //           FLEET_PROVISION_ENDPOINT +
// //             `/api/v1/companies/${companies.data[i].id}/appProfile`
// //         );
// //         // hard coded for now
// //         // companyProfile={ data: {
// //         //   "createdAt": 1692921600,
// //         //   "updatedAt": 0,
// //         //   "ownerId": "2",
// //         //   "type": "COMPANY",
// //         //   "timezone": "America/New_York",
// //         //   "platform": "VRM1",
// //         //   "language": "en",
// //         //   "applicationCode": "Mentor_Business",
// //         //   "countryCode": "US",
// //         //   "billing": "NORMAL",
// //         //   "expirationPolicy": 90,
// //         //   "accessCode": null,
// //         //   "entitlements": null
// //         // }
// //       // }
// //       } catch (e) {
// //         console.log("get company app profile failed, ", companies.data[i].id);
// //       }

// //       console.log(
// //         "-------------  company " + companies.data[i].id,
// //         companies.data[i].code, companyProfile ? companyProfile.data.timezone : DEFAULT_TIMEZONE
// //       );

// //       var groups = await Axios.get(
// //         FLEET_PROVISION_ENDPOINT +
// //           `/v1/companies/${companies.data[i].id}/groups`
// //       );

// //       // hard coded for now this is station data related to company id = 2
// //       groups={
// //         data:[
// //         {
// //             "createdAt": 1557960800,
// //             "updatedAt": 1557960800,
// //             "id": 1773,
// //             "name": "MED1",
// //             "companyId": 2,
// //             "parentGroupId": null,
// //             "code": "MED1",
// //             "allowSubgroup": true,
// //             "status": "ACTIVE"
// //         },
// //         {
// //             "createdAt": 1557960800,
// //             "updatedAt": 1557960800,
// //             "id": 1774,
// //             "name": "PHR1",
// //             "companyId": 2,
// //             "parentGroupId": null,
// //             "code": "PHR1",
// //             "allowSubgroup": true,
// //             "status": "ACTIVE"
// //         },
// //         {
// //             "createdAt": 1557960800,
// //             "updatedAt": 1557960800,
// //             "id": 1775,
// //             "name": "AMO1",
// //             "companyId": 2,
// //             "parentGroupId": null,
// //             "code": "AMO1",
// //             "allowSubgroup": true,
// //             "status": "ACTIVE"
// //         },
// //         {
// //             "createdAt": 1568185217,
// //             "updatedAt": 1568185217,
// //             "id": 2986,
// //             "name": "CON1",
// //             "companyId": 2,
// //             "parentGroupId": null,
// //             "code": "CON1",
// //             "allowSubgroup": true,
// //             "status": "ACTIVE"
// //         },
// //         {
// //             "createdAt": 1655405930,
// //             "updatedAt": 1655405930,
// //             "id": 2105765,
// //             "name": "Test",
// //             "companyId": 2,
// //             "parentGroupId": null,
// //             "code": "Test",
// //             "allowSubgroup": false,
// //             "status": "ACTIVE"
// //         },
// //         {
// //             "createdAt": 1677520828,
// //             "updatedAt": 1677520828,
// //             "id": 3641044,
// //             "name": "NOP1",
// //             "companyId": 2,
// //             "parentGroupId": null,
// //             "code": "NOP1",
// //             "allowSubgroup": false,
// //             "status": "ACTIVE"
// //         }
// //     ]}
// //       var groupDataMap = {};
// //       // mapping station id to station name
// //       for (var x = 0; x < groups.data.length; x++) {
// //         groupDataMap[groups.data[x].id] = {
// //           name: groups.data[x].name,
// //         };
// //       }

// //       var now = moment(dateString, "YYYYMMDD")
// //         .tz(companyProfile ? companyProfile.data.timezone : DEFAULT_TIMEZONE);
// //       var start = now.startOf("day").unix() * 1000;
// //       var end = now.endOf("day").unix() * 1000;

      
// //       console.log(dateString, start, end)

// //       try {
// //         //let say company id = 2
       
// //         // hard coded for now
// //         start = 1555539616769;
// //         end = 1572543784556;
        
// //         console.log(
// //           DVCR_ENDPOINT +
// //             `/v1/damageDetails/company/${companies.data[i].id}?startTime=${start}&endTime=${end}`
// //         );
// //         var damageData = await Axios.get(
// //           DVCR_ENDPOINT +
// //             `/v1/damageDetails/company/${companies.data[i].id}?startTime=${start}&endTime=${end}`
// //         );

// //         // var translationData = await Axios.get(
// //         //   DVCR_ENDPOINT + ("/v1/dynamicForms/" +
// //         //   companies.data[i].id + "?startTime=" + start + "&endTime=" + end));


// //         var postDvirsMap={};
// //         damageData.data
// //           .filter(d=>d.report_type_is_post)
// //           .map((d) => {
// //             postDvirsMap[d.pre_id]=d;
// //           });

// //         var d = damageData.data
// //           .filter(d=>!d.report_type_is_post)
// //           .map((d) => {
// //             var post = postDvirsMap[d.id];
// //             return `${companies.data[i].code},${
// //               groupDataMap[d.group_id].name
// //             },${d.user_id},"${d.vin}",${d.local_date},${d.severity1_count},${d.severity2_count},${post?post.local_date:''},${post?post.severity1_count:''},${post?post.severity2_count:''}`;
// //           });
        
// //         data = data.concat(d);
// //       } catch (e) {
// //         console.log(e.message);
// //       }

// //     } catch (e) {
// //       console.log(e);
// //       logger.info({
// //         event: LOGEVENT_FAILED,
// //         companyId: companies.data[i].id,
// //         error: e,
// //       });
// //     }
// //   }
// //   if(data.length>1){
// //     var fileName = `Damage_${distributor}_${dateString}.csv`;
// //     fs.writeFileSync(fileName, data.join("\n"));
// //     console.log("file created", fileName)
// //     return fileName;
// //   }else{
// //     return null;
// //   }
// // }


// // export default {


// //   run: async function (distributor) {
// //     var started_at;
// //     console.log("distributor", distributor);
// //     // logger = await getLogger("email_amazon_daily_damage_by_distributor.log");
// //     // try {
// //     //   started_at = moment().format("YYYY-MM-DD HH:mm:ss");
// //     //   // await cron_dl.createCronJobStatus(job_name, started_at);
// //     // } catch (e) {
// //     //   console.log(job_name, " createCronJobStatus error:", e);
// //     // }


  
// //     var now = moment().tz(DEFAULT_TIMEZONE).add(-1, "day");
// //     var dateString = now.format("YYYYMMDD");
// //     console.log(dateString);
  
// //     var distributors = ["amzlmm_de","amzlmm_at","amzlmm_uk","amzlmm_es","amzlmm_it","amzlmm_fr"];
// //     var files = [];
// //     for(var i=0;i<distributors.length;i++){
// //       try{
// //         var f = await handleDistributor(distributors[i],dateString);
// //         if(f) files.push(f);
// //       }catch(e){
// //         console.log(e);
// //       }
// //     }

// //     var result = await util.sendEmailWithMultiAttachmentsSync(
// //       EMAIL_RECEIPIENTS_AMZLMM,
// //       `Damage Summary – MM DVCR App`,
// //       files
// //     );

// //     // logger.info({
// //     //   event: LOGEVENT_EMAIL_SENT,
// //     //   distributors: distributors,
// //     //   files: files,
// //     //   result: result
// //     // });



// //     // distributors = ["amzl_eu_at","amzl_eu_be","amzl_eu_ie","amzl_eu_nl"];
// //     // files = [];
// //     // for(var i=0;i<distributors.length;i++){
// //     //   try{
// //     //     var f = await handleDistributor(distributors[i],dateString);
// //     //     if(f) files.push(f);
// //     //   }catch(e){
// //     //     console.log(e);
// //     //   }
// //     // }

// //     // var result = await util.sendEmailWithMultiAttachmentsSync(
// //     //   EMAIL_RECEIPIENTS_AMZL_EU,
// //     //   `Damage Summary – US Mentor App`,
// //     //   files
// //     // );

// //     // logger.info({
// //     //   event: LOGEVENT_EMAIL_SENT,
// //     //   distributors: distributors,
// //     //   files: files,
// //     //   result: result
// //     // });

// //     try {
// //       var finished_at = moment().format("YYYY-MM-DD HH:mm:ss");
// //       await cron_dl.updateFinishTime(job_name, started_at, finished_at);
// //       console.log(job_name, " updateFinishTime success", started_at, finished_at);
// //     } catch (e) {
// //       console.log(job_name, " updateFinishTime error:", e);
// //     }
// //     return true;
// //   },
// // };


// //-----------------------2 hard coded working ---------

// import moment from "moment-timezone";
// import Axios from "axios";
// import Config from "./../config";
// import { report } from "process";
// var fs = require("fs");
// var util = require("./../utils");
// var config = Config();
// var logger;
// var getLogger = require("./../bl/logger_bl").Logger;

// const LOGEVENT_EMAIL_SENT = "LOGEVENT_EMAIL_SENT";
// const LOGEVENT_FAILED = "LOGEVENT_FAILED";

// // const EMAIL_RECEIPIENTS_AMZLMM = config.EMAIL_RECEIPIENTS_AMZLMM;
// const EMAIL_RECEIPIENTS_AMZL_US = config.EMAIL_RECEIPIENTS_AMZL_US;


// var cron_dl = require("./../da/cronjobStatusDa");

// const job_name = "email_amazon_daily_damage_by_distributor";


// const FLEET_PROVISION_ENDPOINT = config.FLEET_PROVISIONING_ENDPOINT.DEFAULT;
// const DVCR_ENDPOINT = config.MENTOR_DVIR_ENDPOINT;

// const DEFAULT_TIMEZONE = "America/New_York";


// /**
//  * 
//  * @param {*} distributor 
//  * @param {*} dateString YYYYMMDD
//  */
// async function handleDistributor(distributor, dateString) {
//   // hardcoded for now--------------
//   distributor = 'IDS Global';
//   //-------------------------------
//   console.log(distributor)

//   // var companies = await Axios.get(
//   //   FLEET_PROVISION_ENDPOINT + "/v1/companies?distributor=" + distributor
//   // );
//   var companies = {
//     data: [
//       {
//         "id": 2,
//         "code": "IDS Global",
//         "name": "IDS Global",
//         "distributor": "IDS Global",
//         "created_at": "2020-10-16T18:29:33.000Z",
//         "updated_at": "2020-10-16T18:29:33.000Z"
//       }
//     ]

//   }
//   var data = ['DSP,Station,Vehicle,Report Type,Report Time,Severity,Category,Comment,Trailer ID'];

//   for (var i = 0; i < companies.data.length; i++) {
//     try {

//       var companyProfile;
//       try {
//         // companyProfile = await Axios.get(
//         //   FLEET_PROVISION_ENDPOINT +
//         //   `/v1/companies/${companies.data[i].id}/appProfile`
//         // );

//         companyProfile = {
//           data: { 
//             timezone: "America/New_York"
//           }
//         }


//       } catch (e) {
//         console.log("get company app profile failed, ", companies.data[i].id);
//       }

//       console.log(
//         "-------------  company " + companies.data[i].id,
//         companies.data[i].code, companyProfile ? companyProfile.data.timezone : DEFAULT_TIMEZONE
//       );


//       // hard coded ---------------------
//       companies.data[i]['id'] = 2;
//       //-----------------------------------------
//       // for station name
//       // var groups = await Axios.get(
//       //   FLEET_PROVISION_ENDPOINT +
//       //   `/api/v1/companies/${companies.data[i].id}/groups`
//       // );
//       var groups = {
//         data:[
//           {
//               "createdAt": 1557960800,
//               "updatedAt": 1557960800,
//               "id": 1779,
//               "name": "MED1",
//               "companyId": 2,
//               "parentGroupId": null,
//               "code": "MED1",
//               "allowSubgroup": true,
//               "status": "ACTIVE"
//           }
//       ]
//       }

//       var groupDataMap = {};
//       // mapping station id to station name
//       for (var x = 0; x < groups.data.length; x++) {
//         groupDataMap[groups.data[x].id] = {
//           name: groups.data[x].name,
//         };
//       }

//       var now = moment(dateString, "YYYYMMDD")
//         .tz(companyProfile ? companyProfile.data.timezone : DEFAULT_TIMEZONE);
//       var start = now.startOf("day").unix() * 1000;
//       var end = now.endOf("day").unix() * 1000;

//       console.log(dateString, start, end)

//       try {

//         console.log(
//           DVCR_ENDPOINT +
//           `/v1/damageDetails/company/${companies.data[i].id}?startTime=${start}&endTime=${end}`
//         );
//         var damageData = await Axios.get(
//           DVCR_ENDPOINT +
//           `/v1/damageDetails/company/${companies.data[i].id}?startTime=${start}&endTime=${end}`
//         );


//         damageData ={
//           data:
//         [
//           {
//             "id": 67207356,
//             "vin": "1233444",
//             "user_id": "321152410",
//             "report_type_is_post": 0,
//             "report_date": "2023-10-16T18:29:32.000Z",
//             "group_id": "20327",
//             "max_severity": 1,
//             "version": "DVCR_008_02",
//             "created_at": "2023-10-16T18:29:33.000Z",
//             "updated_at": "2023-10-16T18:29:34.000Z",
//             "categories": [
//               {
//                 "id": 16350,
//                 "s3key": "dvir_67207356_TIRE-RIMS_BENDS_BIKE_NOT_STEER.jpg",
//                 "dvir_id": 67207356,
//                 "photoUrl": "https://edriving-staging-mentor-dvir.s3.us-west-2.amazonaws.com/dvir_67207356_TIRE-RIMS_BENDS_BIKE_NOT_STEER.jpg",
//                 "comment": "",
//                 "predefined_comments": "TIRE-RIMS_BENDS_BIKE_NOT_STEER",
//                 "severity": 1,
//                 "category_name": "TIRE",
//                 "created_at": "2023-10-16T18:29:34.000Z",
//                 "updated_at": "2023-10-16T18:29:34.000Z"
//               }
//             ],
//             "categories_texts": [
//               {
//                 "TRAILER-ENTER_ID": "54433333"
//               }
//             ]
//           },
//           {
//             "id": 67207357,
//             "vin": "1233444",
//             "user_id": "321152410",
//             "report_type_is_post": 1,
//             "report_date": "2023-10-16T18:32:38.000Z",
//             "group_id": "20327",
//             "max_severity": 1,
//             "version": "DVCR_008_02",
//             "created_at": "2023-10-16T18:32:38.000Z",
//             "updated_at": "2023-10-16T18:32:39.000Z",
//             "categories": [
//               {
//                 "id": 16351,
//                 "s3key": "",
//                 "dvir_id": 67207357,
//                 "photoUrl": "",
//                 "comment": "",
//                 "predefined_comments": "TIRE-RIMS_BENDS_BIKE_NOT_STEER",
//                 "severity": 1,
//                 "category_name": "TIRE",
//                 "created_at": "2023-10-16T18:32:39.000Z",
//                 "updated_at": "2023-10-16T18:32:39.000Z"
//               },
//               {
//                 "id": 16352,
//                 "s3key": "",
//                 "dvir_id": 67207357,
//                 "photoUrl": "",
//                 "comment": "",
//                 "predefined_comments": "RIDING_OPERATIONS-BIKE_PULL_ONE_SIDE_WHILST,RIDING_OPERATIONS-BIKE_FEEL_UNSTABLE_NORMAL",
//                 "severity": 1,
//                 "category_name": "RIDING_OPERATIONS",
//                 "created_at": "2023-10-16T18:32:39.000Z",
//                 "updated_at": "2023-10-16T18:32:39.000Z"
//               }
//             ],
//             "categories_texts": [
//               {
//                 "TRAILER-ENTER_ID": "54433333"
//               }
//             ]
//           }
//         ]
//       }
//         var d = damageData.data
//           .map((d) => {
//             // for test
//             if (!d.group_id) d.group_id = "test";

//             var reportType= d.report_type_is_post ? 'Post' : 'Pre';
//             var damageReport=d.categories.map((c) => {
//               return `${companies.data[i].code},${groupDataMap[d.group_id].name},${d.vin},${reportType},${d.report_date},${c.severity},${c.category_name},${c.comment},${d.categories_texts[0]['TRAILER-ENTER_ID']}`
//             })

//             data = data.concat(damageReport);
//           });

//       } catch (e) {
//         console.log(e.message);
//       }

//     } catch (e) {
//       console.log(e);
//       logger.info({
//         event: LOGEVENT_FAILED,
//         companyId: companies.data[i].id,
//         error: e,
//       });
//     }
//   }// for end
//   if (data.length > 1) {
//     var fileName = `Damage_${distributor}_${dateString}.csv`;
//     fs.writeFileSync(fileName, data.join("\n"));
//     console.log("file created", fileName)
//     return fileName;
//   } else {
//     return null;
//   }
// }


// export default {


//   run: async function (distributor) {
//     var started_at;
//     console.log("distributor", distributor);
//     logger = await getLogger("email_amazon_daily_damage_by_distributor.log");
//     try {
//       started_at = moment().format("YYYY-MM-DD HH:mm:ss");
//       // await cron_dl.createCronJobStatus(job_name, started_at);
//     } catch (e) {
//       console.log(job_name, " createCronJobStatus error:", e);
//     }

//     var now = moment().tz(DEFAULT_TIMEZONE).add(-1, "day");
//     var dateString = now.format("YYYYMMDD");
//     console.log(dateString);

//     var distributors = ["amzlmm_us"];
//     var files = [];
//     for (var i = 0; i < distributors.length; i++) {
//       try {
//         var f = await handleDistributor(distributors[i], dateString);
//         if (f) files.push(f);
//       } catch (e) {
//         console.log(e);
//       }
//     }

//     var result = await util.sendEmailWithMultiAttachmentsSync(
//       EMAIL_RECEIPIENTS_AMZL_US,
//       `Damage Summary – MM DVCR App`,
//       files
//     );

//     logger.info({
//       event: LOGEVENT_EMAIL_SENT,
//       distributors: distributors,
//       files: files,
//       result: result
//     });


//     try {
//       var finished_at = moment().format("YYYY-MM-DD HH:mm:ss");
//       await cron_dl.updateFinishTime(job_name, started_at, finished_at);
//       console.log(job_name, " updateFinishTime success", started_at, finished_at);
//     } catch (e) {
//       console.log(job_name, " updateFinishTime error:", e);
//     }
//     return true;
//   },
// };


// Shannon.Feltwell@edriving.com,Laura.Paltrinieri@edriving.com,Lauren.Wisdom@edriving.com,Michele.Fogarty@edriving.com,Denisa.Procopiu@edriving.com,Rania.Tsakmakidou@edriving.com,Younes.Salhane@edriving.com