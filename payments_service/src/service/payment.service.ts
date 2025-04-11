import { PaymentGateway } from "../utils";
import { GetOrderDetails } from "../utils/broker/api";
import { SendPaymentUpdateMessage } from "./broker.service";

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
  const paymentResponse = await paymentGateway.createPayment(order.amount, {
    orderId: orderNumber,
    userId,
  });
  // return payment secrets
  return {
    secret: paymentResponse.secret,
    pubKey: paymentResponse.pubKey,
    amount: paymentResponse.amount,
  };
};

export const VerifyPayment = async (
  paymentId: string,
  paymentGateway: PaymentGateway
) => {
  // verify payment with payment gateway
  const paymentResponse = await paymentGateway.getPayment(paymentId);

  // update payment record in database
  await SendPaymentUpdateMessage({
    paymentId,
    paymentLog: paymentResponse.paymentLog,
  });
  // return success response
  return {
    message: "Payment verified successfully",
    status: paymentResponse.status,
    paymentLog: paymentResponse.paymentLog,
  };
};
