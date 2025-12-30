"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOAuthTokenRequestBodySchema = exports.validateResetPasswordRequestBodySchema = exports.resetPasswordRequestBodySchema = exports.forgotPasswordRequestBodySchema = exports.signupRequestBodySchema = exports.loginRequestBodySchema = exports.checkEmailRequestBodySchema = void 0;
const zod_1 = require("zod");
const users_schema_1 = require("./users.schema");
exports.checkEmailRequestBodySchema = zod_1.z.object({
    email: users_schema_1.usersEmailSchema,
});
exports.loginRequestBodySchema = zod_1.z.object({
    email: users_schema_1.usersEmailSchema,
    password: users_schema_1.usersCheckPasswordSchema,
});
exports.signupRequestBodySchema = zod_1.z.object({
    firstName: users_schema_1.userFirstNameSchema,
    lastName: users_schema_1.usersLastNameSchema,
    email: users_schema_1.usersEmailSchema,
    phone: users_schema_1.usersPhoneSchema.optional(),
    password: users_schema_1.usersCreatePasswordSchema,
    role: zod_1.z.enum(["admin", "user"]).default("user"),
});
exports.forgotPasswordRequestBodySchema = zod_1.z.object({
    userName: zod_1.z.string().min(1),
});
exports.resetPasswordRequestBodySchema = zod_1.z.object({
    password: users_schema_1.usersCreatePasswordSchema,
    token: zod_1.z.string().min(1),
});
exports.validateResetPasswordRequestBodySchema = zod_1.z.object({
    token: zod_1.z.string().min(10),
});
exports.validateOAuthTokenRequestBodySchema = zod_1.z.object({
    token: zod_1.z.string().min(10),
});
