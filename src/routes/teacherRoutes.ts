import express from 'express';
import { verifyToken , checkRole} from '../middleware/authMiddleware';
import {
     addGrade,
     editGrade, 
     deleteGrade, 
     getAllUsers, 
     getStudentsGrades, 
     getStudentGradeAvg, 
     deleteStudent  
} from '../controllers/teacherController';

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/users', verifyToken, checkRole(['teacher']), getAllUsers);

/**
 * @swagger
 * /grade:
 *   post:
 *     summary: Add a grade
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *               subject:
 *                 type: string
 *               grade:
 *                 type: number
 *     responses:
 *       201:
 *         description: Grade added successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *   put:
 *     summary: Edit a grade
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *               subject:
 *                 type: string
 *               grade:
 *                 type: number
 *     responses:
 *       200:
 *         description: Grade updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.route('/grade').post(verifyToken, checkRole(['teacher']), addGrade).put(verifyToken, checkRole(['teacher']), editGrade);

/**
 * @swagger
 * /grade/delete:
 *   delete:
 *     summary: Delete a grade
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *               subject:
 *                 type: string
 *     responses:
 *       200:
 *         description: Grade deleted successfully
 *       404:
 *         description: Grade not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.delete('/grade/delete', verifyToken, checkRole(['teacher']), deleteGrade);

/**
 * @swagger
 * /student/{studentId}/grades:
 *   get:
 *     summary: Get grades of a specific student
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of grades
 *       404:
 *         description: Student not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/student/:studentId/grades', verifyToken, checkRole(['teacher']), getStudentsGrades);

/**
 * @swagger
 * /student/{studentId}/average:
 *   get:
 *     summary: Get average grade of a specific student
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Average grade
 *       404:
 *         description: Student not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/student/:studentId/average', verifyToken, checkRole(['teacher']), getStudentGradeAvg);

/**
 * @swagger
 * /student/{studentId}:
 *   delete:
 *     summary: Delete a specific student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.delete('/student/:studentId', verifyToken, checkRole(['teacher']), deleteStudent);

export default router;