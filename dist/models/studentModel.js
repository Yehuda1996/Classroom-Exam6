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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const StudentSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, "username is required."],
        unique: true,
        minlength: [3, "username must be at least 3 chars long"],
        maxlength: [30, "username cannot exceed 30 chars!"],
    },
    email: {
        type: String,
        required: [true, "email is required."],
        unique: true,
        validate: {
            validator: function (value) {
                return validator_1.default.isEmail(value);
            },
            message: "Please provide valid email address"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "password must be at least 8 characters long"],
    },
    class: {
        type: mongoose_1.Types.ObjectId,
        ref: "Class",
        required: [true, "Providing a class is required"]
    },
    grades: [{
            grade: {
                type: Number,
                required: true
            }
        }]
});
exports.default = mongoose_1.default.model("Student", StudentSchema);
