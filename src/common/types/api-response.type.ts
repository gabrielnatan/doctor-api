export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | null;
  error: any;
  timestamp: string;
  path: string;
}
