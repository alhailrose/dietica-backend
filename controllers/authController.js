import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  addToBlacklist,
  createUser,
  getUserByEmail,
} from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await createUser(
      name,
      username,
      email,
      hashedPassword
    );

    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const responseData = { name, username, email };
    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: responseData,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data: user, error } = await getUserByEmail(email);
    if (error || !user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    const responseData = {
      status: "success",
      id: user[0].id,
      name: user[0].name,
      email: user[0].email,
      access_token: token,
    };
    return res
      .status(200)
      .json({ message: "Login successful", data: responseData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const { data, error } = await addToBlacklist(token);
    if (error) {
      return res.status(500).json({ message: "token Invalid" });
    }
    return res.status(200).json({ message: "Logout successful", data: data });
  } catch (error) {
    return res.status(500).json({ message: "Error logging out" });
  }
};
