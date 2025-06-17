import { createUser, findUserbyUserName } from "../services/user.services.js";

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
    const newUser = await createUser({ name, email, userName, password });

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

    if (userData.password !== password)
      return res.status(400).json({ password: "Wrong" });

    return res.status(200).redirect("/");
  } catch (err) {
    return res.status(400).send("Something went Wrong");
  }
};
