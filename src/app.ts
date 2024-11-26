import express from "express";
import { env } from "./env";
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await routes(app);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
