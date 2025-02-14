import { Router } from "express";
import {
  addPost,
  deletePost,
  getPosts,
} from "../controllers/post.controller.js";

const router = Router();

router.get("/", getPosts);
router.post("/", addPost);
router.delete("/:id", deletePost);

export default router;
