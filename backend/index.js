import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import shopRouter from "./routes/shop.routes.js";
import itemRouter from "./routes/item.routes.js";
import orderRouter from "./routes/order.routes.js";
import http from "http";
import { Server } from "socket.io";
import socketHandler from "./socket.js";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
<<<<<<< HEAD
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
=======
    origin: "https://vingo-a1kt.onrender.com",
>>>>>>> 2d648b20cd2b8039aa50a3c004e7c91b76bdfbef
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set("io", io);

app.use(
  cors({
<<<<<<< HEAD
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
=======
    origin: "https://vingo-a1kt.onrender.com",
>>>>>>> 2d648b20cd2b8039aa50a3c004e7c91b76bdfbef
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/item", itemRouter);
app.use("/api/order", orderRouter);

// This is the new code to fix the error
app.get("/", (req, res) => {
  res.status(200).send("<h1>Food_Delievery_App Backend API is running...</h1>");
});

socketHandler(io);

// Connect to database immediately
connectDb();

// For Vercel, we export the app instead of listening
if (process.env.NODE_ENV !== 'production') {
  server.listen(port, () => {
    console.log(`server started at ${port}`);
  });
}

// Export for Vercel
export default app;
