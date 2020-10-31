import { config } from "dotenv";
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import signInRoute from "endpoints/signIn";

// dotenv file needs to be set
config();

//GLOBAL
const PORT = process.env.PORT || 8001;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:8000";
const CONNECT_URL = process.env.DB_CONNECT_URL || "";

//dotenv
// dotenv.config();

// app config
const server: Application = express();
server.use(express.json());
server.use(cookieParser());
server.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true
  })
);

// middlewares

// db congif
mongoose.connect(
  CONNECT_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) {
      console.log("Error in connection to DB", err);
    } else {
      console.log("Connected to DB");
    }
  }
);

// api endpoints
server.use(signInRoute);

// listener
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
