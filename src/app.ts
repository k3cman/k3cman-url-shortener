import express, { Request, Response } from "express";
import config from "./config";
import { loaders } from "./loaders";

const app = express();

// POST request
// Generate new short url
app.post("/generate", (req: Request, res: Response) => {
  let { handle, url }: { handle: string; url: string } = req.body;
  res.json({
    handle,
    url,
  });
});

// GET request
// Used to redirect to real url
app.get("/:handle", (req: Request, res: Response) => {
  res.redirect("http://kecman.dev");
});

// Initialize the server

const port: number | string = process.env.PORT || 1234;
app.listen(port, () => {});

async function startServer() {
  const app = express();
  app.use(express.static("public"));
  app.use(express.json());

  const port: number | string = process.env.PORT || config.port;
  await loaders.db();
  app.listen(port, () => {
    console.log(`Server is listening to port ${port}`);
  });
}

startServer();
