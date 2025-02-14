import { Router } from "express";

import {
  getRelationships,
  addRelationship,
  deleteRelationship,
} from "../controllers/relationship.controller.js";

const router = Router();

router.get("/", getRelationships);
router.post("/", addRelationship);
router.delete("/", deleteRelationship);

export default router;
