const {User} = require("../../models/user");
const {RequestError} = require("../../helpers");

const verifyEmail = async (req, res) => {
    const {verificationToken} = req.param;
    const user = await User.findOne({ verificationToken });
    
    if(!user) {
        throw RequestError(404, "User not found")
    }
    await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: null});
    res.json({
        status: "ok",
        code: "200",
        message: "Verification successful"
    })
}

module.exports = verifyEmail;