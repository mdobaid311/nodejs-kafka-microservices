import {
  InProcessOrder,
  OrderLineItemType,
  OrderWithLineItems,
} from "../dto/orderRequest.dto";
import { CartRepositoryType } from "../repository/cart.repository";
import { OrderRepositoryType } from "../repository/order.repository";
import { MessageType, OrderEvent, OrderStatus } from "../types";
import {
  SendCreateOrderMessage,
  SendOrderCancelledMessage,
} from "./broker.service";

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
    txnId: null, // Payment ID to keep track of successful payment status
    status: OrderStatus.PENDING, // payment status will be updated by payment service
    customerId: userId,
    amount: cartTotal.toString(),
    lineItems: orderLineItems,
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
  const order = await repo.findOrder(orderId);
  if (!order) {
    throw new Error("Order not found");
  }
  await repo.deleteOrder(orderId);
  console.log("order deleted", order);

  const cancelledOrder = {
    id: order.id,
    orderNumber: order.orderNumber,
    lineItems: order.lineItems,
  };

  await SendOrderCancelledMessage(cancelledOrder);
  return true;
};

export const HandleSubscription = async (message: MessageType) => {
  console.log("Received message", message);

  if (message.event === OrderEvent.UPDATE_ORDER) {
    const order = message.data as InProcessOrder;
    console.log("order", order);
    if (!order) {
      throw new Error("Order not found");
    }
  }
};

export const CheckoutOrder = async (
  orderNumber: number,
  repo: OrderRepositoryType
) => {
  const order = await repo.findOrderByOrderNumber(orderNumber);
  console.log("order", order);
  if (!order) {
    throw new Error("Order not found");
  }

  const checkoutOrder: InProcessOrder = {
    id: order.id,
    orderNumber: order.orderNumber.toString(),
    status: order.status,
    customerId: order.customerId,
    amount: Number(order.amount),
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };

  return checkoutOrder;
};
