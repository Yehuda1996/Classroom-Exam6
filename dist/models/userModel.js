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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var Role;
(function (Role) {
    Role["Student"] = "student";
    Role["Teacher"] = "teacher";
})(Role || (exports.Role = Role = {}));
const UserSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    passportId: {
        type: String,
        required: [true, "Passport ID is required"],
        minLength: 9,
        maxLength: 9,
        match: /^[0-9]{9}$/,
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
