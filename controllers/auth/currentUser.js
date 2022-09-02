 const {User} = require("../../models/user");

const current = async(req, res) => {
 const { email } = req.user;
 await User.findOne({ email , token: ""});
 res.json({
    status: "success",
    code: 200,
        user: {
            email,
            subscription: req.user.subscription,
        }
   })
}

module.exports = current;