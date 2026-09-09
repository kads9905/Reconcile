import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// routes
import healthRouter from "./routes/health.routes.js";
import authRouter from "./routes/auth.routes.js";

app.use("/api/v1/health", healthRouter);

app.use("/api/v1/auth", authRouter);


// 404 middleware
import { notFound } from "./middleware/notFound.middleware.js";

app.use(notFound);


// global error middleware
import { errorHandler } from "./middleware/error.middleware.js";

app.use(errorHandler);

export { app };