import express, { Application, Request, Response } from "express";
import router from "./routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import cors from "cors";

const app: Application = express();
// application parsers
app.use(express.json());
app.use(cors());
// application routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Bike Rental Server is running!",
  });
});

// global error handler
app.use(globalErrorHandler);
// not-found error handler
app.use(notFound);
export default app;
