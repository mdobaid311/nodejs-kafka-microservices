export interface InProcessOrder {
  id?: number;
  orderNumber: string;
  status: string;
  customerId: number;
  amount: number;
  createdAt?: Date;
  updatedAt?: Date;
}
