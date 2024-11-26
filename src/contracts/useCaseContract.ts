import { HttpRequest, HttpResponse } from "./httpContract";

export type UseCaseContract<T> = (
  props: HttpRequest
) => Promise<HttpResponse<T>>;
