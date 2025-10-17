import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";
import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";
import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { env } from "@/common/utils/envConfig";
import expenseRouter from "./api/expense/expenseRouter";
import userRouter from "./api/user/userRouter";
import transferRouter from "./api/transfer/transferRouter";
import transactionRouter from "./api/transaction/transactionRouter";
import graphqlMiddleware from "./graphql/middleware";
import { ruruHTML } from "ruru/server";
const logger = pino({ name: "server start" });
const app: Express = express();

app.use(express.json());
// Middlewares
if (env.isDevelopment) {
  const config = { endpoint: "/graphql" };
  app.get("/ruru", (_req, res) => {
    res.format({
      html: () => res.status(200).send(ruruHTML(config)),
      default: () => res.status(406).send("Not Acceptable"),
    });
  });

  app.use("/graphql", graphqlMiddleware);
}

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// REST Routes
app.use("/health-check", healthCheckRouter);
app.use("/api/expenses", expenseRouter);
app.use("/api/users", userRouter);
app.use("/api/transfers", transferRouter);
app.use("/api/transactions", transactionRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
