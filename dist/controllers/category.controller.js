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
const restaurant_schema_1 = require("../schema/restaurant.schema");
const category_service_1 = require("../services/category.service");
const restaurant_service_1 = require("../services/restaurant.service");
const toResponseDTO = (category) => ({
    id: category._id.toString(),
    name: category.name,
    restaurant: category.restaurant.toString(),
});
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = {};
        if (req.query.restaurant) {
            filters.restaurant =
                typeof req.query.restaurant === "number"
                    ? req.query.restaurant.toString()
                    : req.query.restaurant;
        }
        const categoriesArray = yield category_service_1.categoryService.findAll(filters, req.query.populate);
        res.status(200).json({
            message: "OK",
            data: categoriesArray.map(toResponseDTO),
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({ message: "Internal Server Error" });
    }
});
const createNewCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedOrgID = decodeURIComponent(req.params.orgID);
        const parseResult = restaurant_schema_1.restaurantPathParamsSchema.safeParse({
            orgID: decodedOrgID,
        });
        if (!parseResult.success) {
            res.status(400).json({ message: "Invalid orgID" });
            return;
        }
        const foundRestaurant = (yield restaurant_service_1.restaurantService.findOne(req.body.restaurant));
        if (!foundRestaurant) {
            res.status(404).json({ message: "Restaurant Not Found" });
            return;
        }
        const createdCategory = yield category_service_1.categoryService.createNew(req.body);
        res.status(201).json({
            message: "Created",
            data: toResponseDTO(createdCategory),
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({ message: "Internal Server Error" });
    }
});
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundCategory = yield category_service_1.categoryService.findById(req.params.id);
        if (!foundCategory) {
            res.status(404).json({ message: "Category Not Found" });
            return;
        }
        res.status(200).json({
            message: "OK",
            data: toResponseDTO(foundCategory),
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({ message: "Internal Server Error" });
    }
});
const updateCategoryFully = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundRestaurant = yield restaurant_service_1.restaurantService.findOne(req.body.restaurant);
        if (!foundRestaurant) {
            res.status(404).json({ message: "Restaurant Not Found" });
            return;
        }
        const updatedCategory = yield category_service_1.categoryService.findByIdAndUpdate(req.params.id, req.body);
        if (!updatedCategory) {
            res.status(404).json({ message: "Category Not Found" });
            return;
        }
        res.status(200).json({
            message: "OK",
            data: toResponseDTO(updatedCategory),
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({ message: "Internal Server Error" });
    }
});
const updateCategoryPartially = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body) {
            res.status(400).json({ message: "Request body is required" });
            return;
        }
        if (req.body.restaurant) {
            const foundRestaurant = yield restaurant_service_1.restaurantService.findOne(req.body.restaurant);
            if (!foundRestaurant) {
                res.status(404).json({ message: "Restaurant Not Found" });
                return;
            }
        }
        const patchedCategory = yield category_service_1.categoryService.findAndUpdatePartially(req.params.id, req.body);
        if (!patchedCategory) {
            res.status(404).json({ message: "Category Not Found" });
            return;
        }
        res.status(200).json({
            message: "OK",
            data: toResponseDTO(patchedCategory),
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({ message: "Internal Server Error" });
    }
});
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCategory = yield category_service_1.categoryService.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            res.status(404).json({ message: "Category Not Found" });
            return;
        }
        res.status(200).json({
            message: "OK",
            data: toResponseDTO(deletedCategory),
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({ message: "Internal server error" });
    }
});
module.exports = {
    getAllCategories,
    createNewCategory,
    getCategory,
    updateCategoryPartially,
    updateCategoryFully,
    deleteCategory,
};
