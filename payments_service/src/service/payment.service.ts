import { PaymentGateway } from "../utils";
import { GetOrderDetails } from "../utils/broker/api";

export const CreatePayment = async (
  userId: number,
  orderNumber: number,
  paymentGateway: PaymentGateway
) => {
  // get order details from order service
  const order = await GetOrderDetails(orderNumber);
  console.log("order", order);
  if (!order) {
    throw new Error("Order not found");
  }

  if (order.customerId !== userId) {
    throw new Error("User not authorized to make payment for this order");
  }
  // create a new payment record

  // call payment gateway to create payment

  // return payment secrets

  // amount has to be fetched from order service
  return {
    secret: "sk_test_4eC39HqLyjWDarjtT1zdp7dc",
    pubKey: "pk_test_TYooMQauyPWE4Q",
    amount: 100,
  };
};

export const VerifyPayment = async (
  paymentId: string,
  paymentGateway: unknown
) => {
  // call payment ateway to verify payment

  // update order status through message broker

  // return paymentn status <= not necessary just for resposne to frontend
  return {
    status: "success",
    message: "Payment verified successfully",
  };
};
