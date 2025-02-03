import cors from "cors";
import express from "express";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";
import { HandleErrorWithLogger, httpLogger } from "./utils";
import { Request, Response, NextFunction } from "express";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).send("Order Service is running");
});

app.use(httpLogger);
app.use(cartRoutes);
app.use(orderRoutes);
app.use(HandleErrorWithLogger as any);

export default app;
