export interface PaginationType {
  current_page: number;
  total: number;
  total_page: number;
}

export interface ResponseType {
  data: ResponseDataType;
  message: string;
  code: number;
  error: string;
}

export interface ResponseDataType {
  data: object;
  pagination: object;
}

export interface PayloadUpdate {
  data: object;
  id: number;
  params: {};
}

export interface EventType {
  which: number;
  shiftKey: boolean;
}
