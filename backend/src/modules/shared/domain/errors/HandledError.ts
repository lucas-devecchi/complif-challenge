export enum ErrorType {
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  RESOURCES_NOT_FOUND = 'RESOURCES_NOT_FOUND',
  INVALID_ENUM_VALUE = 'INVALID_ENUM_VALUE',
  INVALID_STATE = 'INVALID_STATE',
  FORM_INVALID_FIELD = 'FORM_INVALID_FIELD',
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED', // TODO: Create when creating users.
  USER_AND_TOKEN_MISMATCH = 'USER_AND_TOKEN_MISMATCH',
  ACCESS_DENIED = 'ACCESS_DENIED',
  INSUFICIENT_PERMISSIONS = 'INSUFICIENT_PERMISSIONS',
  UNKNOWN = 'UNKNOWN',
}

export type HandledErrorParams = {
  type: ErrorType;
  params: Record<string, any>;
};

export enum Resource {
  BUSINESS = 'BUSINESS',
  ACCOUNT = 'ACCOUNT',
  GROUP = 'GROUP',
  SIGNATURE_RULE = 'SIGNATURE_RULE',
  RULE_OPTION = 'RULE_OPTION',
  RULE_REQUIREMENT = 'RULE_REQUIREMENT',
  USER = 'USER',
}

export class HandledError extends Error {
  private error: HandledErrorParams;

  constructor(error: HandledErrorParams) {
    super(`[ERROR] ${error.type}: ${JSON.stringify(error.params)}`);
    this.error = error;
    this.name = 'HandledError';
  }

  public getMessage(): HandledErrorParams {
    return this.error;
  }
}
