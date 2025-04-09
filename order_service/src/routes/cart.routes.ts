import express, { NextFunction, Request, Response } from "express";
import * as service from "../service/cart.service";
import * as repository from "../repository/cart.repository";
import { ValidateRequest } from "../utils/validator";
import { CartRequestInput, CartRequestSchema } from "../dto/cartRequest.dto";
import { ValidateUser } from "../utils";
import { RequestAuthorizer } from "./middleware";
const router = express.Router();

const repo = repository.CartRepository;

router.post(
  "/cart",
  RequestAuthorizer,
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
      const user = req?.user;
      if (!user) {
        next(new Error("User not found"));
        return;
      }

      const input: CartRequestInput & { customerId: number } = {
        ...req.body,
        customerId: user.id,
      };

      const response = await service.CreateCart(input, repo);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/cart",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req?.user;
      if (!user) {
        next(Error("User not found"));
        return;
      }
      const response = await service.GetCart(user.id, repo);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/cart/:lineItemId",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req?.user;
      if (!user) {
        next(Error("User not found"));
        return;
      }

      const lineItemId = req.params.lineItemId;
      const response = await service.EditCart(
        {
          id: +lineItemId,
          qty: req.body.qty,
          customerId: user.id,
        },
        repo
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/cart/:lineItemId",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req?.user;
      if (!user) {
        next(Error("User not found"));
        return;
      }

      const lineItemId = req.params.lineItemId;
      const response = await service.DeleteCart(
        {
          id: +lineItemId,
          customerId: user.id,
        },
        repo
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
