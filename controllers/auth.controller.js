const HttpStatus = require("../constants/httpstatus");
const { setResponse } = require("../helpers");
const authService = require("../services/auth.service");

async function login(req, res) {
  // logic to login the user
  try {
    const data = await authService.login(req);
    res.status(HttpStatus.OK).json(data);
  } catch (error) {
    console.log("Error ", error);
    if (error?.isOperational) {
      res.status(error.httpCode).json({
        message: error.description,
      });
    } else {
      res.status(HttpStatus.SERVERERROR).json({
        error: error.message,
      });
    }
  }
}

async function regenerateAccesstoken(req, res) {
  try {
    const data = await authService.regenerateAccesstoken(req);
    res.status(HttpStatus.OK).json(data);
  } catch (error) {
    console.log("Error ", error);
    if (error?.isOperational) {
      res.status(error.httpCode).json({
        message: error.description,
      });
    } else {
      res.status(HttpStatus.SERVERERROR).json({
        error: error.message,
      });
    }
  }
}

async function register(req, res) {
  try {
    const data = await authService.register(req);
    res.status(HttpStatus.OK).json(data);
  } catch (error) {
    console.log("Error ", error);
    if (error?.isOperational) {
      res.status(error.httpCode).json({
        message: error.description,
      });
    } else {
      res.status(HttpStatus.SERVERERROR).json({
        error: error.message,
      });
    }
  }
}

async function verify(req, res) {
  try {
    const data = await authService.verify(req);
    res.status(HttpStatus.OK).json(data);
  } catch (error) {
    console.log("Error ", error);
    if (error?.isOperational) {
      res.status(error.httpCode).json({
        message: error.description,
      });
    } else {
      res.status(HttpStatus.SERVERERROR).json({
        error: error.message,
      });
    }
  }
}

async function validate(req, res) {
  try {
    const data = await authService.validate(req);
    res.status(HttpStatus.OK).json(data);
  } catch (error) {
    console.log("Error ", error);
    if (error?.isOperational) {
      res.status(error.httpCode).json({
        message: error.description,
      });
    } else {
      res.status(HttpStatus.SERVERERROR).json({
        error: error.message,
      });
    }
  }
}

// Logout
async function logout(req, res) {
  try {
    const result = await authService.logout(req);
    setResponse(res, { type: "success", message: result.message });
  } catch (error) {
    console.log("Error ", error);
    if (error?.isOperational) {
      res.status(error.httpCode).json({
        message: error.description,
      });
    } else {
      res.status(HttpStatus.SERVERERROR).json({
        error: error.message,
      });
    }
  }
}

// reset/forgot password
async function forgotPassword(req, res) {
  try {
    const data = await authService.forgotPassword(req);
    res.status(HttpStatus.OK).json(data);
  } catch (error) {
    console.log("Error ", error);
    if (error?.isOperational) {
      res.status(error.httpCode).json({
        message: error.description,
      });
    } else {
      res.status(HttpStatus.SERVERERROR).json({
        error: error.message,
      });
    }
  }
}

async function resetPassword(req, res) {
  try {
    const data = await authService.resetPassword(req);
    res.status(HttpStatus.OK).json(data);
  } catch (error) {
    console.log("Error ", error);
    if (error?.isOperational) {
      res.status(error.httpCode).json({
        message: error.description,
      });
    } else {
      res.status(HttpStatus.SERVERERROR).json({
        error: error.message,
      });
    }
  }
}

module.exports = {
  login,
  register,
  regenerateAccesstoken,
  logout,
  verify,
  validate,
  forgotPassword,
  resetPassword,
};
