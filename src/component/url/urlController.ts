import { Request, Response } from "express";

import Url from "../../models/Url";

export const shorten = async (req: Request, res: Response) => {
  console.log(req.body);
  const { originalURL } = req.body;
  try {
    const urlexist = await Url.findOne({
      originalURL: originalURL.toLowerCase(),
    });
    if (urlexist)
      throw new Error(
        `Link is already in use, shortened URL is ${urlexist.shortenedURL}`
      );
    await Url.create({ originalURL: originalURL.toLowerCase() });
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
};

export const indexPage = async (req: Request, res: Response) => {
  const urls = await Url.find();
  res.render("index", { urls });
};

export const redirectPage = async (req: Request, res: Response) => {
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
};
