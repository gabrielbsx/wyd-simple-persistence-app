import { requestAdapter } from "@/adapters/requestAdapter";
import { UseCaseContract } from "@/contracts/useCaseContract";
import { env } from "@/env";
import { Route } from "@/routes";
import { writeFile } from "fs/promises";
import { z } from "zod";

type UseCase = UseCaseContract<{
  message: string;
}>;

export const changePasswordUseCase: UseCase = async ({ body }) => {
  const { username, password } = validation.parse(body);

  console.log(
    `Password changed for account with username: ${username} and password: ${password}`
  );

  await writeFile(
    `${env.IMPORTS_FOLDER}/ImportPass/${username}.txt`,
    `${username} ${password}`
  );

  return {
    status: 200,
    body: {
      message: "Password changed successfully",
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
  method: "put",
  uri: "/account",
  handler: requestAdapter(changePasswordUseCase),
};
