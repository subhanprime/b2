const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/default.config");
const { setResponse } = require("../helpers");
const { userservice } = require("../services");

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey, async (err, user) => {
      if (err) {
        setResponse(res, { type: "forbidden" });
      }
      // check if the user exists in the databse
      try {
        const response = await userservice.findOne(user);
        if (response.type === "success") {
          console.log(response.data);
          req.user = response.data;
          next();
        } else {
          setResponse(res, { type: response.type, message: response.message });
        }
      } catch (error) {
        setResponse(res, { type: "serverError" });
      }
    });
  } else {
    setResponse(res, {
      type: "unauthorized",
      message: "No access token found",
    });
  }
}

// Middleware to extract token from the Authorization header
const extractTokenMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    // Token is usually in the format: "Bearer <token>"
    const token = authHeader.split(" ")[1];
    req.token = token;
  }

  next();
};

module.exports = {
  authenticateJWT,
  extractTokenMiddleware,
};
