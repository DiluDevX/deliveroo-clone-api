"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const common_routes_1 = __importDefault(require("./routes/common.routes"));
const restaurant_routes_1 = __importDefault(require("./routes/restaurant.routes"));
const dish_routes_1 = __importDefault(require("./routes/dish.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const cors_1 = __importDefault(require("cors"));
const swagger_1 = require("./swagger");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)({ origin: "http://localhost:5173" }));
app.use(express_1.default.json());
app.use("/auth", auth_routes_1.default);
app.use("/restaurants", restaurant_routes_1.default);
app.use("/dishes", dish_routes_1.default);
app.use("/categories", category_routes_1.default);
app.use("/users", users_routes_1.default);
app.use("/cart", cart_routes_1.default);
app.use("/api-docs", swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.swaggerSpec));
app.use(common_routes_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const databaseUrl = process.env.DATABASE_URL;
        if (!databaseUrl) {
            throw new Error("DATABASE_URL is not defined");
        }
        yield mongoose_1.default.connect(databaseUrl);
        app.listen(port, () => {
            console.log(`deliveroo-api listening on port ${port}`);
        });
    }
    catch (error) {
        console.log(error, "error");
    }
});
startServer();
