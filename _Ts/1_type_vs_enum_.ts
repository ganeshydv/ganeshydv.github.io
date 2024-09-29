
type TFA_RESULT = {
  EXPIRED?: "EXPIRED";
  INVALID: "INVALID";
  NOTEXIST: "NOTEXIST";
  UNSUPPORTED_TOTEM_TYPE: "UNSUPPORTED_TOTEM_TYPE";
  PASS: "PASS";
};

const result_: TFA_RESULT = {
//   EXPIRED: "",
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

// const result_: TFA_result = TFA_result.EXPIRED; // Valid
// const anotherResult_: TFA_result.INVALID = "INVALID"; // Valid, which might not be what you want

/*

*/

type TFA_RESULt_2 =
  | 'EXPIRED'
  | 'INVALID'
  | 'NOTEXIST'
  | 'UNSUPPORTED_TOTEM_TYPE'
  | 'PASS';

const result_2: TFA_RESULt_2 = 'EXPIRED'; // Valid
const anotherResult_2: TFA_RESULt_2 = 'INVALID'; // Valid
// const invalidResult_2: TFA_RESULt_2 = 'OTHER'; // Error, as 'OTHER' is not allowed
