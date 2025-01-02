import express from "express";
import catalogRouter from "./api/catalog.routes";
import morgan from "morgan";
import helmet from "helmet";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

app.get("/health", (req, res) => {
  res.status(200).send("Catalog Service is running");
});

app.use("/", catalogRouter);

export default app;
