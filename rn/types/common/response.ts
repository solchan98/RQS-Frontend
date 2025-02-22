export interface CommonResponse<T> {
  data: T;
}

export interface CommonErrorResponse<T> {
  status: number;
  message: string;
  data?: T;
}
