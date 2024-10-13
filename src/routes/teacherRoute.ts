import express from "express";
import { registerTeacher } from "../controllers/teacherController";

const router = express.Router();

router.post('/register', registerTeacher);

export default router;