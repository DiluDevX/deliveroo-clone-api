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
exports.deleteARestaurant = exports.updateARestaurantFully = exports.updateARestaurantPartially = exports.getARestaurant = exports.createNewRestaurant = exports.getAllRestaurants = void 0;
const restaurant_service_1 = require("../services/restaurant.service");
const toResponseDTO = (restaurant) => ({
    id: restaurant._id.toString(),
    orgId: restaurant.orgId,
    name: restaurant.name,
    image: restaurant.image,
    description: restaurant.description,
    tags: restaurant.tags,
    openingAt: restaurant.openingAt,
    closingAt: restaurant.closingAt,
    minimumValue: restaurant.minimumValue,
    deliveryCharge: restaurant.deliveryCharge,
});
const getAllRestaurants = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurantsArray = yield restaurant_service_1.restaurantService.findAll();
        res.status(200).json({
            message: "OK",
            data: restaurantsArray.map(toResponseDTO),
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllRestaurants = getAllRestaurants;
const createNewRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdRestaurant = yield restaurant_service_1.restaurantService.createNew(req.body);
        res.status(201).json({
            message: "Created",
            data: toResponseDTO(createdRestaurant),
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.createNewRestaurant = createNewRestaurant;
const getARestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedOrgID = decodeURIComponent(req.params.orgID);
        const foundRestaurant = yield restaurant_service_1.restaurantService.findOne(decodedOrgID);
        if (!foundRestaurant) {
            res.status(404).json({ message: "Restaurant Not found" });
            return;
        }
        res.status(200).json({
            message: "OK",
            data: toResponseDTO(foundRestaurant),
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getARestaurant = getARestaurant;
const updateARestaurantFully = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRestaurant = yield restaurant_service_1.restaurantService.findByIdAndUpdate(req.params.id, req.body);
        if (!updatedRestaurant) {
            res.status(404).json({ message: "Restaurant Not found" });
            return;
        }
        res.status(200).json({
            message: "Updated Restaurant",
            data: toResponseDTO(updatedRestaurant),
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateARestaurantFully = updateARestaurantFully;
const updateARestaurantPartially = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRestaurant = yield restaurant_service_1.restaurantService.findAndUpdatePartially(req.params.id, req.body);
        if (!updatedRestaurant) {
            res.status(404).json({ message: "Restaurant Not found" });
            return;
        }
        res.status(200).json({
            message: "OK",
            data: toResponseDTO(updatedRestaurant),
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateARestaurantPartially = updateARestaurantPartially;
const deleteARestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedRestaurant = yield restaurant_service_1.restaurantService.findByIdAndDelete(req.params.id);
        if (!deletedRestaurant) {
            res.status(404).json({ message: "Restaurant Not found" });
            return;
        }
        res.status(200).json({
            message: "OK",
            data: toResponseDTO(deletedRestaurant),
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.deleteARestaurant = deleteARestaurant;
