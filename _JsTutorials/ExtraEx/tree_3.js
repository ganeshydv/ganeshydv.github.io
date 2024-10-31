function addChild(parent, child) {
    // Get the level of the parent and child nodes
    const parentLevel = getLevel(parent);
    const childLevel = getLevel(child);
    console.log(parentLevel, childLevel);
    if (parentLevel === childLevel) {
      parent.categories.push(child);
    } else {
      console.log("Error: Child node can only be added at the same level.");
    }
  }
  
  function getLevel(node) {
    // Recursively calculate the level of a node in the hierarchy
    if (!node.categories || node.categories.length === 0) {
      return 1; // The leaf node's level
    } else {
      return 1 + getLevel(node.categories[0]); // Increment the level by 1
    }
  }
  
  // Example usage
  const root = {
    group_name: "g_mentor_apps_rr_in_orientations",
    groupId: 1,
    description: "Group that determines sequence by app > courseType and it adds rr in orientations",
    categories: [
      {
        name: "All_Others",
        category_type: "Application",
        value: "All_Others",
        rule: "",
        categories: [
          {
            name: "Motorcycle",
            category_type: "Location1",
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
                  
                ],
              },
              {
                name: "Car",
                category_type: "CourseType",
                value: "Car",
                rule: "",
                sequences: {},
                categories: [
                 
                ],
              },
            ],
          },
        ],
      }, {
        name: "Menotor",
        category_type: "Application",
        value: "Menotor",
        rule: "",
        categories: [
          {
            name: "Motorcycle",
            category_type: "Location1",
            value: "Motorcycle",
            rule: "",
            categories: [
            ],
          },
        ],
      },
    ],
  };
  
  const newCategory = {
    name: "New_Category",
    category_type: "CourseType",
    value: "New_Value",
    rule: "",
    sequences: {},
    categories: [],
  };
  
  addChild(root, newCategory); // This is allowed as it's at the same level as "Car"
  
  console.log(root); // Check the modified hierarchy
  