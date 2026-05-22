import { Router } from "express";
import { generateCode, refineCode } from "../controllers/aiController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();
router.use(requireAuth);
router.post("/generate", generateCode);
router.post("/refine", refineCode);

export default router;
