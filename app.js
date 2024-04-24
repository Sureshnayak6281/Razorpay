import express from "express";
import { config } from "dotenv";
import paymentRouter from "./router/paymentRouter.js"



config({ path: "./config/config.env" });

const app = new express();

export { app };

app.use("/api", paymentRouter);