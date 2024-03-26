const dotenv = require("dotenv");

dotenv.config();
module.exports = {
  port: process.env.PORT,
  endpoint: process.env.DB_URL,
  dockerDBendpoint: process.env.DOCKER_DB_URL,
  clinturl: process.env.CLINT_URL,
  ip: process.env.IP,
  emailService: process.env.EMAIL_SERVICE,
  emailAuthUser: process.env.EMAIL_AUTH_USER,
  emailAuthPass: process.env.EMAIL_AUTH_PASS,
};
