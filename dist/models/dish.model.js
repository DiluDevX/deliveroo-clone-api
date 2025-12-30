"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dishSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: "Category",
    },
    restaurant: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: "Restaurant",
    },
}, { timestamps: true });
const Dish = (0, mongoose_1.model)("Dish", dishSchema);
exports.default = Dish;
