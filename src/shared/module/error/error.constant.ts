export const ERROR_MAPPING_RULE_CODES = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER: 500,

  min: 1001,
  isNotEmpty: 1002,
  isBoolean: 1003,
  isString: 1004,
  isDate: 1005,
  nestedValidation: 1006,
  maxLength: 1007,
  isMongoId: 1008,
  isInt: 1009,
  isIn: 1010,
  isArray: 1011,
  arrayMinSize: 1012,
  arrayMaxSize: 1013,
  arrayUnique: 1014,
  isPast: 1015,
  isObjectId: 1016,
};

export const ERROR_DEEP_MAX = 5;
