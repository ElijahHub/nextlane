import { Router } from "express";

import {
  getStories,
  addStory,
  deleteStory,
} from "../controllers/story.controller.js";

const router = Router();

router.get("/", getStories);
router.post("/", addStory);
router.delete("/:id", deleteStory);

export default router;
