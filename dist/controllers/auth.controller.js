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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResetPasswordToken = exports.forgotPassword = exports.signup = exports.login = exports.checkEmail = void 0;
const users_service_1 = require("../services/users.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const PasswordHashBcrypt_1 = require("../utils/PasswordHashBcrypt");
const email_template_service_1 = require("../services/email-template.service");
const reset_password_model_1 = __importDefault(require("../models/reset-password.model"));
dotenv_1.default.config();
const SECRET_KEY = process.env.SECRET_KEY;
const checkEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield users_service_1.usersService.findOne({
            email: req.body.email,
        });
        if (!existingUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ firstName: existingUser.firstName }, SECRET_KEY);
        res.status(200).json({
            message: "Successful",
            data: {
                email: existingUser.email,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                token: token,
            },
        });
        return;
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
});
exports.checkEmail = checkEmail;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password } = req.body;
    try {
        const existingUser = yield users_service_1.usersService.findOne({ email });
        if (!existingUser) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const isValidPassword = yield (0, PasswordHashBcrypt_1.comparePasswords)(password, existingUser.password);
        if (!isValidPassword) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            firstName: existingUser.firstName,
            role: existingUser.role,
            lastName: existingUser.lastName,
            email: existingUser.email,
            phone: (_a = existingUser.phone) !== null && _a !== void 0 ? _a : "",
        }, SECRET_KEY);
        res.status(200).json({
            message: "Authenticated",
            data: {
                token,
            },
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const existingUser = yield users_service_1.usersService.findOne({ email: req.body.email });
        if (existingUser) {
            res.status(403).json({
                message: "User already exists",
            });
            return;
        }
        if (req.body.role === "admin") {
            if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "admin") {
                res.status(403).json({
                    message: "Only admin users can create admin accounts",
                });
                return;
            }
        }
        const role = req.body.role || "user";
        const hashedPassword = (0, PasswordHashBcrypt_1.hashPassword)(req.body.password);
        const createdUser = yield users_service_1.usersService.createNew(Object.assign(Object.assign({}, req.body), { password: hashedPassword, role }));
        const responseUser = __rest(createdUser, []);
        const token = jsonwebtoken_1.default.sign({ firstName: (_b = createdUser.firstName) !== null && _b !== void 0 ? _b : "" }, SECRET_KEY);
        res.status(201).json({
            message: "Success",
            data: {
                token,
                user: responseUser,
            },
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "Internal Server Error",
        });
        return;
    }
});
exports.signup = signup;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let existingUser;
        existingUser = yield users_service_1.usersService.findOne({
            email: req.body.userName,
        });
        existingUser !== null && existingUser !== void 0 ? existingUser : (existingUser = yield users_service_1.usersService.findOne({
            phone: req.body.userName,
        }));
        if (existingUser) {
            // user is found
            // therefore need to send the forgot password email
            (0, email_template_service_1.sendForgotPasswordEmail)(existingUser.email);
        }
        res.status(200).json({
            message: "Success",
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "Internal Server Error",
        });
        return;
    }
});
exports.forgotPassword = forgotPassword;
const validateResetPasswordToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingToken = yield reset_password_model_1.default.findOne({
            token: req.body.token,
        });
        if (!existingToken) {
            res.status(400).json({
                message: "Invalid or expired token",
            });
            return;
        }
        res.status(200).json({
            message: "Success",
            data: {
                email: existingToken.email,
                user_id: existingToken._id,
            },
        });
        return;
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "Internal Server Error",
        });
        return;
    }
});
exports.validateResetPasswordToken = validateResetPasswordToken;
