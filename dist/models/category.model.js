"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    restaurant: {
        required: true,
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "Restaurant",
    },
}, { timestamps: true });
categorySchema.virtual("dishes", {
    ref: "Dish",
    localField: "_id",
    foreignField: "category",
});
categorySchema.set("toJSON", { virtuals: true });
const Category = mongoose_1.default.model("Category", categorySchema);
exports.default = Category;
