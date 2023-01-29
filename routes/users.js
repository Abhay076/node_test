const express = require("express");
const router = express.Router();
const userController = require("../app/api/controllers/users");
router.post("/add-user", userController.create);
router.post("/login-user", userController.authenticate);
module.exports = router;
