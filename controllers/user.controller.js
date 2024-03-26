const { userservice } = require("../services");
const HttpStatus = require("../constants/httpstatus");
const MESSAGES = require("../constants/messages");

const create = async (req, res) => {
  try {
    const data = await userservice.create(req);
    data.password = undefined;
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
};

const findAll = async (req, res) => {
  try {
    const data = await userservice.findAll(req);
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
};

const purge = async (req, res) => {
  try {
    const data = await userservice.purge(req);
    data.password = undefined;
    res.status(HttpStatus.OK).json({
      message: MESSAGES.USER_DELETED,
      data: data,
    });
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
};
const update = async (req, res) => {
  try {
    const data = await userservice.update(req);
    data.password = undefined;
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
};
const changeUserPassword = async (req, res) => {
  try {
    await userservice.changeUserPassword(req);
    res.status(HttpStatus.OK).json({
      message: MESSAGES.PASSWORD_UPDATED,
    });
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
};
module.exports = {
  create,
  purge,
  findAll,
  update,
  changeUserPassword,
};
