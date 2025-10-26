import express from "express";
import dotenv from "dotenv";
import connectDb from "../config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "../routes/auth.routes.js";
import userRouter from "../routes/user.routes.js";
import shopRouter from "../routes/shop.routes.js";
import itemRouter from "../routes/item.routes.js";
import orderRouter from "../routes/order.routes.js";

dotenv.config();

const app = express();

// Connect to database
connectDb();

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/item", itemRouter);
app.use("/api/order", orderRouter);

// Root route
app.get("/", (req, res) => {
    res.status(200).send("<h1>Food_Delivery_App Backend API is running on Vercel...</h1>");
});

// Handle all other routes
app.get("/api", (req, res) => {
    res.status(200).json({ message: "API is working!" });
});

export default app;