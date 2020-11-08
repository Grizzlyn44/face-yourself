import { config } from "dotenv";
import express, { Request, Response, NextFunction, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "models/User"; //"models/User";
import {CODE_MESSAGE_AUTH_SUCCESS, CODE_MESSAGE_AUTH_FAIL} from "types/messageCodes";
import cookieParser, { signedCookie } from "cookie-parser";

config();

const JWT_SECRET = process.env.JWT_SECRET || "";
const API_PATH = process.env.API_PATH || "";

const router: Router = express.Router();

router.post(
  `${API_PATH}/auth/user`,
  async (req: Request, res: Response, next: NextFunction) => {
    const { cookies } = req;
    try {
      const token = cookies.access_token;
      const decoded = jwt.verify(token, JWT_SECRET);
      res.status(200).send({
          messageCode: CODE_MESSAGE_AUTH_SUCCESS,
          data: decoded
      });
      // console.log("decoded", decoded);
      // req.userData = decoded;
      // next();
    } catch {
      res.status(200).send({
        messageCode: CODE_MESSAGE_AUTH_FAIL,
        data: null
      });
    }
    
    // console.log("req >>>>>>>>>>>>>>>>>>>>>>>>>>>", req);
    // console.log("res >>>>>>>>>>>>>>>>>>>>>>>>>>>", res);
    // console.log("next >>>>>>>>>>>>>>>>>>>>>>>>>>>", next);
    //   res.status(200).send("TEST");
  })

export default router;