"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "classroom app",
        version: "1.0.0",
        description: "this is the decription of the classroom app"
    },
    servers: [
        {
            url: "http://localhost:5001"
        }
    ]
};
const options = {
    definition: swaggerDefinition,
    apis: ["./src/routes/*.ts", "./src/server.ts"]
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
