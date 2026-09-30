/**
 * Common DTOs used across the BFF
 */

/**
 * Standard API response envelope
 */
export interface CommonResponseDTO<T> {
  success: boolean;
  message: string;
  data?: T;
}

/**
 * Paginated response envelope
 */
export interface PaginatedResponseDTO<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Error response envelope
 */
export interface ErrorResponseDTO {
  success: boolean;
  message: string;
  code?: string;
}
