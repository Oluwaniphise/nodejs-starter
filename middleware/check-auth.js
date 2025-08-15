const HttpError = require("../models/http-error");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (
    req.method === "OPTIONS" ||
    req.method === "POST" ||
    req.method === "PATCH" ||
    req.method === "DELETE"
  ) {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new HttpError("Authentication failed");
    }
    const decodedToken = jwt.verify(token, "supersecret_dont_share");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed", 401);
    next(error);
  }
};
