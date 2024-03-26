const { AppError } = require("../Errors");
const { userHelper } = require("../helpers");
const HttpStatus = require("../constants/httpstatus");
const { UserRepository } = require("../repositories/user.repository");
const MESSAGES = require("../constants/messages");

const create = async ({ body }) => {
  try {
    body.password = await userHelper.hashPassword(body.password);
    // add more authentication accourding to the schema requirment
    // const username = await UserRepository.findUser({ username: body.username });
    // if (username) throw new AppError(HttpStatus.BADREQUEST, MESSAGES.USER_NAME_TAKEN, true);
    const data = await UserRepository.createUser(body);
    return data;
  } catch (error) {
    throw new AppError(
      HttpStatus.BADREQUEST,
      MESSAGES.INTERNAL_SERVER_ERROR,
      true
    );
  }
};

const findAll = async ({ query }) => {
  const data = await UserRepository.findAllUsers(query);
  if (data.length > 0) {
    return data;
  }
  throw new AppError(HttpStatus.NOTFOUND, MESSAGES.USER_NOT_FOUND, true);
};

const findOne = async ({ query }) => {
  const data = await UserRepository.findUser(query);
  if (data.length > 0) {
    return data;
  }
  throw new AppError(HttpStatus.NOTFOUND, MESSAGES.USER_NOT_FOUND, true);
};

const purge = async ({ params }) => {
  const id = params.userId;

  const data = await UserRepository.deleteUser(id);
  if (data) {
    return data;
  }
  throw new AppError(HttpStatus.NOTFOUND, MESSAGES.USER_NOT_FOUND, true);
};

const update = async ({ params, body }) => {
  const id = params.userId;

  const data = await UserRepository.findUserById(id);
  if (data) {
    body.password = await userHelper.hashPassword(body.password);
    const updatedUser = await UserRepository.updateUser(id, body);
    return updatedUser;
  }
  throw new AppError(HttpStatus.NOTFOUND, MESSAGES.USER_NOT_FOUND, true);
};

const changeUserPassword = async ({ body }) => {
  const user = await UserRepository.findUserById(body.id);
  if (user) {
    userPassword = await userHelper.comparewPassword(
      body.oldPassword,
      user.password
    );
    if (userPassword) {
      const newPassword = await userHelper.hashPassword(body.newPassword);
      const updatedUser = await UserRepository.updateUser(user._id, {
        password: newPassword,
      });
      return updatedUser;
    }
    throw new AppError(
      HttpStatus.BADREQUEST,
      MESSAGES.INCORRECT_PASSWORD,
      true
    );
  }
  throw new AppError(HttpStatus.NOTFOUND, MESSAGES.USER_NOT_FOUND, true);
};

module.exports = {
  create,
  purge,
  findAll,
  findOne,
  update,
  changeUserPassword,
};
