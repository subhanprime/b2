const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretKey, refreshTokenSecret } = require("../config/default.config");

const hashPassword = (password) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(await bcrypt.hash(password, 12));
    } catch (error) {
      reject(error);
    }
  });

const comparewPassword = (clientPass, dbPass) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await bcrypt.compareSync(clientPass, dbPass);
      resolve(result);
    } catch (error) {
      console.log("bycrypt compare error", error);
      reject(error);
    }
  });

const formateData = (data) => {
  data.dob = new Date(data.dob);
  return data;
};

const generarteToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      userName: user.username,
    },
    secretKey,
    {
      expiresIn: "1h",
    }
  );

const decrpytAccessToken = (token) => {
  const decodedToken = jwt.verify(token, secretKey);
  console.log(decodedToken);
  const { userName } = decodedToken;
  return userName;
};

const generarteRefreshToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      userName: user.username,
    },
    refreshTokenSecret,
    {
      expiresIn: "12d",
    }
  );

module.exports = {
  hashPassword,
  comparewPassword,
  formateData,
  generarteToken,
  generarteRefreshToken,
  decrpytAccessToken,
};
