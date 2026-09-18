import express from "express";
import cors from "cors";
import env from "./config/env.js";
import routes from "./routes/index.js";
import sitemapRoutes from "./routes/sitemap.routes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();

const allowedOrigins =
  env.frontendUrl === "*"
    ? ["*"]
    : env.frontendUrl.split(",").map((s) => s.trim().toLowerCase());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like curl, Postman, server-to-server)
      if (!origin) return callback(null, true);

      // In development or if wildcard is configured, allow all origins
      if (env.nodeEnv === "development" || allowedOrigins.includes("*")) {
        return callback(null, true);
      }

      // Allow any localhost / 127.0.0.1 port (3000, 3001, 5173, etc.)
      if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin.toLowerCase())) {
        return callback(null, true);
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-admin-key"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ success: true, message: "AIxperts Labs API is running." });
});

app.use("/", sitemapRoutes);
app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
