/* eslint-disable @typescript-eslint/no-explicit-any */
import { Express, Request, Response } from "express";
import { readdir } from "fs/promises";
import { env } from "./env";

export interface Route {
  method: "get" | "post" | "put" | "delete";
  uri: string;
  handler: (request: Request, response: Response) => Promise<any>;
}

export const routes = async (app: Express) => {
  const baseDir = env.ENV === "development" ? "src" : "dist";
  const useCases = await readdir(`./${baseDir}/useCases`);

  const routes = [];

  for (const file of useCases) {
    const useCase = await import(`./useCases/${file}`);

    routes.push(useCase.route);

    console.log(`${useCase.route.method.toUpperCase()}: ${useCase.route.uri}`);
  }

  console.log();

  routes?.map((route: Route) => app[route.method](route.uri, route.handler));
};
