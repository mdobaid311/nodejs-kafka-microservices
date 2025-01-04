import express, { Request, Response } from "express";
import * as service from "../service/order.service";
const router = express.Router();

router.post("/order", (req: Request, res: Response) => {
  const response = service.CreateOrder(req.body);
  res.status(200).json(response);
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
