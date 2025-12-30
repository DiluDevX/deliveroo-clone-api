"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const restaurantSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    tags: [String],
    openingAt: {
        type: String,
        required: true,
    },
    closingAt: {
        type: String,
        required: true,
    },
    orgId: {
        type: String,
        required: true,
        unique: true,
    },
    minimumValue: {
        type: String,
        required: true,
    },
    deliveryCharge: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Restaurant = (0, mongoose_1.model)("Restaurant", restaurantSchema);
exports.default = Restaurant;
