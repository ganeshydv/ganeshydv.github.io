let groupOfComp=[{
        group_name: "g_mentor_apps_rr_in_orientations",
        groupId: 1,
        description: "Group that determines sequence by app > coureType and it adds rr in orientations.",
        categories: []
}]

let Node={
        name:name_,
        category_type:category_type,
        value:value,
        rule: "",
        sequences: {},
        categories: [],
}


class TreeNode {
  constructor(value, category_type) {
    this.value = value;
    this.category_type = category_type;
    this.categories = [];
  }

  addChild(childNode) {
    if (childNode.category_type === this.category_type) {
      this.categories.push(childNode);
    } else {
      console.log("Error: Child node type does not match the parent node type.");
    }
  }

  getChildren() {
    return this.categories;
  }

  updateValue(newValue) {
    this.value = newValue;
  }

  deleteChild(childNode) {
    const index = this.categories.indexOf(childNode);
    if (index !== -1) {
      this.categories.splice(index, 1);
    }
  }
}

// Example usage
const root = new TreeNode("Root", "Folder");
const child1 = new TreeNode("Child 1", "Folder");
const child2 = new TreeNode("Child 2", "File");
const child3 = new TreeNode("Child 3", "File");

root.addChild(child1); // This is allowed because both are of type "Folder"
root.addChild(child2); // This is not allowed because child2 is of type "File"
child1.addChild(child3); // This is allowed because both are of type "File"

console.log("Root categories:");
root.getChildren().forEach((child) => {
  console.log(child);
});

console.log("Child 1 categories:");
child1.getChildren().forEach((child) => {
  console.log(child);
});



