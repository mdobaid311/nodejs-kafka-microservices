import cors from "cors";
import express from "express";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).send("Order Service is running");
});

app.use(cartRoutes);
app.use(orderRoutes);

export default app;
