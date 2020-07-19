import express, { Request, Response } from "express";
import mysql from "mysql";
import { nanoid } from "nanoid";
import * as yup from "yup";
import config from "./config";

const app = express();

const schema = yup.object().shape({
  handle: yup
    .string()
    .trim()
    .matches(/^[\w\-]+$/i),
  url: yup.string().trim().url().required(),
});

// GET request
// Used to redirect to real url
app.get("/:handle", (req: Request, res: Response) => {
  res.redirect("http://kecman.dev");
});

async function startServer() {
  const app = express();
  app.use(express.static("public"));
  app.use(express.json());

  const port: number | string = process.env.PORT || config.port;
  // await loaders.db();
  const dbConnection = mysql.createConnection({
    host: config.databaseURL,
    user: config.dbConfig.user,
    password: config.dbConfig.password,
    database: config.dbConfig.database,
  });

  dbConnection.connect((err) => {
    if (err) throw new Error(err.toString());
    console.log("Connected to db");
  });

  // TODO split this into multiple files
  // POST request
  // Generate new short url
  app.post("/generate", async (req: Request, res: Response, next) => {
    let { handle, url }: { handle: string; url: string } = req.body;

    try {
      await schema.validate({ handle, url });
      if (!handle) {
        handle = nanoid(5);
      } else {
        dbConnection.query(
          `SELECT id FROM url_shortner.urls WHERE(handle="${handle}")`,
          (err, results, fields) => {
            if (err) {
              res.json({ error: err });
            } else {
              res.json(results);
            }
          }
        );
      }
    } catch (error) {
      next(error);
    }

    // res.json({ handle });
    //   dbConnection.query(
    //     `
    //     INSERT INTO url_shortner.urls (url, handle) VALUES (${url}, ${handle});;
    // `,
    //     (err, results, fields) => {
    //       if (err) {
    //         console.log(err);
    //         res.status(500).json({ error: err });
    //       } else {
    //         res.status(201).json({ message: "success" });
    //       }
    //     }
    //   );
  });

  app.use((error, req, res, next) => {
    if (error.status) {
      res.status(error.status);
    } else {
      res.status(500);
    }
    res.json({
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
    });
  });

  app.listen(port, () => {
    console.log(`Server is listening to port ${port}`);
  });
}

startServer();
