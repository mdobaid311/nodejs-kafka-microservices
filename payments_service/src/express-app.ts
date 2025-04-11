import cors from "cors";
import express from "express";
import paymentRoutes from "./routes/payment.routes";

import { HandleErrorWithLogger, httpLogger } from "./utils";
import { InitializeBroker } from "./service/broker.service";

export const ExpressApp = async () => {
  const app = express();

  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(express.json());

  app.use(httpLogger);

  await InitializeBroker();

  app.use(paymentRoutes);

  app.get("/health", (req, res) => {
    res.status(200).send("Payment Service is running");
  });

  app.use(HandleErrorWithLogger as any);

  return app;
};
