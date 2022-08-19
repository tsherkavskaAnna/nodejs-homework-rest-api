const contacts = require("../models/contacts");
const {RequestError} = require("../helpers/RequestError")

const getContactById = async(req, res, next) => {
    try {
      const {contactId} = req.params;
      const result = await contacts.getContactById(contactId);
      if(!result) {
        throw RequestError(404, "Not found")
      }
      res.json({
        status: 'success',
        code: 200,
        data: {
          result,
        },
      });
    } catch (error) {
      next(error)
    }
  }

  module.exports = getContactById;