import express from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

import urlRouter from "./component/url/urlRoutes";

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(urlRouter);

export default app;
