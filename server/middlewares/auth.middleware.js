const authMiddleware = (req, res, next) => {
  const decodedToken = req.cookies.access_token;

  if (!decodedToken) {
    req.user = null;
    return next();
  }

  try {
    req.user = decodedToken;
  } catch (err) {
    req.user = null;
  }

  return next();
};

export default authMiddleware;
