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
exports.deleteAnUser = exports.updateAnUserFully = exports.updateAnUserPartially = exports.getAnUser = exports.getAllUsers = exports.findAndUpdateUserPassword = void 0;
const users_service_1 = require("../services/users.service");
const dotenv_1 = __importDefault(require("dotenv"));
const PasswordHashBcrypt_1 = require("../utils/PasswordHashBcrypt");
const reset_password_model_1 = __importDefault(require("../models/reset-password.model"));
dotenv_1.default.config();
const toResponseDTO = (user) => {
    var _a;
    return ({
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: (_a = user.phone) !== null && _a !== void 0 ? _a : undefined,
        role: user.role,
    });
};
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersArray = yield users_service_1.usersService.findAll();
        res.status(200).json({
            message: "OK",
            data: usersArray.map(toResponseDTO),
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllUsers = getAllUsers;
const getAnUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = yield users_service_1.usersService.findById(req.params.id);
        if (!foundUser) {
            res.status(404).json({ message: "User Not found" });
            return;
        }
        res.status(200).json({
            message: "OK",
            data: toResponseDTO(foundUser),
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAnUser = getAnUser;
const updateAnUserFully = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield users_service_1.usersService.findByIdAndUpdate(req.params.id, req.body);
        if (!updatedUser) {
            res.status(404).json({ message: "User Not found" });
            return;
        }
        res.status(200).json({
            message: "Updated User",
            data: toResponseDTO(updatedUser),
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateAnUserFully = updateAnUserFully;
const updateAnUserPartially = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.password) {
            req.body.password = (0, PasswordHashBcrypt_1.hashPassword)(req.body.password);
            yield reset_password_model_1.default.deleteOne({ _id: req.params.id });
        }
        const updatedUser = yield users_service_1.usersService.findAndUpdatePartially(req.params.id, req.body);
        if (!updatedUser) {
            res.status(404).json({ message: "User Not Found" });
            return;
        }
        res.status(200).json({
            message: "OK",
            data: toResponseDTO(updatedUser),
        });
        return;
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
});
exports.updateAnUserPartially = updateAnUserPartially;
const deleteAnUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield users_service_1.usersService.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            res.status(404).json({ message: "User Not found" });
            return;
        }
        res.status(200).json({
            message: "OK",
            data: toResponseDTO(deletedUser),
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.deleteAnUser = deleteAnUser;
const findAndUpdateUserPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const hashedPassword = (0, PasswordHashBcrypt_1.hashPassword)(password);
    try {
        const updatedUserPassword = yield users_service_1.usersService.findAndUpdatePartially(req.params.id, { password: hashedPassword });
        if (!updatedUserPassword) {
            res.status(404).json({ message: "User Not found" });
            return;
        }
        res.status(200).json({
            message: "Updated",
            data: toResponseDTO(updatedUserPassword),
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.findAndUpdateUserPassword = findAndUpdateUserPassword;
