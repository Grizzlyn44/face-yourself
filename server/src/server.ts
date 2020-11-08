import { config } from "dotenv";
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import signInRoute from "endpoints/signIn";
import authCheck from "endpoints/authCheck";

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

// middlewares
server.use(express.json());
server.use(cookieParser());
server.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true
  })
);

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
server.use(authCheck);

// server.use(testAPI); //TEST

// listener
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
