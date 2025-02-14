import express, { NextFunction, Request, Response } from "express";
import * as service from "../service/cart.service";
import * as repository from "../repository/cart.repository";
import { ValidateRequest } from "../utils/validator";
import { CartRequestInput, CartRequestSchema } from "../dto/cartRequest.dto";
const router = express.Router();

const repo = repository.CartRepository;

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // check if user is authenticated
  next();
};

router.post(
  "/cart",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const error = ValidateRequest<CartRequestInput>(
        req.body,
        CartRequestSchema
      );
      if (error) {
        res.status(400).json({ error });
        return;
      }

      const response = await service.CreateCart(
        req.body as CartRequestInput,
        repo
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/cart", async (req: Request, res: Response) => {
  // comes from our auth user parsed from JWT
  const response = await service.GetCart(req.body.customerId, repo);
  res.status(200).json(response);
});

router.patch("/cart/:lineItemId", async (req: Request, res: Response) => {
  const lineItemId = req.params.lineItemId;
  const response = await service.EditCart(
    {
      id: +lineItemId,
      qty: req.body.qty,
    },
    repo
  );
  res.status(200).json(response);
});

router.delete("/cart/:lineItemId", async (req: Request, res: Response) => {
  const lineItemId = req.params.lineItemId;
  const response = await service.DeleteCart(+lineItemId, repo);
  res.status(200).json(response);
});

export default router;
