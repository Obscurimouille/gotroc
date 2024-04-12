import { ControllerResponse } from "../types/controller-response.js";

export const INTERNAL_ERROR: ControllerResponse = {
  success: false,
  message: "Internal error",
  code: 500,
};

export const NOT_FOUND: ControllerResponse = {
  success: false,
  message: "Not found",
  code: 404,
};

export const INVALID_PARAMS: ControllerResponse = {
  success: false,
  message: "Invalid parameters",
  code: 400,
};

export const handleInternalError = (error: any) => {
  console.error(error);
  return INTERNAL_ERROR;
};