const {Schema, model} = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const emailRegexp = /^[\w.]+@[\w]+.[\w]+$/;

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
        minlength: 6,
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: emailRegexp,
      },
      avatarURL: {
        type: String,
        required: [true, "Avatar is required"],
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
      token: {
        type: String,
        default: "",
      },
      verify: {
        type: Boolean,
        default: false,
      },
      verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
      },
      
}, {versionKey: false, timestamps: true});


userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
};

const User = model("user", userSchema);

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string(),
    token: Joi.string(),
    avatarURL: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().label("Subscription Type").valid("starter", "pro", "business").required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
    registerSchema,
    loginSchema,
    subscriptionSchema,
    verifyEmailSchema,
}

module.exports = {
    User,
    schemas,
};