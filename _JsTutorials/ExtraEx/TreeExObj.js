
let Node = function (data) {
    this.data = data;
    this.left = null;
    this.right = null;
}

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

            name: "Motorcycle",
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

            name: "Motorcycle",
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

let maxLenght = 0;
let path = [];
let allPaths = [];
function iterateOverTree(obj, level) {
    if (!obj) {
        return;
    };

    for (let i = 0; obj.categories && i < obj.categories.length; i++) {
        console.log(obj.categories[i].category_type);

        let type = obj.categories[i].category_type;
        let alreadyPresent = false;
        for (let typeObj of path) {
            if (typeObj[type]) {
                alreadyPresent = true;
                level = typeObj[type];
                if(typeObj[type]===1) {
                    allPaths.push(path);
                    path = [];
                }
                break;
                // as level is already present in path, so we need to make sure that we are not adding it again
            }
        }
        if (!alreadyPresent) {
            level++;
            path.push({ [type]: level });
            if (level > maxLenght) maxLenght = level;
        }

        iterateOverTree(obj.categories[i], level);

    }
}
iterateOverTree(obj, 0);
console.log(path);
console.log(maxLenght);
console.log(allPaths);