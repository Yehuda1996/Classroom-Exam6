"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.getStudentGradeAvg = exports.getStudentsGrades = exports.getAllUsers = exports.deleteGrade = exports.editGrade = exports.addGrade = void 0;
const userModel_1 = __importStar(require("../models/userModel"));
const response_1 = require("../types/response");
const addGrade = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, subject, grade } = req.body;
    try {
        const student = yield userModel_1.default.findById(studentId);
        if (!student || student.role !== userModel_1.Role.Student) {
            res.status(404).json(new response_1.ResponseStructure(false, {}, "Student not found."));
        }
        else {
            const gradeExists = student.grades.some(g => g.subject === subject);
            if (gradeExists) {
                res.status(400).json(new response_1.ResponseStructure(false, {}, "Grade for this subject already exists."));
            }
            student.grades.push({ subject, grade });
            yield student.save();
            res.status(201).json(new response_1.ResponseStructure(true, student.grades));
        }
    }
    catch (error) {
        next(error);
    }
});
exports.addGrade = addGrade;
const editGrade = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, subject, grade } = req.body;
    try {
        const student = yield userModel_1.default.findById(studentId);
        if (!student || student.role !== userModel_1.Role.Student) {
            res.status(404).json(new response_1.ResponseStructure(false, {}, "Student not found."));
        }
        else {
            const gradeIndex = student.grades.findIndex(g => g.subject === subject);
            if (gradeIndex === -1) {
                res.status(404).json(new response_1.ResponseStructure(false, {}, "Grade for this subject not found."));
            }
            student.grades[gradeIndex].grade = grade;
            yield student.save();
            res.status(200).json(new response_1.ResponseStructure(true, student.grades));
        }
    }
    catch (error) {
        next(error);
    }
});
exports.editGrade = editGrade;
const deleteGrade = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, subject } = req.body;
    try {
        const student = yield userModel_1.default.findById(studentId);
        if (!student || student.role !== userModel_1.Role.Student) {
            res.status(404).json(new response_1.ResponseStructure(false, {}, "Student not found."));
        }
        else {
            const gradeIndex = student.grades.findIndex(g => g.subject === subject);
            if (gradeIndex === -1) {
                res.status(404).json(new response_1.ResponseStructure(false, {}, "Grade for this subject not found."));
            }
            student.grades.splice(gradeIndex, 1);
            yield student.save();
            res.status(200).json(new response_1.ResponseStructure(true, student.grades));
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteGrade = deleteGrade;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find().populate('Class');
        res.status(200).json(new response_1.ResponseStructure(true, users));
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUsers = getAllUsers;
const getStudentsGrades = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    const studentIdStr = typeof studentId === 'string' ? studentId : String(studentId);
    try {
        const student = yield userModel_1.default.findById(studentIdStr).populate("Class");
        if (!student || student.role !== userModel_1.Role.Student) {
            res.status(404).json(new response_1.ResponseStructure(false, {}, "Student not found."));
        }
        else {
            res.status(200).json(new response_1.ResponseStructure(true, student.grades));
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getStudentsGrades = getStudentsGrades;
const getStudentGradeAvg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    const studentIdStr = typeof studentId === 'string' ? studentId : String(studentId);
    try {
        const student = yield userModel_1.default.findById(studentIdStr).populate("Class");
        if (!student || student.role !== userModel_1.Role.Student) {
            res.status(404).json(new response_1.ResponseStructure(false, {}, "Student not found."));
        }
        else {
            const totalGrades = student.grades.reduce((acc, curr) => acc + curr.grade, 0);
            const avgGrades = student.grades.length > 0 ? totalGrades / student.grades.length : 0;
            res.status(200).json(new response_1.ResponseStructure(true, avgGrades));
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getStudentGradeAvg = getStudentGradeAvg;
const deleteStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    const studentIdStr = typeof studentId === 'string' ? studentId : String(studentId);
    try {
        const student = yield userModel_1.default.findByIdAndDelete({ _id: studentIdStr, role: 'student' });
        if (!student) {
            res.status(404).json(new response_1.ResponseStructure(false, {}, "Student not found."));
        }
        res.status(200).json(new response_1.ResponseStructure(true, {}, "Student deleted"));
    }
    catch (error) {
        next(error);
    }
});
exports.deleteStudent = deleteStudent;
