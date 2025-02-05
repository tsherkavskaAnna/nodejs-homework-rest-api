const {RequestError} = require("../helpers");
const {SECRET_KEY} = process.env;
const jwt = require("jsonwebtoken");
const { User } = require("../models/user")

const authorization = async(req, res, next) => {
 const { authorization = "" } = req.headers;
 const [bearer, token] = authorization.split(" ");
 if(bearer !== "Bearer") {
    next(RequestError(401, "Not authorized"))
}
 try {
    const {id}  = jwt.verify(token, SECRET_KEY);
    console.log(id);
    const user = await User.findOne({token});
    if(!user) {
        next(RequestError(401, "Not authorized"));
    }
        req.user = user;
        next();
 } catch (error) {
    next(RequestError(401, error.message))
 }
}

module.exports = authorization;