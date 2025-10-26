import { Server } from "socket.io";
import socketHandler from "../socket.js";

let io;

export default function handler(req, res) {
    if (!res.socket.server.io) {
        console.log("Setting up Socket.IO");
        io = new Server(res.socket.server, {
            cors: {
                origin: process.env.FRONTEND_URL || "http://localhost:5173",
                methods: ["GET", "POST"],
                credentials: true,
            },
        });

        socketHandler(io);
        res.socket.server.io = io;
    }

    res.end();
}