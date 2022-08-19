const contacts = require("../models/contacts");
const {RequestError} = require("../helpers/RequestError");

const removeContact = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await contacts.removeContact(contactId);
      if(!result) {
        throw RequestError(404, "Not found")
      }
      res.json({
        status: 'success',
        code: 200,
        message: "contact deleted"
      });
    } catch (error) {
      next(error)
    }
  }
  module.exports = removeContact;