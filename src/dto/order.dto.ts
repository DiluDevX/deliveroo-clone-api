import { IOrderItems, IDiscount } from "../models/order.model";

export type OrderItemDTO = IOrderItems;

export type DiscountDTO = IDiscount;

export type CreateOrderRequestBodyDTO = {
  restaurantId: string;
  userId: string;
  items: OrderItemDTO[];
  subtotal: number;
  discount?: DiscountDTO;
  tax: number;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: "cash-on-delivery" | "card";
};

export type OrderResponseDTO = {
  id: string;
  restaurantId: string;
  userId: string;
  items: OrderItemDTO[];
  subtotal: number;
  discount?: DiscountDTO;
  tax: number;
  deliveryFee: number;
  totalAmount: number;
  status: "Done" | "Pending" | "Cancelled";
  createdAt: string;
  updatedAt: string;
};

export type GetAllOrdersResponseBodyDTO = OrderResponseDTO[];
export type CreateOrderResponseBodyDTO = OrderResponseDTO;
export type GetAnOrderResponseBodyDTO = OrderResponseDTO;
