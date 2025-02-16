import { Router } from "express";

import {
  getRelationships,
  addRelationship,
  deleteRelationship,
  getFollowed,
} from "../controllers/relationship.controller.js";

const router = Router();

router.get("/", getRelationships);
router.get("/following", getFollowed);
router.post("/", addRelationship);
router.delete("/", deleteRelationship);

export default router;
