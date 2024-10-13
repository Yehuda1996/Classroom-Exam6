"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_js_1 = require("../controllers/authController.js");
const registerRouter = (0, express_1.Router)();
registerRouter.post('/teacher/register', authController_js_1.registerTeacher);
exports.default = registerRouter;
