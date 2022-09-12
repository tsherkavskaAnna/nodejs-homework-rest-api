const {User} = require("../../models/user");
const {RequestError, sendEmail} = require("../../helpers");


const resendEmailValidation = async(req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw RequestError(400, "Missing required field email")
    }
    if(user.verify) {
        throw RequestError(400, "Verification has already been passed")
    }
const mail = {
    to: email,
    subject: "registration confirm",
    html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blanc">Click confirm email</a>`
}
await sendEmail(mail);
res.json({
    message: "Verification email sent"
})
}

module.exports = resendEmailValidation;