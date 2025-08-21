type TFA_RESULT = {
  EXPIRED?: "EXPIRED";
  INVALID: "INVALID";
  NOTEXIST: "NOTEXIST";
  UNSUPPORTED_TOTEM_TYPE: "UNSUPPORTED_TOTEM_TYPE";
  PASS: "PASS";
};

const result: TFA_RESULT = {
  EXPIRED: "EXPIRED",
  INVALID: "INVALID",
  NOTEXIST: "NOTEXIST",
  UNSUPPORTED_TOTEM_TYPE: "UNSUPPORTED_TOTEM_TYPE",
  PASS: "PASS",
}; // Valid
// const anotherResult: TFA_RESULT = "INVALID"; // Error, which is good for type safety

enum TFA_result {
  EXPIRED = "EXPIRED",
  INVALID = "INVALID",
  NOTEXIST = "NOTEXIST",
  UNSUPPORTED_TOTEM_TYPE = "UNSUPPORTED_TOTEM_TYPE",
  PASS = "PASS",
}

const result_: TFA_result = TFA_result.EXPIRED; // Valid
const anotherResult_: TFA_result.INVALID = TFA_result.INVALID 
// const anotherResult_1: TFA_result = "INVALID"  // Error


/*

*/

type TFA_RESULT_2 =
  | 'EXPIRED'
  | 'INVALID'
  | 'NOTEXIST'
  | 'UNSUPPORTED_TOTEM_TYPE'
  | 'PASS';

const result_2: TFA_RESULT_2 = 'EXPIRED'; // Valid
const anotherResult_2: TFA_RESULT_2 = 'INVALID'; // Valid
// const invalidResult_2: TFA_RESULT_2 = 'OTHER'; // Error, as 'OTHER' is not allowed
