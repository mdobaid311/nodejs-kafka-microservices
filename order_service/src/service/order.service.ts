import { OrderLineItemType, OrderWithLineItems } from "../dto/orderRequest.dto";
import { CartRepositoryType } from "../repository/cart.repository";
import { OrderRepositoryType } from "../repository/order.repository";
import { MessageType, OrderStatus } from "../types";
import { SendCreateOrderMessage } from "./broker.service";

export const CreateOrder = async (
  userId: number,
  repo: OrderRepositoryType,
  cartRepo: CartRepositoryType
) => {
  // find cart by customer id
  const cart = await cartRepo.findCart(userId);
  if (!cart) {
    throw new Error("Cart not found");
  }
  // calculate total order amount
  let cartTotal = 0;
  let orderLineItems: OrderLineItemType[] = [];

  // create orderline items from cart items
  cart.lineItems.forEach((item) => {
    cartTotal += item.qty * Number(item.price);
    orderLineItems.push({
      productId: item.productId,
      itemName: item.itemName,
      qty: item.qty,
      price: item.price,
    } as OrderLineItemType);
  });

  const orderNumber = Math.floor(Math.random() * 1000000);

  // crate order with line itesms
  const orderInput: OrderWithLineItems = {
    orderNumber: orderNumber,
    customerId: userId,
    amount: cartTotal.toString(),
    txnId: null,
    orderItems: orderLineItems,
    status: OrderStatus.PENDING,
  };

  const order = await repo.createOrder(orderInput);
  await cartRepo.clearCartData(userId);

  console.log("Order created", order);

  //fire a message to subscription service [catalog service] to update stock
  await SendCreateOrderMessage(orderInput);

  // return success message
  return { message: "Order created successfully", orderNumber };
};

export const UpdateOrder = async (
  orderId: number,
  status: OrderStatus,
  repo: OrderRepositoryType
) => {
  await repo.updateOrder(orderId, status);
  // fire a message to subscription service [catalog service] to update stock
  if (status === OrderStatus.CANCELLED) {
    // await repo.publishOrderEvent(order,"ORDER_CANCELLED")
  }

  return { message: "Order updated successfully" };
};

export const GetOrder = async (orderId: number, repo: OrderRepositoryType) => {
  const order = await repo.findOrder(orderId);
  if (!order) {
    throw new Error("Order not found");
  }
  return order;
};

export const GetOrders = async (userId: number, repo: OrderRepositoryType) => {
  const orders = await repo.findOrdersByCustomerId(userId);

  if (Array.isArray(orders) && orders.length === 0) {
    throw new Error("Orders not found");
  }
  return orders;
};

export const DeleteOrder = async (
  orderId: number,
  repo: OrderRepositoryType
) => {
  await repo.deleteOrder(orderId);
  return true;
};

export const HandleSubscription = async (message: MessageType) => {
  console.log("Received message", message);
};
