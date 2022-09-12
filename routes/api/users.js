const express = require("express");
const {ctrlWrapper} = require("../../helpers");
const {validationBody, authorization, upload } = require("../../middlewares")
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");


const router = express.Router();

router.post("/register", validationBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post("/verify", validationBody(schemas.verifyEmailSchema), ctrlWrapper(ctrl.resendEmailValidation))

router.post("/login", validationBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.patch("/avatars", authorization,upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));

router.get("/logout", authorization, ctrlWrapper(ctrl.logout));

router.get("/current", authorization, ctrlWrapper(ctrl.current));

router.patch("/:userId", authorization, validationBody(schemas.subscriptionSchema), ctrlWrapper(ctrl.subscription));

module.exports = router;