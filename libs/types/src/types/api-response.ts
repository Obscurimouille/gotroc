export type APIResponse<T = any> = {
  success: boolean;
  data: T;
  message?: string;
  errors?: string | {
    message: string;
    rule: string;
    field: string;
  }
};