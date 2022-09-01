const jwt = require("jsonwebtoken");
const {SECRET_KEY} = process.env;
const { RequestError } = require("../../helpers");
const { User } = require("../../models/user");

const login = async(req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user) {
    throw RequestError(401, "Email is wrong")
  }

  const comparePassword = await user.comparePassword(password);
  if(!comparePassword) {
    throw RequestError(401, "Password is wrong")
  }
  const payload = {
    id: user._id
  };
  const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "2h"});
  await User.findByIdAndUpdate(user._id, {token})
  res.json({
   token,
    user: {
      email,
    }
  })
}


module.exports = login;