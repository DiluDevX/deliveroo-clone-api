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
exports.categoryService = void 0;
// src/services/category.service.ts
const mongoose_1 = require("mongoose");
const category_model_1 = __importDefault(require("../models/category.model"));
// Transform function for ObjectId conversion
const toDbDocument = (data) => (Object.assign(Object.assign({}, data), { restaurant: new mongoose_1.Types.ObjectId(data.restaurant) }));
const toPartialDbDocument = (data) => {
    const result = Object.assign({}, data);
    if (data.restaurant) {
        result.restaurant = new mongoose_1.Types.ObjectId(data.restaurant);
    }
    return result;
};
// Service methods
const findAll = (filters, populate) => __awaiter(void 0, void 0, void 0, function* () {
    const query = category_model_1.default.find(filters);
    if (populate) {
        const fields = Array.isArray(populate) ? populate : [populate];
        fields.forEach((field) => query.populate(field));
    }
    return query;
});
const createNew = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_model_1.default.create(toDbDocument(data));
    return category.toObject();
});
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return category_model_1.default.findById(id);
});
const findByIdAndUpdate = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return category_model_1.default.findByIdAndUpdate(id, toDbDocument(data), { new: true });
});
const findAndUpdatePartially = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return category_model_1.default.findByIdAndUpdate(id, toPartialDbDocument(data), {
        new: true,
    });
});
const findByIdAndDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return category_model_1.default.findByIdAndDelete(id);
});
exports.categoryService = {
    findById,
    createNew,
    findAll,
    findByIdAndUpdate,
    findAndUpdatePartially,
    findByIdAndDelete,
};
