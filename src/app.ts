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
    .matches(/^[\w\-]+$/i)
    .nullable(),
  url: yup.string().trim().url().required(),
});

// GET request
// Used to redirect to real url

async function startServer() {
  const app = express();
  app.use(express.static("client/build"));
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );

    // Pass to next layer of middleware
    next();
  });
  app.use(express.json());

  const port: number | string = process.env.PORT || config.port;
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

  const checkExistence = async (h: string) => {
    await dbConnection.query(
      `SELECT COUNT(handle) from url_shortner.urls WHERE handle='${h}';`,
      (err, results, fields) => {
        if (err) {
          return true;
        }
        return results[0]["COUNT(handle)"] === 0;
      }
    );
  };

  // TODO split this into multiple files

  // POST request
  // Generate new short url
  app.post("/generate", async (req: Request, res: Response, next) => {
    let { handle, url }: { handle: string; url: string } = req.body;
    if (!handle || handle === "") {
      handle = nanoid(5);
    }

    await schema.validate({ handle, url });
    const checkQuery = `SELECT COUNT(handle) from url_shortner.urls WHERE handle='${handle}';`;
    const creationQuery = `INSERT INTO url_shortner.urls (url, handle) VALUES ("${url}", "${handle}");`;
    dbConnection.query(checkQuery, (err, results, fields) => {
      if (err) {
        next(err);
      }

      if (results[0]["COUNT(handle)"] === 0) {
        dbConnection.query(creationQuery, (err, results, fields) => {
          if (err) {
            next(err);
          } else {
            res.status(201).json({ message: "success" });
          }
        });
      }
    });
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

  app.get("/:handle", (req: Request, res: Response, next) => {
    const getQuery = `SELECT url FROM url_shortner.urls WHERE handle="${req.params.handle}"`;
    dbConnection.query(getQuery, (err, results, fields) => {
      if (err) {
        next(err);
      } else {
        if (results && results.length > 0 && results[0].hasOwnProperty("url")) {
          res.redirect(results[0].url);
        }
      }
    });
  });
}

startServer();
