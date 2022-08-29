const express = require("express");
const { login } = require("lint/utils/user");

const register = require("../../controllers/auth/register");
const {ctrlWrapper} = require("../../helpers");
const {validationBody} = require("../../middlewares")
const { schemas } = require("../../models/user");

const router = express.Router();

// sign up //
router.post("/register", validationBody(schemas.registerSchema), ctrlWrapper(register));

// sign in
router.post("/login", validationBody(schemas.loginSchema), ctrlWrapper(login))

module.exports = router;