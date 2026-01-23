import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({
    limit: "20kb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "20kb"
}));

app.use(express.static("public"));
app.use(cookieParser());


// import routes
import authRoutes from "./routes/auth.route.js";
import reqRoutes from "./routes/request.route.js";
import resRouter from "./routes/response.route.js";
import chatRouter from "./routes/chat.route.js";
import notificationRouter from "./routes/notification.route.js";


//route decleration
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/req", reqRoutes);
app.use("/api/v1/res", resRouter);
app.use("/api/v1/chat", chatRouter);
app.use("api/v1/notification", notificationRouter);

export default app;