import { config } from "dotenv";
import express, { Request, Response, NextFunction, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "models/User"; //"models/User";

config();

const JWT_SECRET = process.env.JWT_SECRET || "";
const API_PATH = process.env.API_PATH || "";

const router: Router = express.Router();

router.post(
  `${API_PATH}/signin`,
  async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const { email, password } = body;

    let userFound = false;
    let user: any = null;

    const authFail = () => {
      return res.status(401).send({
        message: "Invalid password or email"
      });
    };

    await User.find({ email })
      .exec()
      .then(users => {
        if (users.length > 0) {
          userFound = true;
          user = users[0];
        }
      })
      .catch(err => {
        return res.status(500).send({
          message: "Server error"
        });
      });

    if (!userFound || !user) {
      return authFail();
    }

    bcrypt.compare(password, user.password, (err, response) => {
      if (err) {
        return res.status(500).send({
          message: "Server error"
        });
      }
      if (response) {
        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id
          },
          JWT_SECRET,
          {
            expiresIn: "1h"
          }
        );

        res.cookie("access_token", token, {
          maxAge: 60 * 60 * 1000, //1h
          httpOnly: true
          // secure: true // jen v produkci
        });

        const decoded = jwt.verify(token, JWT_SECRET);

        return res.status(200).send({
          message: "Signed in successfully",
          data: decoded
          // token
        });
      }

      return authFail();
    });
  }
);

export default router;
