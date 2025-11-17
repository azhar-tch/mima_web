export interface ApiResponse<T> {
  error: boolean;
  message: string;
  data: T;
  details: string;
}
