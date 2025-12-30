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
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.removeFromCart = exports.updateCartItem = exports.addToCart = exports.getCart = void 0;
const cart_service_1 = require("../services/cart.service");
// Get user's cart
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield cart_service_1.cartService.findByUserId(req.params.id);
        if (!cart) {
            res.status(404).json({
                message: "Cart Not Found",
            });
            return;
        }
        res.status(200).json({
            message: "OK",
            data: cart,
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.getCart = getCart;
// Add item to cart
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, item } = req.body;
        const cart = yield cart_service_1.cartService.addItem(userId, item);
        res.status(200).json({
            message: "Item Added to Cart",
            data: cart,
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.addToCart = addToCart;
// Update cart item quantity
const updateCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, dishId } = req.params;
        const { quantity } = req.body;
        const cart = yield cart_service_1.cartService.updateItemQuantity(userId, dishId, quantity);
        if (!cart) {
            res.status(404).json({
                message: "Cart or Item Not Found",
            });
            return;
        }
        res.status(200).json({
            message: "Cart Item Updated",
            data: cart,
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.updateCartItem = updateCartItem;
// Remove item from cart
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, dishId } = req.params;
        const cart = yield cart_service_1.cartService.removeItem(userId, dishId);
        if (!cart) {
            res.status(404).json({
                message: "Cart or Item Not Found",
            });
            return;
        }
        res.status(200).json({
            message: "Item Removed from Cart",
            data: cart,
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.removeFromCart = removeFromCart;
// Clear entire cart
const clearCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield cart_service_1.cartService.clearCart(req.params.id);
        if (!cart) {
            res.status(404).json({
                message: "Cart Not Found",
            });
            return;
        }
        res.status(200).json({
            message: "Cart Cleared",
            data: cart,
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.clearCart = clearCart;
