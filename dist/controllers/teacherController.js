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
exports.registerTeacher = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const teacherModel_1 = __importDefault(require("../models/teacherModel"));
const classModel_1 = __importDefault(require("../models/classModel"));
const response_1 = require("../types/response");
const registerTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, className } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newClass = yield new classModel_1.default({ name: className });
        const newTeacher = new teacherModel_1.default({
            username,
            email,
            password: hashedPassword,
            class: newClass
        });
        yield newTeacher.save();
        res.status(201).json(new response_1.ResponseStructure(true, newTeacher));
    }
    catch (error) {
        next(error);
    }
});
exports.registerTeacher = registerTeacher;
