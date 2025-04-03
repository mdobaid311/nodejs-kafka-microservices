import { CartRepositoryType } from "../repository/cart.repository";
import { OrderRepositoryType } from "../repository/order.repository";

export const CreateOrder = async (
  userId: number,
  repo: OrderRepositoryType,
  cartRepo: CartRepositoryType
) => {
  return { message: "Order created" };
};

export const UpdateOrder = async (
  orderId: number,
  status: string,
  repo: OrderRepositoryType
) => {
  return { message: "Order updated" };
};

export const GetOrder = async (orderId: number, repo: OrderRepositoryType) => {
  return { message: "Order retrieved" };
};

export const GetOrders = (userId: number, repo: OrderRepositoryType) => {
  return { message: "Orders retrieved" };
};

export const DeleteOrder = async (
  orderId: number,
  repo: OrderRepositoryType
) => {
  return { message: "Order deleted" };
};

export const HandleSubscription = async (message: any) => {};
