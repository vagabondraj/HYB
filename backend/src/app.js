import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : [];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json({
    limit: "20kb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "20kb"
}));

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// import routes
import authRoutes from "./routes/auth.route.js";
import reqRoutes from "./routes/request.route.js";
import resRouter from "./routes/response.route.js";
import chatRouter from "./routes/chat.route.js";
import notificationRouter from "./routes/notification.route.js";
import reportRouter from "./routes/report.route.js";
import userRouter from "./routes/user.route.js";

//route decleration
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/req", reqRoutes);
app.use("/api/v1/res", resRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/notification", notificationRouter);
app.use("/api/v1/report", reportRouter);
app.use("/api/v1/user", userRouter);

export default app;