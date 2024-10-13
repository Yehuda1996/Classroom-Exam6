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
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const teacherModel_1 = __importDefault(require("../models/teacherModel"));
const studentModel_1 = __importDefault(require("../models/studentModel"));
const response_1 = require("../types/response");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = (yield teacherModel_1.default.findOne({ email })) || (yield studentModel_1.default.findOne({ email }));
        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
        }
        else {
            const isUser = yield bcrypt_1.default.compare(password, user.password);
            if (!isUser)
                res.status(401).json({ error: "Invalid credentials" });
            const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user instanceof teacherModel_1.default ? 'teacher' : 'student' }, 'SECRET');
            res.cookie('token', token).json(new response_1.ResponseStructure(true, token));
        }
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
