import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

import Url from "./models/Url";

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.post("/shorten", async (req: Request, res: Response) => {
  console.log(req.body);
  const { originalURL } = req.body;
  await Url.create({ originalURL });
  res.redirect("/");
});

app.get("/", async (req: Request, res: Response) => {
  const urls = await Url.find();
  console.log(urls);
  res.render("index", { urls });
});

export default app;
