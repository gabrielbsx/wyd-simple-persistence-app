import { requestAdapter } from "@/adapters/requestAdapter";
import { UseCaseContract } from "@/contracts/useCaseContract";
import { env } from "@/env";
import { Route } from "@/routes";
import { writeFile } from "fs/promises";
import { z } from "zod";

type UseCase = UseCaseContract<{
  message: string;
}>;

export const donationUseCase: UseCase = async ({ body }) => {
  const { username, donate, items } = validation.parse(body);

  console.log(
    `Donation made by account with username: ${username} and amount: ${donate} and items: ${items.join()}`
  );

  if (username) {
    await writeFile(
      `${env.IMPORTS_FOLDER}/ImportDonate/${username}.txt`,
      `${username} ${donate}`
    );
  }

  for (const item of items) {
    await writeFile(
      `${env.IMPORTS_FOLDER}/ImportItem/${item}.txt`,
      `${username} ${item}`
    );
  }

  return {
    status: 200,
    body: {
      message: "Donation made successfully",
    },
  };
};

const validation = z.object({
  username: z
    .string()
    .min(4)
    .max(10)
    .regex(/^[a-zA-Z0-9]+$/),
  donate: z.number().min(0),
  items: z.array(z.string()),
});

export const route: Route = {
  method: "post",
  uri: "/donation",
  handler: requestAdapter(donationUseCase),
};
