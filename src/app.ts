import cors from "cors";
import express, { Application, Request, Response } from "express";

import router from "./app/routes";
import notFound from "./app/middleware/notFound";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app: Application = express();

//parsers
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://student-management-client-silk.vercel.app",
      "https://rpi-exam-helper.vercel.app",
    ],
    credentials: true,
  })
);

// application routes
app.use("/api/v1", router);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send("server is running properly😁😁");
};

app.get("/", getAController);

// app.use(notFound);
app.use(globalErrorHandler);

export default app;
