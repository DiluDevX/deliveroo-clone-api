import { Types } from "mongoose";
import Cart from "../models/cart.model";
import { CartItem, Cart as CartType } from "../schema/cart.schema";

// Get the document type from the Cart model
type CartDocument = typeof Cart extends { prototype: infer U } ? U : never;

// Transform Mongoose document to plain object
const toPlainObject = (cart: CartDocument): CartType => {
  return {
    userId: (cart.userId as Types.ObjectId).toString(),
    items: cart.items.map((item: (typeof cart.items)[number]) => ({
      dishId: item.dishId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      restaurantId: item.restaurantId,
      image: item.image ?? undefined,
      description: item.description ?? undefined,
    })),
    restaurantId: cart.restaurantId,
  };
};

const findByUserId = async (userId: string): Promise<CartType | null> => {
  const cart = await Cart.findOne({ userId });
  return cart ? toPlainObject(cart) : null;
};

const addItem = async (userId: string, item: CartItem): Promise<CartType> => {
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [item],
      restaurantId: item.restaurantId,
    });
  } else {
    const existingItemIndex = cart.items.findIndex(
      (cartItem) => cartItem.dishId === item.dishId,
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += item.quantity;
    } else {
      cart.items.push(item);
    }

    await cart.save();
  }

  return toPlainObject(cart);
};

const updateItemQuantity = async (
  userId: string,
  dishId: string,
  quantity: number,
): Promise<CartType | null> => {
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return null;
  }

  const itemIndex = cart.items.findIndex((item) => item.dishId === dishId);

  if (itemIndex === -1) {
    return null;
  }

  cart.items[itemIndex].quantity = quantity;
  await cart.save();

  return toPlainObject(cart);
};

const removeItem = async (
  userId: string,
  dishId: string,
): Promise<CartType | null> => {
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return null;
  }

  const itemIndex = cart.items.findIndex((item) => item.dishId === dishId);
  if (itemIndex > -1) {
    cart.items.splice(itemIndex, 1);
  }
  await cart.save();

  return toPlainObject(cart);
};

const clearCart = async (userId: string): Promise<CartType | null> => {
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return null;
  }

  cart.items.splice(0, cart.items.length);
  cart.restaurantId = undefined;
  await cart.save();

  return toPlainObject(cart);
};

export const cartService = {
  findByUserId,
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart,
};
