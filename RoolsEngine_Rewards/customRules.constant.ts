// create new CustomRule
export const ruleOneCOndtion = {
  name: "CustomRule",
  badge: "age Badge",
  point: 10,
  when: function (facts) {
    if (facts.user.age < 25) {
      return true;
    }
    return false;
  },
} as const;

export const rulleTwoCondition = {
  name: "CustomRule",
  badge: "location badge",
  point: 20,
  when: function (facts) {
    if (facts.user.location) {
      return true;
    }
    return false;
  },
} as const;
