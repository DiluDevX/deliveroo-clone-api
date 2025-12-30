"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidateQuery = (querySchema) => (req, res, next) => {
    try {
        querySchema.parse(req.query);
        next();
    }
    catch (error) {
        res.status(400).json({
            message: "Validation Error",
            errors: error,
        });
    }
};
exports.default = ValidateQuery;
