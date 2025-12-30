"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const passwordResetTokenSchema = new mongoose_1.Schema({
    email: {
        type: String,
        ref: "User",
        required: true,
    },
    userId: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
}, { timestamps: true });
const PasswordResetToken = (0, mongoose_1.model)("PasswordResetToken", passwordResetTokenSchema);
exports.default = PasswordResetToken;
