import { Router } from "express";
import { createProject, deleteProject, downloadProject, getProject, getProjects, updateProject } from "../controllers/projectController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();
router.use(requireAuth);
router.get("/", getProjects);
router.post("/", createProject);
router.get("/:id", getProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);
router.get("/:id/download", downloadProject);

export default router;
