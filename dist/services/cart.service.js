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
exports.cartService = void 0;
const cart_model_1 = __importDefault(require("../models/cart.model"));
// Transform Mongoose document to plain object
const toPlainObject = (cart) => {
    return {
        userId: cart.userId.toString(),
        items: cart.items.map((item) => {
            var _a, _b;
            return ({
                dishId: item.dishId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                restaurantId: item.restaurantId,
                image: (_a = item.image) !== null && _a !== void 0 ? _a : undefined,
                description: (_b = item.description) !== null && _b !== void 0 ? _b : undefined,
            });
        }),
        restaurantId: cart.restaurantId,
    };
};
const findByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.default.findOne({ userId });
    return cart ? toPlainObject(cart) : null;
});
const addItem = (userId, item) => __awaiter(void 0, void 0, void 0, function* () {
    let cart = yield cart_model_1.default.findOne({ userId });
    if (cart) {
        const existingItemIndex = cart.items.findIndex((cartItem) => cartItem.dishId === item.dishId);
        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += item.quantity;
        }
        else {
            cart.items.push(item);
        }
        yield cart.save();
    }
    else {
        cart = yield cart_model_1.default.create({
            userId,
            items: [item],
            restaurantId: item.restaurantId,
        });
    }
    return toPlainObject(cart);
});
const updateItemQuantity = (userId, dishId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.default.findOne({ userId });
    if (!cart) {
        return null;
    }
    const itemIndex = cart.items.findIndex((item) => item.dishId === dishId);
    if (itemIndex === -1) {
        return null;
    }
    cart.items[itemIndex].quantity = quantity;
    yield cart.save();
    return toPlainObject(cart);
});
const removeItem = (userId, dishId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.default.findOne({ userId });
    if (!cart) {
        return null;
    }
    const itemIndex = cart.items.findIndex((item) => item.dishId === dishId);
    if (itemIndex > -1) {
        cart.items.splice(itemIndex, 1);
    }
    yield cart.save();
    return toPlainObject(cart);
});
const clearCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.default.findOne({ userId });
    if (!cart) {
        return null;
    }
    cart.items.splice(0, cart.items.length);
    cart.restaurantId = undefined;
    yield cart.save();
    return toPlainObject(cart);
});
exports.cartService = {
    findByUserId,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
};
