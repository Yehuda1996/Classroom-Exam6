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
exports.registerStudent = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const studentModel_1 = __importDefault(require("../models/studentModel"));
const classModel_1 = __importDefault(require("../models/classModel"));
const response_1 = require("../types/response");
const registerStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, className } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newClass = yield new classModel_1.default({ name: className });
        const newStudent = new studentModel_1.default({
            username,
            email,
            password: hashedPassword,
            class: newClass
        });
        yield newStudent.save();
        res.status(201).json(new response_1.ResponseStructure(true, newStudent));
    }
    catch (error) {
        next(error);
    }
});
exports.registerStudent = registerStudent;
