import { requestAdapter } from "@/adapters/requestAdapter";
import { UseCaseContract } from "@/contracts/useCaseContract";
import { env } from "@/env";
import { Route } from "@/routes";
import { writeFile } from "fs/promises";
import { z } from "zod";

type UseCase = UseCaseContract<{
  message: string;
}>;

export const createAccountUseCase: UseCase = async ({ body }) => {
  const { username, password } = validation.parse(body);

  console.log(
    `Creating account with username: ${username} and password: ${password}`
  );

  await writeFile(
    `${env.IMPORTS_FOLDER}/ImportUser/${username}.txt`,
    `${username} ${password}`
  );

  return {
    status: 201,
    body: {
      message: "Account created successfully",
    },
  };
};

const validation = z.object({
  username: z
    .string()
    .min(4)
    .max(10)
    .regex(/^[a-zA-Z0-9]+$/),
  password: z
    .string()
    .min(4)
    .max(12)
    .regex(/^[a-zA-Z0-9]+$/),
});

export const route: Route = {
  method: "post",
  uri: "/account",
  handler: requestAdapter(createAccountUseCase),
};
