import { Router } from "express";
import { addComment, getComments } from "../controllers/comment.controller.js";

const router = Router();

router.get("/", getComments);
router.post("/", addComment);

export default router;
