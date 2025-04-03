import cors from "cors";
import express from "express";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";
import { HandleErrorWithLogger, httpLogger } from "./utils";
import { Request, Response, NextFunction } from "express";
import { MessageBroker } from "./utils/broker/message-broker";
import { Consumer, Producer } from "kafkajs";
import { InitializeBroker } from "./service/broker.service";

export const ExpressApp = async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(httpLogger);

  await InitializeBroker();
  
  app.use(cartRoutes);
  app.use(orderRoutes);

  app.get("/health", (req, res) => {
    res.status(200).send("Order Service is running");
  });

  app.use(HandleErrorWithLogger as any);

  return app;
};
