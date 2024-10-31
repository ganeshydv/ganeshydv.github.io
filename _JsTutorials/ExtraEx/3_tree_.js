function insertCategoryAtSameLevel(rootCategory, newCategory) {
    const findAndRemove = (category, parent, level) => {
      if (category.category_type === newCategory.category_type && parent) {
        parent.categories.push(newCategory);
        // parent.categories.splice(parent.categories.indexOf(category), 1); // Remove from the original location
        return true;
      }
      if (category.categories) {
        for (const childCategory of category.categories) {
          if (findAndRemove(childCategory, category, level + 1)) {
            return true;
          }
        }
      }
      return false;
    };
  
    findAndRemove(rootCategory, null, 0);
  }
  
  // Example usage
  const rootCategory = {
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
            categories: [
              {
                name: "Mentor_Insight",
                category_type: "Application",
                value: "Mentor_Insight",
                rule: "",
                categories: [],
              },
            ],
          },
          {
            name: "Car",
            category_type: "CourseType",
            value: "Car",
            rule: "",
            categories: [
              {
                name: "Mentor_Insight",
                category_type: "Application",
                value: "Mentor_Insight",
                rule: "",
                categories: [],
              },
            ],
          },
        ],
      },
    ],
  };
  
  const newCategory = {
    name: "New_Category",
    category_type: "Application",
    value: "New_Value",
    rule: "",
    categories: [],
  };
  
  insertCategoryAtSameLevel(rootCategory, newCategory);
  
  // Print the updated hierarchy
  console.log(JSON.stringify(rootCategory, null, 2));
  