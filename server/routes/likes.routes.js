import { Router } from "express";
import {
  addLike,
  getLikes,
  deleteLike,
} from "../controllers/like.controller.js";

const router = Router();

router.get("/", getLikes);

router.post("/", addLike);

router.delete("/", deleteLike);

export default router;
