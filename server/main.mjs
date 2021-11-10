
/**** Node.js libraries *****/
import path from "path";

/**** External libraries ****/
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { Database } from "./src/db.mjs";
import router from "./src/router.mjs";

import { config } from "dotenv";
config();

async function main() {
  await Database("test");

  const app = express();
  const routes = router();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.static(path.resolve("..", "client", "build")));

  /**** Add routes ****/
  app.use("/api", routes);

  // "Redirect" all non-API GET requests to React"s entry point (index.html)
  app.get("*", (req, res) =>
    res.sendFile(path.resolve("..", "client", "build", "index.html"))
  );

  const appName = "Server API";
  const port = process.env.PORT || 8080;

  app.listen(port, () => console.log(`${appName} running on port ${port}!`));
}

main();





