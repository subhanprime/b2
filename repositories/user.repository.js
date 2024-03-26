const { USER } = require("../models");

var UserRepository = {
  // create user
  createUser: (body) => USER.create(body),

  // find user by id
  findUserById: (id) => USER.findById(id),

  // find user
  findUser: (query) => USER.findOne(query),

  // find all user
  findAllUsers: (query) => USER.find(query),

  // update user
  updateUser: (id, body) => USER.findByIdAndUpdate(id, body, { new: true }),

  // delete user
  deleteUser: (id) => USER.findByIdAndDelete(id),

  // Store Tokens
  storeTokens: (id, body) => USER.findByIdAndUpdate(id, body, { new: true }),

  // Remove Tokens
  removeTokens: async (id) => {
    return USER.findByIdAndUpdate(id, {
      accessToken: null,
      refreshToken: null,
    });
  },
};

module.exports = {
  UserRepository,
};
