const API_ROOT = "/api";

export const CODE_ENDPOINT_SIGN_IN = "api/signin";
export const CODE_ENDPOINT_AUTH = "api/auth/user";

export const CODE_ENDPOINT_UNDEFINED = "ENDPOINT_UNDEFINED";

export type EndpointCodes =
  typeof CODE_ENDPOINT_SIGN_IN
| typeof CODE_ENDPOINT_AUTH
| typeof CODE_ENDPOINT_UNDEFINED;