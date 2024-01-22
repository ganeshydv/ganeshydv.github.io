
const path = require("path")
const fs = require("fs");

const filePaths = ["./sequences/apps/mentor_business/v1/week3.json"];

const sequenceSubFoldersPath = [{ "apps": ["defender/v1/", "mentor_business/v1/", "mentor_insight/v1/"] }, { "groups": ["g_mentor_adaptive/", "g_mentor_adaptive_bayer_africa/", "g_mentor_adaptive_edriving/", "g_mentor_adaptive_insight_bms/", "g_mentor_adaptive_insight_viatris/", "g_mentor_cba/"] }];
// const jsonFileNames=["orientation.json","week2.json","week3.json"];
const weekSeqpath = ["orientation.json", "week2.json", "week2_adaptive_acceleration.json", "week2_adaptive_braking.json", "week2_adaptive_cornering.json", "week2_adaptive_distraction.json", "week2_adaptive_speeding.json", "week3.json"];


function insertOrderPropertyInRules(){
    for (const seqSubFolder of sequenceSubFoldersPath) { // main folders : 1) apps 2) groups
        // console.log(seqSubFolder);
        for (const subFolder in seqSubFolder) {      // take key from Object    
            console.log(subFolder);
            for (const path of seqSubFolder[subFolder]) {    // main subfolder ex: apps/defender/v1/
                // console.log(subFolder + "/" + path);
                let seqSubFolderPath = subFolder + "/" + path;
                console.log(seqSubFolderPath);
    
                for (const seqJsonFile of weekSeqpath) {       // for week-2 adaptive
                    let completeSeqPath = "./sequences/" + seqSubFolderPath;
                    let completeSeqPathForCar = completeSeqPath + seqJsonFile;
                    // console.log(completeSeqPathForCar);
                    if (fs.existsSync(completeSeqPathForCar)) {
                        console.log(completeSeqPathForCar);
                        console.log("car data: ");
                        let data = fs.readFileSync(completeSeqPathForCar, "utf-8");
                        let jsonFormatData = JSON.parse(data);
                        let counter = 1;
                        for (const singleObject of jsonFormatData) {
                            singleObject["order"] = counter;
                            counter++;
                        }
                        console.log(jsonFormatData);
                        let updatedJsonFormat=JSON.stringify(jsonFormatData,null,2);
                        if(!fs.existsSync("C:/Users/GGurkhude/Desktop/newSeq"+completeSeqPath.substring(1))){
                            fs.mkdirSync("C:/Users/GGurkhude/Desktop/newSeq"+completeSeqPath.substring(1),{recursive:true},(err)=>{
                                console.log(err);
                            });
                        }
                        fs.writeFileSync("C:/Users/GGurkhude/Desktop/newSeq"+completeSeqPath.substring(1)+"_"+seqJsonFile,updatedJsonFormat,'utf-8');
    
                    }
                    let completeSeqPathForTwoWheels = completeSeqPath + "two-wheels/" + seqJsonFile;
                    // console.log(completeSeqPathForTwoWheels);
                    if (fs.existsSync(completeSeqPathForTwoWheels)) {
                        console.log(completeSeqPathForTwoWheels)
                        let data = fs.readFileSync(completeSeqPathForTwoWheels, 'utf-8');
                        let jsonFormatData = JSON.parse(data);
                        let counter = 1;
                        for (const singleObject of jsonFormatData) {
                            singleObject["order"] = counter++;
                        }
                        console.log(jsonFormatData);
                        let updatedJsonFormat=JSON.stringify(jsonFormatData,null,2)
                        if(!fs.existsSync("C:/Users/GGurkhude/Desktop/newSeq/"+completeSeqPath.substring(1)+ "two-wheels")){
                            fs.mkdirSync("C:/Users/GGurkhude/Desktop/newSeq/"+completeSeqPath.substring(1)+ "two-wheels",{recursive:true},(err)=>{
                                console.log(err);
                            });
                        }
                        fs.writeFileSync("C:/Users/GGurkhude/Desktop/newSeq/"+completeSeqPath.substring(1)+ "two-wheels/_" + seqJsonFile,updatedJsonFormat,"utf-8")
                    }
    
                }
    
            }
        }
    }
}

insertOrderPropertyInRules();


// for (const path of filePaths) {
//     let counter = 1;
//     fs.readFile(path, 'utf-8', (error, fileData) => {
//         if (error) {
//             console.log("Error while reading JSON file.", error);
//             return;
//         }

//         try {
//             const jsonObjectData = JSON.parse(fileData);
//             // console.log(jsonObjectData);
//             for (const moduleObject of jsonObjectData) {
//                 moduleObject["order"] = counter;
//                 counter++;
//             }
//             // console.log(jsonObjectData);
//         } catch (error) {
//             console.log("Unable to parse to JSON object.", error)
//         }


//     })
// }