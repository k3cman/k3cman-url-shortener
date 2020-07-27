import * as bodyParser from "body-parser";
import * as express from "express";
import { createConnection } from "typeorm";
import { AppRoutes } from "./Routes";

createConnection().then(async (connection) => {
  const app = express();
  app.use(bodyParser.json());
  app.use(express.static("client/build"));
  AppRoutes.forEach((route) => {
    app[route.method](route.path, (req, res, next) => {
      route
        .action(req, res)
        .then(() => next)
        .catch((err) => next(err));
    });
  });

  app.listen(3001);

  console.log("started on 3001");
});
