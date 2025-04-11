import { PaymentGateway, StripePayment } from "../utils";
import express, { NextFunction, Request, Response } from "express";
import { RequestAuthorizer } from "./middleware";
import * as service from "../service/payment.service";

const router = express.Router();
const paymentGateway: PaymentGateway = StripePayment;

router.post(
  "/create-payment",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      next(new Error("User not found"));
      return;
    }
    try {
      const { orderNumber } = req.body;

      const response = await service.CreatePayment(
        user.id,
        orderNumber,
        paymentGateway
      );
      console.log("response", response);
      res
        .status(200)
        .json({ message: "Payment created successfully", data: response });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "verify-payment/:id",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      next(new Error("User not found"));
      return;
    }
    try {
      const paymentId = req.params.id;

      if (!paymentId) {
        next(new Error("Payment ID not found"));
        return;
      }

      await service.VerifyPayment(paymentId, paymentGateway);

      res.status(200).json({ message: "Payment verified successfully" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
