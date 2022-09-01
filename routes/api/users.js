const express = require("express");
const {ctrlWrapper} = require("../../helpers");
const {validationBody} = require("../../middlewares")
const { schemas } = require("../../models/user");
// const { register, login } = require("../../controllers/auth");
const ctrl = require("../../controllers/auth");




const router = express.Router();

// sign up //
router.post("/register", validationBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

// sign in
router.post("/login", validationBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

module.exports = router;