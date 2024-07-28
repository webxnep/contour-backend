import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import logger from "./utils/logger";
import cors from "cors";
import connectDB from "./utils/connectDB";
import userRouter from "../src/routes/user.route";
import inquiryRoute from "../src/routes/inquiry.route";
import iternaryRoute from "../src/routes/iternary.route";
import costIncludeRoute from "../src/routes/costInclude.route";
import costExcludeRoute from "../src/routes/costExclude.route";
import fixedDateRoute from "../src/routes/fixedDate.route";
import expeditionRoute from "../src/routes/expedition.route";
import bookingRoute from "../src/routes/booking.route";
import collectionRoute from "../src/routes/collection.route";
import inboxRoute from "../src/routes/inbox.route";
import categoryRoute from "../src/routes/category.route";
import categoryXExpeditionRoute from "../src/routes/categoryXExpedition.route";
import teamRoute from "../src/routes/team.route";
import achievementRoute from "../src/routes/achievement.route";
import reviewRoute from "../src/routes/review.route";
import activityRoute from "../src/routes/activity.route";
import activityMediaRoute from "../src/routes/activityMedia.route";
import blogRoute from "../src/routes/blog.route";
import statRoute from "../src/routes/stats.route";
import mailRoute from "../src/routes/mail.route";
import mediaRoute from "../src/routes/media.route";
import groupDepartureRoute from "../src/routes/groupDeparture.route";
import privateDepartureRoute from "../src/routes/privateDeparture.route";

const app = express();
// const port = process.env.PORT;
const port = 5017;

// Middleware

// Body Parser middleware
// app.use(express.json({ limit: "10kb" }));
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "https://contour-backend.webxnep.com", "http://contour-backend.webxnep.com", "https://contour-dashboard.vercel.app", "http://contour-dashboard.vercel.app", "https://contour-frontend.vercel.app", "http://contour-frontend.vercel.app/"],
    credentials: true,
  })
);

// https://test.epeakexpedition.com/

// Route
app.use("/api/users", userRouter);
app.use("/api/inquiries", inquiryRoute);
app.use("/api/iternaries", iternaryRoute);
app.use("/api/cost-includes", costIncludeRoute);
app.use("/api/cost-excludes", costExcludeRoute);
app.use("/api/fixed-dates", fixedDateRoute);
app.use("/api/expeditions", expeditionRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/inboxes", inboxRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/collections", collectionRoute);
app.use("/api/categories-x-expeditions", categoryXExpeditionRoute);
app.use("/api/teams", teamRoute);
app.use("/api/achievements", achievementRoute);
app.use("/api/review", reviewRoute);
app.use("/api/activities", activityRoute);
app.use("/api/activity-medias", activityMediaRoute);
app.use("/api/blogs", blogRoute);
app.use("/api/stats", statRoute);
app.use("/api/mails", mailRoute);
app.use("/api/medias", mediaRoute);
app.use("/api/groupDeparture", groupDepartureRoute);
app.use("/api/privateDeparture", privateDepartureRoute);

// Testing
app.get("/healthChecker", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to contor Server.",
  });
});

// UnKnown Routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  await connectDB();
});
