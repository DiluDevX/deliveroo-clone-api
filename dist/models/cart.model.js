"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartItemSchema = new mongoose_1.Schema({
    dishId: { type: String, required: true, ref: "Dish" },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String },
    description: { type: String },
}, { _id: false, timestamps: true });
const cartSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId || String,
        ref: "User",
        required: true,
        unique: true,
    },
    items: [cartItemSchema],
    restaurantId: { type: String },
}, { timestamps: true });
const Cart = (0, mongoose_1.model)("Cart", cartSchema);
exports.default = Cart;
