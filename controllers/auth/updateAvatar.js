const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const {User} = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars")

const updateAvatar = async (req, res) => {
    try {
        const {path: tempUpload, filename} = req.file;
        const {_id: id} = req.user;
        const avatarName = `${id}.${filename}`
        console.log(avatarName);
        const resultUpload = path.join(avatarsDir, avatarName);
        await fs.rename(tempUpload, resultUpload);
        const file = await Jimp.read(resultUpload);
        await file.resize(250, 250).write(resultUpload);
        const avatarURL = path.join("avatars", resultUpload);
        await User.findByIdAndUpdate(id, {avatarURL});
        res.json({
            avatarURL,
        })
    } catch (error) {
        await fs.unlink(req.file.path)
        throw error;
    }
}

module.exports = updateAvatar;