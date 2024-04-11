export type APIResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
};