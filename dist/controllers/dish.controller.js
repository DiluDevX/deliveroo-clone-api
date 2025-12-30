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
exports.deleteDish = exports.updateDishFully = exports.updateDishPartially = exports.getADish = exports.createNewDish = exports.getAllDishes = void 0;
const dish_service_1 = require("../services/dish.service");
const category_service_1 = require("../services/category.service");
const restaurant_service_1 = require("../services/restaurant.service");
const getAllDishes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = {};
        if (req.query.restaurant) {
            filters.restaurant = req.query.restaurant;
        }
        if (req.query.category) {
            filters.category = req.query.category;
        }
        const dishesArray = yield dish_service_1.dishService.findAll(filters, req.query.populate);
        res.status(200).json({
            message: "OK",
            data: dishesArray,
        });
        return;
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({
            message: "Internal Server Error",
        });
        return;
    }
});
exports.getAllDishes = getAllDishes;
const createNewDish = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundRestaurant = yield restaurant_service_1.restaurantService.findOne(req.body.restaurant);
        if (!foundRestaurant) {
            res.status(404).json({
                message: "Restaurant Not Found",
            });
            return;
        }
        const foundCategory = yield category_service_1.categoryService.findById(req.body.category);
        if (!foundCategory) {
            res.status(404).json({
                message: "Category Not Found",
            });
            return;
        }
        const createdDish = yield dish_service_1.dishService.createNew(req.body);
        res.status(201).json({
            message: "OK",
            data: createdDish,
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.createNewDish = createNewDish;
const getADish = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundDish = yield dish_service_1.dishService.findById(req.params.id);
        if (!foundDish) {
            res.status(404).json({
                message: "Dish not Found",
            });
            return;
        }
        res.status(200).json({
            message: "OK",
            data: foundDish,
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.getADish = getADish;
const updateDishFully = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundCategory = yield category_service_1.categoryService.findById(req.body.category);
        if (!foundCategory) {
            res.status(404).json({
                message: "Category Not Found",
            });
            return;
        }
        const updatedDish = yield dish_service_1.dishService.findByIdAndUpdate(req.params.id, Object.assign(Object.assign({}, req.body), { restaurant: foundCategory.restaurant }));
        if (!updatedDish) {
            res.status(404).json({
                message: "Dish Not Found",
            });
            return;
        }
        res.status(200).json({
            message: "OK",
            data: updatedDish,
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.updateDishFully = updateDishFully;
const updateDishPartially = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let foundCategory;
        if (req.body.category) {
            foundCategory = yield category_service_1.categoryService.findById(req.body.category);
            if (!foundCategory) {
                res.status(404).json({
                    message: "Category Not Found",
                });
                return;
            }
        }
        const patchedDish = yield dish_service_1.dishService.findAndUpdatePartially(req.params.id, Object.assign(Object.assign({}, req.body), (foundCategory
            ? {
                restaurant: foundCategory.restaurant,
            }
            : {})));
        if (!patchedDish) {
            res.status(404).json({
                message: "Dish Not Found",
            });
            return;
        }
        res.status(200).json({
            message: "OK",
            data: patchedDish,
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.updateDishPartially = updateDishPartially;
const deleteDish = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedDish = yield dish_service_1.dishService.findByIdAndDelete(req.params.id);
        if (!deletedDish) {
            res.status(404).json({
                message: "Dish Not Found",
            });
            return;
        }
        res.status(200).json({
            message: "OK",
            data: deletedDish,
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.deleteDish = deleteDish;
