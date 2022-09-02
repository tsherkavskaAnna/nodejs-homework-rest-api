const {User} = require("../../models/user");
const {RequestError} = require("../../helpers")
 
const subscription = async(req, res) => {
 const { subscription } = req.body;
 const { userId } = req.params;
 console.log(req.params);
 const result = await User.findByIdAndUpdate(userId, { subscription }, { new: true });

 if(!result) {
    throw RequestError(401, "User not found")
 }

res.json({
    status: "success",
    code: 200,
    result,
    // user: {
    //     email: result.email,
    //     subscription: result.subscription,
    // }
})
}
module.exports = subscription;