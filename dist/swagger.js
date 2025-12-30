"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerUi = exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Deliveroo Clone API",
            version: "1.0.0",
            description: "A food delivery REST API built with Express & MongoDB",
        },
        servers: [
            {
                url: "http://localhost:4000",
                description: "Development server",
            },
        ],
        tags: [
            { name: "Health", description: "API health check" },
            { name: "Auth", description: "Authentication endpoints" },
            { name: "Restaurants", description: "Restaurant management" },
            { name: "Categories", description: "Menu categories" },
            { name: "Dishes", description: "Dish management" },
            { name: "Cart", description: "Shopping cart" },
            { name: "Users", description: "User management" },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
var swagger_ui_express_1 = require("swagger-ui-express");
Object.defineProperty(exports, "swaggerUi", { enumerable: true, get: function () { return __importDefault(swagger_ui_express_1).default; } });
