"use strict";
// 3rd Party Resources
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./auth/routes");
const v2Routes = require("./routes/v2.js");
const notFoundHandler = require("./error-handlers/404.js");
const errorHandler = require("./error-handlers/500.js");
const logger = require("./middleware/logger.js");
const v1Routes = require("./routes/v1.js");
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:5173', 'https://vvlvtj-5173.csb.app', 'https://cosmic-duckanoo-ed9e8c.netlify.app/', 'https://45gzpz-5173.csb.app/'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});
app.use(express.json());
app.use(logger);
app.use("/api/v1", v1Routes);
app.use("/api/v2", v2Routes);
app.use(authRoutes);
app.get("/", welcomeHandler);
function welcomeHandler(req, res) {
  res.status(200).send("hello home");
}

app.use("*", notFoundHandler);
app.use(errorHandler);
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
