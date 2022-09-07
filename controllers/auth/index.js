const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const current = require("./currentUser");
const subscription = require("./subscription");
const updateAvatar = require("./updateAvatar");

module.exports = {
    register,
    login,
    logout,
    current,
    subscription,
    updateAvatar,
}