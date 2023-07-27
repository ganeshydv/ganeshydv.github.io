
const path = require("path")
const fs = require("fs");

const sequenceSubFoldersPathObjects = [{ "apps": ["defender/v1/", "mentor_business/v1/", "mentor_insight/v1/"] }, { "groups": ["g_mentor_adaptive/", "g_mentor_adaptive_bayer_africa/", "g_mentor_adaptive_edriving/", "g_mentor_adaptive_insight_bms/", "g_mentor_adaptive_insight_viatris/", "g_mentor_cba/"] }];
const weekSeqJsonFilePath = ["orientation.json", "week2.json", "week2_adaptive_acceleration.json", "week2_adaptive_braking.json", "week2_adaptive_cornering.json", "week2_adaptive_distraction.json", "week2_adaptive_speeding.json", "week3.json", "week4.json"];

// C:/Users/GGurkhude/Desktop/sls-playlsit-cron-job/src/handlers/data/sequences
function insertOrderPropertyInRules() {
    let jsonFormatData = {};
    for (const seqSubFolderObject of sequenceSubFoldersPathObjects) { // main folders : 1) apps 2) groups 
        // console.log(seqSubFolderObject);
        for (const subFolder in seqSubFolderObject) {      // take key from Object    EX: apps 
            // console.log(subFolder);
            for (const path of seqSubFolderObject[subFolder]) {    // main subfolder ex: defender/v1/
                // console.log(subFolder + "/" + path);
                let seqSubFolderPath = subFolder + "/" + path;
                // console.log(seqSubFolderPath);

                for (const seqJsonFile of weekSeqJsonFilePath) {       // for week
                    if (!jsonFormatData[seqJsonFile]) {
                        jsonFormatData[seqJsonFile] = [];
                    }
                    let completeSeqPath = "C:/Users/GGurkhude/Desktop/sls-playlsit-cron-job/src/handlers/data/sequences/" + seqSubFolderPath;
                    let completeSeqPathForCar = completeSeqPath + seqJsonFile;
                    // console.log(completeSeqPathForCar);
                    if (fs.existsSync(completeSeqPathForCar)) {           // check if JSON file exists for car type
                        // console.log(completeSeqPathForCar);
                        try {
                            // console.log("car data: ");
                            let data = fs.readFileSync(completeSeqPathForCar, "utf-8");
                            data = JSON.parse(data);
                            if (jsonFormatData.length === 0) {
                                jsonFormatData[seqJsonFile].push(data);
                            } else {
                                data.filter((ele, index, arrCopy) => {
                                    // if(!(ele in jsonFormatData[seqJsonFile])){
                                    //     jsonFormatData[seqJsonFile].push( ele );
                                    // }
                                    let isPresent = false;
                                    for (let val of jsonFormatData[seqJsonFile]) {
                                        if (ele["masterProductCode"] === val["masterProductCode"]) {
                                            isPresent = true;
                                        }
                                    }
                                    if (!isPresent) {
                                        jsonFormatData[seqJsonFile].push(ele)
                                    }
                                    // jsonFormatData[seqJsonFile]=jsonFormatData[seqJsonFile].filter((JsonEleArr,eleIndex,eleCopy)=>{
                                    //     if(!(ele in JsonEleArr)){

                                    //     }
                                    // })
                                })
                            }



                            // }
                        } catch (error) {
                            console.log("Error while reading JSON file for car Type " + error);
                        }


                    }
                    let completeSeqPathForTwoWheels = completeSeqPath + "two-wheels/" + seqJsonFile;
                    // console.log(completeSeqPathForTwoWheels);

                    if (fs.existsSync(completeSeqPathForTwoWheels)) {         // check if JSON file exists for two-wheels 
                        // console.log(completeSeqPathForTwoWheels)
                        try {
                            let data = fs.readFileSync(completeSeqPathForTwoWheels, 'utf-8');
                            data = JSON.parse(data);// array of objects
                            data.filter((ele, index, arrCopy) => { // each object
                                let isPresent = false;
                                for (let val of jsonFormatData[seqJsonFile]) {
                                    if (ele["masterProductCode"] === val["masterProductCode"]) {
                                        isPresent = true;
                                    }
                                }
                                if (!isPresent) {
                                    jsonFormatData[seqJsonFile].push(ele)
                                }
                            })


                        } catch (error) {
                            console.log("Error while reading JSON file for Two-Wheels Type " + error);
                        }

                    }

                }

            }
        }
    }
    let updatedJsonFormat = JSON.stringify(jsonFormatData, null, 2);
    try {
        fs.writeFileSync("C:/Users/GGurkhude/Desktop/newSeq/sequences/allMasterProductCodes.json", updatedJsonFormat, "utf-8")
    } catch (error) {
        console.log("Error while writing JSON file for Two-wheels Type " + error);
    }
}

insertOrderPropertyInRules();
