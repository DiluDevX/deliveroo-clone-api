"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPartiallyRequestBodySchema = exports.updateUserFullyRequestBodySchema = exports.usersCreatePasswordSchema = exports.usersCheckPasswordSchema = exports.usersPhoneSchema = exports.usersEmailSchema = exports.usersLastNameSchema = exports.userFirstNameSchema = void 0;
const zod_1 = require("zod");
exports.userFirstNameSchema = zod_1.z.string().min(3).max(20);
exports.usersLastNameSchema = zod_1.z.string().min(3).max(20);
exports.usersEmailSchema = zod_1.z.string().email();
exports.usersPhoneSchema = zod_1.z.string().min(10).max(10);
exports.usersCheckPasswordSchema = zod_1.z.string();
exports.usersCreatePasswordSchema = zod_1.z
    .string()
    .min(3, "Password must be at least 8 characters.")
    .max(20, "Password must be at most 20 characters.")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/, "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.");
exports.updateUserFullyRequestBodySchema = zod_1.z.object({
    firstName: exports.userFirstNameSchema,
    lastName: exports.usersLastNameSchema,
    email: exports.usersEmailSchema,
    phone: exports.usersPhoneSchema,
    password: exports.usersCreatePasswordSchema,
});
exports.updateUserPartiallyRequestBodySchema = zod_1.z.object({
    firstName: exports.userFirstNameSchema.optional(),
    lastName: exports.usersLastNameSchema.optional(),
    email: exports.usersEmailSchema.optional(),
    phone: exports.usersPhoneSchema.optional(),
    password: exports.usersCreatePasswordSchema.optional(),
});
