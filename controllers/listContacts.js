const {Contact}= require("../models/contact");

const listContacts = async (_, res, next) => {
    try {
      const result = await Contact.find({}, "-createdAT -updateAt");
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