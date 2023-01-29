const express = require("express");
const PORT = process.env.PORT || 8000;
const logger = require("morgan");
const todos = require("./routes/todos");
const users = require("./routes/users");
const bodyParser = require("body-parser");
const mongoose = require("./config/database"); //database configuration
var jwt = require("jsonwebtoken");
const app = express();
app.set("secretKey", "nodeRestApi"); // jwt secret token
// connection to mongodb
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
mongoose.connection.once("open", function () {
  console.log("Successfully connected to database");
});
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", function (req, res) {
  res.json({
    Test: "A Node.js Api with Register new user and add new orders and get all orders",
  });
});
// public route
app.use("/users", users);
// private route
app.use("/todos", validateUser, todos);
app.get("/favicon.ico", function (req, res) {
  res.sendStatus(204);
});
function validateUser(req, res, next) {
  jwt.verify(
    req.headers["x-access-token"],
    req.app.get("secretKey"),
    function (err, decoded) {
      if (err) {
        res.json({ status: "error", message: err.message, data: null });
      } else {
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    }
  );
}
// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});
// handle errors
app.use(function (err, req, res, next) {
  console.log(err);

  if (err.status === 404) res.status(404).json({ message: "Not found" });
  else res.status(500).json({ message: "Something looks wrong :( !!!" });
});
app.listen(PORT, function () {
  console.log(`Node server running at ${PORT}`);
});
