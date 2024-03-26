const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const crypto = require("crypto");
const {
  refreshTokenSecret,
  refreshTokens,
} = require("../config/default.config");
const db = require("../db/local.db");
const { userHelper } = require("../helpers");
const tempToken = require("../models/tempToken");
const { sendEmail } = require("../helpers/sendEmail");
const User = require("../models/users");
const { UserRepository } = require("../repositories/user.repository");
const { AppError } = require("../Errors");
const HttpStatus = require("../constants/httpstatus");
const MESSAGES = require("../constants/messages");

async function login({ body }) {
  // the below logic can be changed as desired
  const data = await UserRepository.findUser({ email: body.email });
  if (data) {
    // now we will compare password
    // return true if password compare was successfull
    const result = await userHelper.comparewPassword(
      body.password,
      data.password
    );
    if (result === true) {
      // we will use the jwt sign
      const accessToken = userHelper.generarteToken(data);
      const refreshToken = userHelper.generarteRefreshToken(data);

      // Creating body with updated Tokens
      const modifiedUserData = {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      const storedTokens = await UserRepository.storeTokens(
        data.id,
        modifiedUserData
      );
      refreshTokens.push(refreshToken);
      const responseData = {
        // ...data._doc,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      console.log("response data is", responseData);
      return responseData;
    }
    throw new AppError(HttpStatus.FORBIDDEN, MESSAGES.INCORRECT_PASSWORD, true);
  }
  throw new AppError(HttpStatus.NOTFOUND, MESSAGES.USER_NOT_FOUND, true);
}

function regenerateAccesstoken(req) {
  console.log("previous refresh tokens", refreshTokens);
  const { refreshToken } = req.body;
  console.log("previous refresh tokens", refreshToken);

  if (!refreshToken) {
    throw new AppError(HttpStatus.UNAUTHORIZED, MESSAGES.NO_ACCESS, true);
  }

  // can change the below logic as desired
  // if (refreshTokens.includes(refreshToken) === false) {
  //   return { type: 'forbidden' };
  // }

  const user = jwt.verify(refreshToken, refreshTokenSecret);
  const accessToken = userHelper.generarteToken(user);
  const response = {
    accessToken: accessToken,
  };
  return response;
}

async function logout(req) {
  try {
    const { token } = req;
    // Retrieving email from access token
    console.log("TOKEN", token);
    const userName = userHelper.decrpytAccessToken(token);
    console.log("userName", userName);

    let userData = await UserRepository.findUser({ username: userName });

    // Create a new object with nullified accessToken and refreshToken
    const modifiedUserData = {
      // ...userData,
      accessToken: null,
      refreshToken: null,
    };
    await UserRepository.removeTokens(userData.id);
    // refreshTokens = refreshTokens.filter((t) => t !== token);
    return { type: "success", message: "Logout successfull" };
  } catch (error) {
    throw new AppError(
      HttpStatus.BADREQUEST,
      MESSAGES.INTERNAL_SERVER_ERROR,
      true
    );
  }
}

async function register(req) {
  const { userId } = req.body;
  if (userId) {
    const user = await UserRepository.findUserById(userId);
    if (user) {
      const path = `../local/user/${userId}`;
      const tempSecret = speakeasy.generateSecret();
      db.push(path, { tempSecret });
      const responseData = {
        secret: tempSecret.base32,
      };
      console.log("response data", responseData);
      return responseData;
    }
    throw new AppError(HttpStatus.NOTFOUND, MESSAGES.USER_NOT_FOUND, true);
  }
  throw new AppError(HttpStatus.BADREQUEST, MESSAGES.UNPROCESSABLE, true);
}

async function verify(req) {
  const { userId, token } = req.body;
  if (userId && token) {
    // Retrieve user from database
    const path = `../local/user/${userId}/`;
    const user = await db.getData(path);
    console.log("user data is ==>>>>>", user.tempSecret.base32);
    const { base32: secret } = user.tempSecret;
    console.log("Secret is", secret);
    const verified = speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token,
    });
    if (verified) {
      // Update user data
      // now we will update the user
      await UserRepository.updateUser(userId, { secret: secret });
      return { verified: true };
    }
    return { verified: false };
  }
  throw new AppError(HttpStatus.BADREQUEST, MESSAGES.UNPROCESSABLE, true);
}

async function validate(req) {
  const { userId, token } = req.body;
  if (userId && token) {
    // Retrieve user from database
    const user = await UserRepository.findUserById(userId);
    if (user) {
      console.log("user is", user);
      const { secret } = user;
      // Returns true if the token matches
      const tokenValidates = speakeasy.totp.verify({
        secret,
        encoding: "base32",
        token,
        window: 1,
      });
      if (tokenValidates) {
        return { validated: true };
      }
      return { validated: false };
    }
    throw new AppError(HttpStatus.NOTFOUND, MESSAGES.USER_NOT_FOUND, true);
  }
  throw new AppError(HttpStatus.BADREQUEST, MESSAGES.UNPROCESSABLE, true);
}

// forgot/reset password
async function forgotPassword(req) {
  const { email } = req.body;
  if (email) {
    // Retrieve user from database
    const user = await UserRepository.findUser({ email: email });
    if (user) {
      console.log("user is", user);
      const token = await tempToken.findOne({ userId: user._id });
      if (token) await token.deleteOne();
      const resetToken = crypto.randomBytes(32).toString("hex");
      const hash = await userHelper.hashPassword(resetToken);
      await new Token({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
      }).save();
      const link = `url/passwordReset?token=${resetToken}&id=${user._id}`;
      const response = await sendEmail(user.email, "Reset password", link);
      return response;
    }
    throw new AppError(HttpStatus.NOTFOUND, MESSAGES.USER_NOT_FOUND, true);
  }
  throw new AppError(HttpStatus.BADREQUEST, MESSAGES.UNPROCESSABLE, true);
}

async function resetPassword(req) {
  const { userId, token, password } = req.body;
  if (userId && token && password) {
    const passwordResetToken = await tempToken.findOne({ userId: userId });
    if (!passwordResetToken) {
      //  invalid or expired token
      throw new AppError(HttpStatus.NOTFOUND, MESSAGES.INVALID_TOKEN, true);
    }
    const isValid = await userHelper.comparewPassword(
      token,
      passwordResetToken
    );
    if (!isValid) {
      // invalid or expired password reset token
      throw new AppError(
        HttpStatus.NOTFOUND,
        MESSAGES.INCORRECT_PASSWORD,
        true
      );
    }
    const hash = await userHelper.hashPassword(password);
    await User.updateOne(
      { _id: userId },
      { $set: { password: hash } },
      { new: true }
    );
    await passwordResetToken.deleteOne();
    return { message: MESSAGES.PASSWORD_RESET };
  }
  throw new AppError(HttpStatus.BADREQUEST, MESSAGES.UNPROCESSABLE, true);
}

module.exports = {
  login,
  regenerateAccesstoken,
  logout,
  register,
  verify,
  validate,
  forgotPassword,
  resetPassword,
};
