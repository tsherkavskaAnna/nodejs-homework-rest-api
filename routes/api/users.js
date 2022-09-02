const express = require("express");
const {ctrlWrapper} = require("../../helpers");
const {validationBody, authorization} = require("../../middlewares")
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");




const router = express.Router();

router.post("/register", validationBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.post("/login", validationBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get("/logout", authorization, ctrlWrapper(ctrl.logout));

router.get("/current", authorization, ctrlWrapper(ctrl.current));

router.patch("/:userId", authorization, validationBody(schemas.subscriptionSchema), ctrlWrapper(ctrl.subscription));

module.exports = router;