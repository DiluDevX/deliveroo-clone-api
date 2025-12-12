import { Request, Response } from "express";
import { CommonResponseDTO, ObjectIdPathParamsDTO } from "../dto/common.dto";
import { AddToCart, UpdateCartItem, Cart } from "../schema/cart.schema";
import { cartService } from "../services/cart.service";

// Get user's cart
export const getCart = async (
  req: Request<ObjectIdPathParamsDTO>,
  res: Response<CommonResponseDTO<Cart | null>>,
) => {
  try {
    const cart = await cartService.findByUserId(req.params.id);

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
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Add item to cart
export const addToCart = async (
  req: Request<unknown, unknown, AddToCart>,
  res: Response<CommonResponseDTO<Cart>>,
) => {
  try {
    const { userId, item } = req.body;

    const cart = await cartService.addItem(userId, item);

    res.status(200).json({
      message: "Item Added to Cart",
      data: cart,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Update cart item quantity
export const updateCartItem = async (
  req: Request<{ userId: string; dishId: string }, unknown, UpdateCartItem>,
  res: Response<CommonResponseDTO<Cart | null>>,
) => {
  try {
    const { userId, dishId } = req.params;
    const { quantity } = req.body;

    const cart = await cartService.updateItemQuantity(userId, dishId, quantity);

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
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Remove item from cart
export const removeFromCart = async (
  req: Request<{ userId: string; dishId: string }>,
  res: Response<CommonResponseDTO<Cart | null>>,
) => {
  try {
    const { userId, dishId } = req.params;

    const cart = await cartService.removeItem(userId, dishId);

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
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Clear entire cart
export const clearCart = async (
  req: Request<ObjectIdPathParamsDTO>,
  res: Response<CommonResponseDTO<Cart | null>>,
) => {
  try {
    const cart = await cartService.clearCart(req.params.id);

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
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
