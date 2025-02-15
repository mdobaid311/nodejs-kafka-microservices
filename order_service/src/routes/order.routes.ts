import express, { Request, Response } from "express";
import * as service from "../service/order.service";
import { MessageBroker } from "../utils";
import { OrderEvent } from "../types";
const router = express.Router();

router.post("/order", async (req: Request, res: Response) => {
  await MessageBroker.publish({
    topic: "OrderEvents",
    headers: {
      token: "req.headers.authorization",
    },
    event: OrderEvent.CREATE_ORDER,
    message: {
      orderId: 1,
      items: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 2,
        },
      ],
    },
  });
  // const response = service.CreateOrder(req.body);
  res.status(200).json({
    message: "Order created successfully",
  });
});

router.get("/order", (req: Request, res: Response) => {
  const response = service.GetOrder(req.body);
  res.status(200).json(response);
});

router.patch("/order", (req: Request, res: Response) => {
  const response = service.EditOrder(req.body);
  res.status(200).json(response);
});

router.delete("/order", (req: Request, res: Response) => {
  const response = service.DeleteOrder(req.body);
  res.status(200).json(response);
});

export default router;
