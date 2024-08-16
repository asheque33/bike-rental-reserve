import express, { Application, Request, Response } from "express";
const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Bike Rental Server is running!",
  });
});
export default app;
