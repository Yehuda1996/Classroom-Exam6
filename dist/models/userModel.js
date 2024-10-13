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
exports.Role = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
var Role;
(function (Role) {
    Role["Student"] = "student";
    Role["Teacher"] = "teacher";
})(Role || (exports.Role = Role = {}));
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
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
    },
    grades: {
        type: [{ subject: { type: String }, grade: { type: Number } }],
    },
    role: {
        type: String,
        enum: Object.values(Role),
        required: true,
    },
    class: {
        type: mongoose_1.Types.ObjectId,
        ref: "Class"
    }
});
exports.default = mongoose_1.default.model("User", UserSchema);
