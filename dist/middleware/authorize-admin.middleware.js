"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuthorizeRole = exports.authorizeRole = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET_KEY = process.env.SECRET_KEY;
const authorizeRole = (role) => {
    return (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer "))
            ? authHeader.split(" ")[1]
            : null;
        if (!token) {
            res.status(401).json({ error: "Access denied. No token provided." });
            return;
        }
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, SECRET_KEY);
            req.user = decodedToken;
            if (req.user.role !== role) {
                res.status(403).json({ message: "Access denied. Insufficient role." });
                return;
            }
            next();
        }
        catch (error) {
            console.log(error);
            res.status(401).json({ error: "Access denied. Invalid token." });
            return;
        }
    };
};
exports.authorizeRole = authorizeRole;
const optionalAuthorizeRole = (role) => {
    return (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer "))
            ? authHeader.split(" ")[1]
            : null;
        if (!token) {
            next();
            return;
        }
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, SECRET_KEY);
            req.user = decodedToken;
            if (req.user.role !== role) {
                res.status(403).json({ message: "Access denied. Insufficient role." });
                return;
            }
            next();
        }
        catch (error) {
            console.log(error);
            res.status(401).json({ error: "Access denied. Invalid token." });
            return;
        }
    };
};
exports.optionalAuthorizeRole = optionalAuthorizeRole;
