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



obj2=
    {
        group_name: "g_mentor_apps_rr_in_orientations",
        groupId: 1,
        description: "Group that determines sequence by app > coureType and it adds rr in orientations.",
        categories: [ // children
            {
                name: "All_Others",
                category_type: "Application",
                value: "All_Others",
                rule: "",
                categories: [
                    {
                        name: "Two-Wheel",
                        category_type: "CourseType",
                        value: "Two-Wheel",
                        rule: "", 
                        sequences:{}
                    },
                    {
                        name: "Car",
                        category_type: "CourseType",
                        value: "Car",
                        rule: "", 
                        sequences:{}
                    },
                ]
            },
            {
                name: "Mentor_Insight",
                category_type: "Application",
                value: "Mentor_Insight",
                rule: "",
                categories: [
                    {
                        name: "Two-Wheel",
                        category_type: "CourseType",
                        value: "Two-Wheel",
                        rule: "", 
                        sequences:{}
                    },
                    {
                        name: "Car",
                        category_type: "CourseType",
                        value: "Car",
                        rule: "", 
                        sequences:{}
                    },
                ],
            },


        ],
        companies: [
            { name: 'abc', id: 1 },
            { name: 'def', id: 2 },
            { name: 'abc', id: 1 },
            { name: 'def', id: 2 },
            { name: 'abc', id: 1 },
            { name: 'def', id: 2 },
            { name: 'abc', id: 1 },
            { name: 'def', id: 2 },
            { name: 'abc', id: 1 },
            { name: 'def', id: 2 },
        ],

    }, {
        group_name: "g_mentor_apps_rr_in_orientations 2",
        groupId: 2,
        description: "Group that determines sequence by app > coureType and it adds rr in orientations.",
        categories: [],
        companies: [
            { name: 'abc', id: 1 },
            { name: 'def', id: 2 },
            { name: 'abc', id: 1 },
            { name: 'def', id: 2 },
            { name: 'abc', id: 1 },
            { name: 'def', id: 2 },
            { name: 'abc', id: 1 },
            { name: 'def', id: 2 },
            { name: 'abc', id: 1 },
            { name: 'def', id: 2 },
        ],

    },
    {
        group_name: "g_mentor_apps_rr_in_orientations 3",
        groupId: 3,
        description: "Group that determines sequence by app > coureType and it adds rr in orientations.",
        categories: [
            {
                name: "Mentor_Insight",
                category_type: "Application",
                value: "Mentor_Insight",
                rule: "",

            }
        ],
        companies: [
            { name: 'abc', id: 1 },
            { name: 'def', id: 2 },
            { name: 'abc', id: 1 },
            { name: 'def', id: 2 },
            { name: 'abc', id: 1 },
            { name: 'def', id: 2 },
            { name: 'abc', id: 1 },
            { name: 'def', id: 2 },
            { name: 'abc', id: 1 },
            { name: 'def', id: 2 },
        ],

    }
let paths=[];
let allPaths = [];



function checkCategoryTypeExist(pathArr, categoryType) {
    let isExist = false;
    let prevLevel = 0;
    for (let objtype of pathArr) {
        if (objtype[categoryType]) {
            isExist = true;
            prevLevel = objtype[categoryType][0].level;
            break;
        }
    }
    return { isExist, prevLevel };
}

function iterateOverTree(eleObj, level, parentEleRef) {

    if (!eleObj) return;
    let { isExist, prevLevel } = checkCategoryTypeExist(paths, eleObj.category_type);
    if (!isExist) {
        level++;
        paths.push({ [eleObj.category_type]: [{ level, eleObj, parentEleRef }] })
    } else {
        level = prevLevel;
        for(pathObj of paths){
            if(pathObj[eleObj.category_type]){
                pathObj[eleObj.category_type].push( { level: prevLevel, eleObj: eleObj, parentEleRef})
                break;
            }
            
        }
        // paths[eleObj.category_type].push( { level: prevLevel, eleObj: eleObj, parentEleRef})
    }
    if (!eleObj.categories) return;
    for (let ele of eleObj.categories) {
        iterateOverTree(ele, level, eleObj);
    }
}
function findAllelePath(mainObj) {
    // allPaths=[];
    for (let ele of mainObj.categories) {
        iterateOverTree(ele, 0, mainObj);

        allPaths.push(paths);
        paths = [];
    }
    for (let path of allPaths) {
        // for (let pathObj of path) {
        //     console.log(pathObj)
        // }
        console.log(path);
    }
}

findAllelePath(obj2);
