import { Producer } from "kafkajs";
import { PaymentEvent } from "../types";
import { MessageBroker } from "../utils";

export const InitializeBroker = async () => {
  const producer = await MessageBroker.connectProducer<Producer>();
  producer.on("producer.connect", () => {
    console.log("Order Service Producer connected");
  });
};

export const SendPaymentUpdateMessage = async (data: any) => {
  await MessageBroker.publish({
    event: PaymentEvent.UPDATE_PAYMENT,
    topic: "OrderEvents",
    headers: {},
    message: {
      data,
    },
  });
};
