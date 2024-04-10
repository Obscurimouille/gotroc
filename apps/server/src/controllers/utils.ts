import { ControllerResponse } from "../types/controller-response";

export const INTERNAL_ERROR: ControllerResponse = {
  success: false,
  message: "Internal error",
  code: 500,
};