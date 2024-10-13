"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerStudent = exports.registerTeacher = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const teacherModel_js_1 = __importDefault(require("../models/teacherModel.js"));
const studentModel_js_1 = __importDefault(require("../models/studentModel.js"));
const response_js_1 = require("../types/response.js");
const registerTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacher = yield teacherModel_js_1.default.create(req.body);
        const hashedPassword = yield bcrypt_1.default.hash(teacher.password, 10);
        const response = new response_js_1.ResponseStructure(true, teacher);
        res.status(201).json({ message: "New classroom created successfully", teacher: teacher });
    }
    catch (error) {
        next(error);
    }
});
exports.registerTeacher = registerTeacher;
const registerStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield studentModel_js_1.default.create(req.body);
        const hashedPassword = yield bcrypt_1.default.hash(student.password, 10);
        const response = new response_js_1.ResponseStructure(true, student);
        res.status(201).json({ message: "New student created successfully", student: student });
    }
    catch (error) {
        next(error);
    }
});
exports.registerStudent = registerStudent;
