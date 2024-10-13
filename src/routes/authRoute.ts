import { Router } from "express";
import { registerTeacher, registerStudent } from "../controllers/authController";

const registerRouter = Router();

registerRouter.post('/teacher/register', registerTeacher);

export default registerRouter