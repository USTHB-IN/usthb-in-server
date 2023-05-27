require("dotenv").config();
import express, { Express } from "express";
import { v2 as cloudinary } from "cloudinary";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { errorMiddleware } from "./middlewares/error.middleware";

import routes from "./routes";
import path from "path";

// Setup server
const app: Express = express();

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

// Route for file retrieval
app.get("/api/files/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename);
  console.log(filePath);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("File not found.");
    }
  });
});

interface MongooseConnectOptions extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

const options: MongooseConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// Database connection
mongoose
  .connect(process.env.MONGODB_URI!, options)
  .then(async () => {
    console.log("MongoDB connected");
    // Start server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

export { app };
