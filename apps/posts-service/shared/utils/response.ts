import { Response } from 'express';
import { ApiResponse as IApiResponse, PaginatedResponse, ValidationError } from '../../src/types';

export class ApiResponse {
  static success<T>(
      res: Response,
      data: T = null as any,
      message: string = 'Success',
      statusCode: number = 200
  ): Response<IApiResponse<T>> {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    });
  }

  static error(
      res: Response,
      message: string = 'Error',
      statusCode: number = 500,
      errors: ValidationError[] | null = null
  ): Response<IApiResponse> {
    const response: IApiResponse = {
      success: false,
      message,
      timestamp: new Date().toISOString()
    };

    if (errors) {
      response.errors = errors;
    }

    return res.status(statusCode).json(response);
  }

  static paginated<T>(
      res: Response,
      data: T,
      page: number,
      limit: number,
      total: number,
      message: string = 'Success'
  ): Response<PaginatedResponse<T>> {
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      success: true,
      message,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      },
      timestamp: new Date().toISOString()
    });
  }
}
