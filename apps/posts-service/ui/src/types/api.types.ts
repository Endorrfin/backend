import { AxiosError } from 'axios';
import { ApiResponse } from './index';

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
  timestamp: string;
}

export type ApiError = AxiosError<ApiErrorResponse>;

export interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
}
