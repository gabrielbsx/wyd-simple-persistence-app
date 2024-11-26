import { UseCaseContract } from "@/contracts/useCaseContract";
import { type Request, type Response } from "express";

export function requestAdapter(useCase: UseCaseContract<unknown>) {
  return async (request: Request, response: Response) => {
    try {
      const httpRequest = {
        body: request.body,
        params: request.params,
        query: request.query,
      };

      const httpResponse = await useCase(httpRequest);

      return response.status(httpResponse.status).json(httpResponse.body);
    } catch (error) {
      if (error instanceof Error) {
        const errorResponse = {
          message: error.message || "Internal Server Error",
          status: 500,
        };

        return response.status(errorResponse.status).json(errorResponse);
      }
    }
  };
}
