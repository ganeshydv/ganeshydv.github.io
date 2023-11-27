let obj = {
    group_name: "g_mentor_apps_rr_in_orientations",
    groupId: 1,
    description: "Group that determines sequence by app > coureType and it adds rr in orientations.",
    categories: [ // children
        {

            name: "Motorcycle",
            category_type: "Location1",  // type of object is different at this level
            value: "Motorcycle",
            rule: "",
            categories: [
                {
                    name: "Two-Wheel",
                    category_type: "CourseType",
                    value: "Two-Wheel",
                    rule: "",
                    sequences: {},
                    categories: [
                        {
                            name: "Mentor_Insight",
                            category_type: "Application",
                            value: "Mentor_Insight",
                            rule: "",
                            sequences: {},
                            categories: [

                            ]
                        },
                    ]
                },
                {
                    name: "Car",
                    category_type: "CourseType",
                    value: "Car",
                    rule: "",
                    sequences: {},
                    categories: [
                        {
                            name: "Mentor_Insight",
                            category_type: "Application",
                            value: "Mentor_Insight",
                            rule: "",
                            sequences: {},
                            categories: [

                            ]
                        },
                    ]
                },
            ]
        },
        {

            name: "Motorcycle2",
            category_type: "Location2",  // type of object is different at this level
            value: "Motorcycle",
            rule: "",
            categories: [
                {
                    name: "Two-Wheel",
                    category_type: "CourseType",
                    value: "Two-Wheel",
                    rule: "",
                    sequences: {},
                    categories: [
                        {
                            name: "Mentor_Insight",
                            category_type: "Application",
                            value: "Mentor_Insight",
                            rule: "",
                            sequences: {},
                            categories: [

                            ]
                        },
                    ]
                },
                {
                    name: "Car",
                    category_type: "CourseType",
                    value: "Car",
                    rule: "",
                    sequences: {},
                    categories: [
                        {
                            name: "Mentor_Insight",
                            category_type: "Application1",
                            value: "Mentor_Insight",
                            rule: "",
                            sequences: {},
                            categories: [

                            ]
                        },
                    ]
                },
            ]
        },
        {

            name: "Motorcycle3",
            category_type: "Location3",  // type of object is different at this level
            value: "Motorcycle",
            rule: "",
            categories: [
                {
                    name: "Two-Wheel",
                    category_type: "CourseType",
                    value: "Two-Wheel",
                    rule: "",
                    sequences: {},
                    categories: [
                        {
                            name: "Mentor_Insight",
                            category_type: "Application",
                            value: "Mentor_Insight",
                            rule: "",
                            sequences: {},
                            categories: [

                            ]
                        },
                    ]
                },
                {
                    name: "Car",
                    category_type: "CourseType",
                    value: "Car",
                    rule: "",
                    sequences: {},
                    categories: [
                        {
                            name: "Mentor_Insight",
                            category_type: "Application1",
                            value: "Mentor_Insight",
                            rule: "",
                            sequences: {},
                            categories: [

                            ]
                        },
                    ]
                },
            ]
        },
    ]

}

let paths=[];
let allPaths = [];


function iterateOverTree(eleObj, level){

    if (!eleObj) return;
    if (eleObj && !checkCategoryTypeExist(paths, eleObj.category_type)) {
        // level++;
        paths.push({ [eleObj.category_type]: [{ level:++level, eleObj:eleObj }] })
    }
    if (!eleObj.categories) return;
    for(ele of eleObj.categories){
        if(ele){
            let alreadyPresent = checkCategoryTypeExist(paths,ele.category_type);
            if(!alreadyPresent){
                paths.push({[ele.category_type]:[{level:++level,eleObj:ele}]}) // array of objects
            }else{
                paths[ele.category_type].push({level:level,eleObj:ele});
            }
            iterateOverTree(ele,level)
        }else return;
    }
}

function checkCategoryTypeExist(pathArr, categoryType) {
    let isExist = false;
    for (let objtype of pathArr) {
        if (objtype[categoryType]) {
            isExist = true;
            break;
        }
    }
    return isExist;
}

function findAllelePath(mainObj){
    for(let ele of mainObj.categories){
        iterateOverTree(ele,0);

        allPaths.push(paths);
        paths=[];
    }
    // print all paths
    for(let path of allPaths){
        console.log(path)
    }
}
findAllelePath(obj)