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
exports.dishService = void 0;
const mongoose_1 = require("mongoose");
const dish_model_1 = __importDefault(require("../models/dish.model"));
// Transform functions for ObjectId conversion
const toDbDocument = (data) => (Object.assign(Object.assign({}, data), { category: new mongoose_1.Types.ObjectId(data.category), restaurant: new mongoose_1.Types.ObjectId(data.restaurant) }));
const toPartialDbDocument = (data) => {
    const result = Object.assign({}, data);
    if (data.category) {
        result.category = new mongoose_1.Types.ObjectId(data.category);
    }
    if (data.restaurant) {
        result.restaurant = new mongoose_1.Types.ObjectId(data.restaurant);
    }
    return result;
};
// Service methods
const findAll = (filters, populate) => __awaiter(void 0, void 0, void 0, function* () {
    const query = dish_model_1.default.find(filters);
    if (populate) {
        const fields = Array.isArray(populate) ? populate : populate.split(" ");
        fields.forEach((field) => query.populate(field));
    }
    return query;
});
const createNew = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return dish_model_1.default.create(toDbDocument(data));
});
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return dish_model_1.default.findById(id);
});
const findByIdAndUpdate = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return dish_model_1.default.findByIdAndUpdate(id, toDbDocument(data), { new: true });
});
const findAndUpdatePartially = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return dish_model_1.default.findByIdAndUpdate(id, toPartialDbDocument(data), { new: true });
});
const findByIdAndDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return dish_model_1.default.findByIdAndDelete(id);
});
exports.dishService = {
    findById,
    createNew,
    findAll,
    findByIdAndUpdate,
    findAndUpdatePartially,
    findByIdAndDelete,
};
