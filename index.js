require("./db/db.connection");
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");
require("./utils/db-connection");
const { port, ip } = require("./config/config");

const app = express();
const PORT = port || 3001;
// this needs to be fixed
// const IP = ip || 'localhost';

// express middlewares
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// swagger implementation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// sample route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the pendulum application." });
});

// healthcheck route
app.get("/healthcheck", (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: "Ok",
    date: new Date(),
  };

  res.status(200).send(data);
});

// index router
const indexRoute = require("./routes/index");

app.use(indexRoute);
app.set("trust proxy", true);

// commented the belwo code need understanding
// app.listen(PORT, IP, () => {
//   console.log(`app listening on port http://${IP}:${PORT}`);
// });
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

app.use((req, res, next) => {
  // allow access from every, elminate CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.removeHeader("x-powered-by");
  // set the allowed HTTP methods to be requested
  res.setHeader("Access-Control-Allow-Methods", "POST");
  // headers clients can use in their requests
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // allow request to continue and be handled by routes
  next();
});
