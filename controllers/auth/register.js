const bcrypt = require("bcryptjs");
const {User} = require("../../models/user");
const gravatar = require("gravatar");


const register = async(req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  
   if(user) {
    return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email in use",
        data: "Conflict",
    })
   }
   try {
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url({email});
    const result = await User.create({ email, password: hashPassword, subscription, avatarURL});
    res.status(201).json({
        status: "success",
        code: 201,
        user:{
            email: result.email,
            subscription: result.subscription,
        }
        
    })
   } catch (error) {
    next(error)
   }
}
module.exports = register;