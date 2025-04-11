export type PaymentGateway = {
  createPayment: (
    amount: number,
    metadata: {
      orderId: number;
      userId: number;
    }
  ) => Promise<{ secret: string; pubKey: string; amount: number }>;
  getPayment: (paymentId: string) => Promise<Record<string, unknown>>;
};
