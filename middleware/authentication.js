import jwt from "jsonwebtoken";
import { isBlacklisted } from "../models/userModel.js";

const JWT_SECRET = "dietica2024";

export const authenticate = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send("Unauthorized");
  }
  const { data: blacklistedToken, error } = await isBlacklisted(token);
  if (blacklistedToken) {
    return res
      .status(403)
      .send("Token anda telah kadaluwarsa, silahkan login kembali");
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).send("Invalid token");
  }
};
