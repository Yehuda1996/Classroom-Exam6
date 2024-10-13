"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_js_1 = require("../types/response.js");
const errorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENVIORMENT === "dev") {
        console.error(err.stack);
    }
    const response = new response_js_1.ResponseStructure(false, undefined, err.message || err);
    res.status(500).json(response);
};
exports.errorHandler = errorHandler;
