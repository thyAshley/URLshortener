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
  res.render("index", { urls });
});

app.get("/:shortURL", async (req: Request, res: Response) => {
  const { shortURL } = req.params;
  try {
    const url = await Url.findOne({ shortenedURL: shortURL });
    if (!url) throw new Error("No url found");
    url.clicks = url.clicks + 1;
    await url.save();
    res.redirect(url.originalURL);
  } catch (error) {
    console.log(error);
  }
});

export default app;
