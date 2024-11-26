export interface HttpRequest {
  body?: unknown;
  params?: unknown;
  query?: unknown;
}

export interface HttpResponse<T> {
  status: number;
  body?: T;
}
