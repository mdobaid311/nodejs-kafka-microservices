export enum PaymentEvent {
  UPDATE_PAYMENT = "update_payment",
  CANCEL_PAYMENT = "cancel_payment",
}

export type TOPIC_TYPE = "OrderEvents";

export interface MessageType {
  headers?: Record<string, any>;
  event: PaymentEvent;
  data: Record<string, any>;
}
