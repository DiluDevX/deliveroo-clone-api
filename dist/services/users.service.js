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
exports.usersService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
// Service methods
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.default.find();
});
const createNew = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.default.create(data);
});
const findOne = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.default.findOne(data);
});
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.default.findById(id);
});
const findByIdAndUpdate = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.default.findByIdAndUpdate(id, data, { new: true });
});
const findAndUpdatePartially = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.default.findByIdAndUpdate(id, data, { new: true });
});
const findByIdAndDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.default.findByIdAndDelete(id);
});
exports.usersService = {
    createNew,
    findAll,
    findByIdAndUpdate,
    findAndUpdatePartially,
    findByIdAndDelete,
    findOne,
    findById,
};
