"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const teacherController_1 = require("../controllers/teacherController");
const router = express_1.default.Router();
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
router.get('/users', authMiddleware_1.verifyToken, (0, authMiddleware_1.checkRole)(['teacher']), teacherController_1.getAllUsers);
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
router.route('/grade').post(authMiddleware_1.verifyToken, (0, authMiddleware_1.checkRole)(['teacher']), teacherController_1.addGrade).put(authMiddleware_1.verifyToken, (0, authMiddleware_1.checkRole)(['teacher']), teacherController_1.editGrade);
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
router.delete('/grade/delete', authMiddleware_1.verifyToken, (0, authMiddleware_1.checkRole)(['teacher']), teacherController_1.deleteGrade);
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
router.get('/student/:studentId/grades', authMiddleware_1.verifyToken, (0, authMiddleware_1.checkRole)(['teacher']), teacherController_1.getStudentsGrades);
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
router.get('/student/:studentId/average', authMiddleware_1.verifyToken, (0, authMiddleware_1.checkRole)(['teacher']), teacherController_1.getStudentGradeAvg);
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
router.delete('/student/:studentId', authMiddleware_1.verifyToken, (0, authMiddleware_1.checkRole)(['teacher']), teacherController_1.deleteStudent);
exports.default = router;
