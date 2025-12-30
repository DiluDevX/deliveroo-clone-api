"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET_KEY = process.env.SECRET_KEY;
const authorizeUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.replace("Bearer ", "");
    if (!token) {
        return res.status(401).send({ error: "Access denied. No token provided" });
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.user = decodedToken;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).send({ error: "Access denied. Invalid token" });
    }
};
exports.authorizeUser = authorizeUser;
