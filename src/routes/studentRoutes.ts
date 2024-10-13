import express from 'express';
import { verifyToken, checkRole } from '../middleware/authMiddleware';
import { getMyGrades, getAverageGrade } from '../controllers/studentController';

const router = express.Router();

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
router.get('/grades', verifyToken, checkRole(['student']), getMyGrades);

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
router.get('/grades/average', verifyToken, checkRole(['student']), getAverageGrade);

export default router;