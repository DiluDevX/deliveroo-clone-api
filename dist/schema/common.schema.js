"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIdAndDishIdPathParamsSchema = exports.userIdPathParamsSchema = exports.objectIdPathParamsSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.objectIdPathParamsSchema = zod_1.z.object({
    id: zod_1.z.string().refine((id) => mongoose_1.Types.ObjectId.isValid(id)),
});
exports.userIdPathParamsSchema = zod_1.z.object({
    userId: zod_1.z.string().refine((id) => mongoose_1.Types.ObjectId.isValid(id)),
});
exports.userIdAndDishIdPathParamsSchema = zod_1.z.object({
    userId: zod_1.z.string().refine((id) => mongoose_1.Types.ObjectId.isValid(id)),
    dishId: zod_1.z.string().refine((id) => mongoose_1.Types.ObjectId.isValid(id)),
});
