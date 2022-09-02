const {Contact}= require("../../models/contact");

const listContacts = async (req, res, next) => {
  const {_id: owner} = req.user;
  const { page = 1, limit = 20} = req.query;
  const skip = (page - 1) * limit;
    try {
      const result = await Contact.find({owner}, "-createdAT -updateAt", {skip, limit: Number(limit)})
        .populate("owner", "email")
      res.json({
        status: 'success',
        code: 200,
        data: {
          result
        },
      });;
    } catch (error) {
     next(error)
    }
  }
  module.exports = listContacts;