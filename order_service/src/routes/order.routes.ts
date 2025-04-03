import express, { NextFunction, Request, Response } from "express";
import * as service from "../service/order.service";
import { RequestAuthorizer } from "./middleware";
import { OrderRepository } from "../repository/order.repository";
import { CartRepository } from "../repository/cart.repository";

const repo = OrderRepository;
const cartRepo = CartRepository;
const router = express.Router();

router.post(
  "/order",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req?.user;
    if (!user) {
      next(new Error("User not found"));
      return;
    }

    const response = await service.CreateOrder(user.id, repo, cartRepo);
    res.status(200).json(response);
  }
);

router.get(
  "/orders",
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req?.user;
    if (!user) {
      next(new Error("User not found"));
      return;
    }
    const response = await service.GetOrders(user.id, repo);
    res.status(200).json(response);
  }
);

router.get(
  "/order/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req?.user;
    if (!user) {
      next(new Error("User not found"));
      return;
    }
    const response = await service.GetOrder(user.id, repo);
    res.status(200).json(response);
  }
);

router.patch(
  "/orders/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const orderId = parseInt(req.params.id) || 0;
    const response = await service.UpdateOrder(orderId, req.body.status, repo);
    res.status(200).json(response);
  }
);

router.delete(
  "/orders/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req?.user;
    if (!user) {
      next(new Error("User not found"));
      return;
    }
    const orderId = parseInt(req.params.id) || 0;
    const response = await service.DeleteOrder(orderId, repo);
    res.status(200).json(response);
  }
);

export default router;
