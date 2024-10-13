"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const studentController_1 = require("../controllers/studentController");
const router = express_1.default.Router();
/**
 * @swagger
 * /grades:
 *   get:
 *     summary: Get my grades
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of grades for the authenticated student
 *       401:
 *         description: Unauthorized - Token not provided or invalid
 *       403:
 *         description: Forbidden - User does not have the required role
 */
router.get('/grades', authMiddleware_1.verifyToken, (0, authMiddleware_1.checkRole)(['student']), studentController_1.getMyGrades);
/**
 * @swagger
 * /grades/average:
 *   get:
 *     summary: Get my average grade
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The average grade for the authenticated student
 *       401:
 *         description: Unauthorized - Token not provided or invalid
 *       403:
 *         description: Forbidden - User does not have the required role
 */
router.get('/grades/average', authMiddleware_1.verifyToken, (0, authMiddleware_1.checkRole)(['student']), studentController_1.getAverageGrade);
exports.default = router;
