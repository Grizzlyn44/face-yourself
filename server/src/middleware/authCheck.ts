// import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express"

// const ENV_JWT_TOKEN = "fyOMG332oPsTxi"; // make it global

// const authCheck = (req: Request, res: Response, next: NextFunction) => {
//   const { headers } = req;
//   const { authorization } = headers;
//   try {
//     const token = authorization.split(" ")[1]; // skip Bearer
//     const decoded = jwt.verify(token, ENV_JWT_TOKEN);
//     console.log("decoded", decoded);
//     req.userData = decoded;
//     next();
//   } catch {
//     res.status(401).send({
//       message: "Auth failed"
//     });
//   }
// };

// export default authCheck;

// app.get("/isauthed", (req, res, next) => {
//     //checkAuth
//     try {
//       const token = req.cookies.access_token;
//       const decoded = jwt.verify(token, ENV_JWT_TOKEN);
//       res.status(200).send(decoded);
//     } catch {
//       res.status(401).send({
//         message: "U need to be signed in"
//       });
//     }
//   });
