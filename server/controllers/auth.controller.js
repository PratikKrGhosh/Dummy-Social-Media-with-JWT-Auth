import { createUser, findUserbyUserName } from "../services/user.services.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";
import { signToken } from "../utils/token.js";

export const getSignupPage = (req, res) => {
  try {
    return res.status(200).render("signup");
  } catch (err) {
    return res.status(404).send("Page not Found");
  }
};

export const getLoginPage = (req, res) => {
  try {
    return res.status(200).render("login");
  } catch (err) {
    return res.status(404).send("Page not Found");
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, userName, password } = req.body;
    const hashedPassword = await hashPassword(password);

    const newUser = await createUser({
      name,
      email,
      userName,
      password: hashedPassword,
    });

    if (!newUser) return res.status(400).send("Could not Create User");

    return res.status(201).redirect("/login");
  } catch (err) {
    return res.status(400).send("Something went Wrong");
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const userData = await findUserbyUserName(userName);

    if (!userData) return res.status(404).send("No User Exists");

    const isVerified = await verifyPassword({
      password,
      hashedPassword: userData.password,
    });

    if (!isVerified) return res.status(400).json({ password: "Wrong" });

    const data = {
      name: userData.name,
      email: userData.email,
      userName: userData.userName,
    };

    const token = await signToken(data);
    res.cookie("access_token", token);
    return res.status(200).redirect("/");
  } catch (err) {
    return res.status(400).send("Something went Wrong");
  }
};
