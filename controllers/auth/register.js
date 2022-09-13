const bcrypt = require("bcryptjs");
const {User} = require("../../models/user");
const gravatar = require("gravatar");
const {sendEmail} = require("../../helpers");
const {nanoid} = require("nanoid");


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
    const verificationToken = nanoid();
    const result = await User.create({ email, password: hashPassword, subscription, avatarURL, verificationToken});
    const mail = {
        to: email,
        subject: "Registration confirm",
        html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blanc">Click confirm email</a>`
    };
    
    await sendEmail(mail);

    res.status(201).json({
        status: "success",
        code: 201,
        user:{
            email,
            subscription: result.subscription,
            verificationToken,
            avatarURL,
        }
        
    })
   } catch (error) {
    next(error)
   }
}
module.exports = register;