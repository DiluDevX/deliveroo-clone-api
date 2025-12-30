"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidateParams = (paramsSchema) => (req, res, next) => {
    try {
        paramsSchema.parse(req.params);
        next();
    }
    catch (error) {
        res.status(400).json({
            message: "Validation Error",
            errors: error,
        });
    }
};
exports.default = ValidateParams;
