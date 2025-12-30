"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidateBody = (bodySchema) => (req, res, next) => {
    try {
        bodySchema.parse(req.body);
        next();
    }
    catch (error) {
        res.status(400).json({
            message: "Validation Error",
            errors: error,
        });
    }
};
exports.default = ValidateBody;
