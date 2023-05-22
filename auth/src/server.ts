import User from "./models/user.model";
require("dotenv").config();
import express, { Express } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { errorMiddleware } from "./middlewares/error.middleware";
import { v2 as cloudinary } from "cloudinary";

import routes from "./routes";

// Set up server
const app: Express = express();

// Setup Cloudinary
cloudinary.config(process.env.CLOUDINARY_URL!);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
// Error handling
app.use(errorMiddleware);

// Routes
app.use("/api/", routes);

interface MongooseConnectOptions extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

const options: MongooseConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// Database
// mongoose
//   .connect(process.env.MONGODB_URI!, options)
//   .then(async () => {
//     console.log("MongoDB connected");

//   })
//   .catch((err) => console.log(err));
// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
export { app };
