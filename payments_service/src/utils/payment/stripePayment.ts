import Stripe from "stripe";
import { PaymentGateway } from "./payment.type";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-03-31.basil",
});

const createPayment = async (
  amount: number,
  metadata: {
    orderId: number;
    userId: number;
  }
): Promise<{ secret: string; pubKey: string; amount: number }> => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "inr",
    metadata,
  });

  return {
    secret: paymentIntent.client_secret ? paymentIntent.client_secret : "",
    pubKey: process.env.STRIPE_PUBLISHABLE_KEY as string,
    amount: paymentIntent.amount,
  };
};

const getPayment = async (
  paymentId: string
): Promise<Record<string, unknown>> => {
  const paymentResponse = await stripe.paymentIntents.retrieve(paymentId, {});
  console.log("Payment Response: ", paymentResponse);
  const { status } = paymentResponse;
  const orderNumber = paymentResponse.metadata["orderNumber"];

  return {
    status,
    paymentLog: paymentResponse,
    orderNumber,
  };
};

export const StripePayment: PaymentGateway = {
  createPayment,
  getPayment,
};
