import { Router } from "express";

import { shorten, indexPage, redirectPage } from "./urlController";

const router = Router();

router.post("/shorten", shorten);

router.get("/", indexPage);

router.get("/:shortURL", redirectPage);

export default router;
