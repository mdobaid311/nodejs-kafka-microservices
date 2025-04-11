import express, { NextFunction, Request, Response } from "express";
import * as service from "../service/order.service";
import { RequestAuthorizer } from "./middleware";
import { OrderRepository } from "../repository/order.repository";
import { CartRepository } from "../repository/cart.repository";
import { OrderStatus } from "../types";

const repo = OrderRepository;
const cartRepo = CartRepository;
const router = express.Router();

router.post(
  "/orders",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req?.user;
      if (!user) {
        next(new Error("User not found"));
        return;
      }

      const response = await service.CreateOrder(user.id, repo, cartRepo);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/orders",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req?.user;
      if (!user) {
        next(new Error("User not found"));
        return;
      }
      const response = await service.GetOrders(user.id, repo);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/order/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req?.user;
      if (!user) {
        next(new Error("User not found"));
        return;
      }
      const response = await service.GetOrder(user.id, repo);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/orders/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId = parseInt(req.params.id) || 0;
      const response = await service.UpdateOrder(
        orderId,
        req.body.status as OrderStatus,
        repo
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/orders/:id",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req?.user;
      if (!user) {
        next(new Error("User not found"));
        return;
      }
      const orderId = parseInt(req.params.id) || 0;
      const response = await service.DeleteOrder(orderId, repo);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/orders/:id/checkout", async (req: Request, res: Response) => {
  try {
    const orderNumber = parseInt(req.params.id) || 0;
    const response = await service.CheckoutOrder(orderNumber, repo);
    console.log("response", response);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Error getting order details" });
  }
});

export default router;
