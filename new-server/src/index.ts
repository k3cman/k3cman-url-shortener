import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { AppRoutes } from "./routes";

createConnection()
  .then(async (connection) => {
    const app = express();
    app.use(bodyParser.json());

    // Init routes
    AppRoutes.forEach((route) => {
      app[route.method](route.path, (req, res, next) => {
        route
          .action(req, res)
          .then(() => next)
          .catch((err) => next(err));
      });
    });

    app.listen(3002);

    console.log("Server on 3002");
  })
  .catch((err) => console.log("ORM", err));
