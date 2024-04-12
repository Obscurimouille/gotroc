import { Response } from "express";
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

export const INVALID_CREDENTIALS: ControllerResponse = {
  success: false,
  message: "Invalid credentials",
  code: 401,
};

export const UNAUTHORIZED: ControllerResponse = {
  success: false,
  message: "Unauthorized",
  code: 401,
};

export const reply = (res: Response, controllerResponse: ControllerResponse) => {
  res.status(controllerResponse.code || 200).json(controllerResponse);
}

export const handleInternalError = (error: any) => {
  console.error(error);
  return INTERNAL_ERROR;
};