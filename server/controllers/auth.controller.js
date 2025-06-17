export const getSignupPage = (req, res) => {
  try {
    return res.status(200).render("signup");
  } catch (err) {
    return res.status(400).send("Page not Found");
  }
};

export const getLoginPage = (req, res) => {
  try {
    return res.status(200).render("login");
  } catch (err) {
    return res.status(400).send("Page not Found");
  }
};

export const signup = async (req, res) => {
  try {
  } catch (err) {
    return res.status(400).send("Something went Wrong");
  }
};

export const login = async (req, res) => {
  try {
  } catch (err) {
    return res.status(400).send("Something went Wrong");
  }
};
