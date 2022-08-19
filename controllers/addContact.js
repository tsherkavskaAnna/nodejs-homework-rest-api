const contacts = require("../models/contacts");
const {RequestError} = require("../helpers/RequestError");
const contactsSchema = require("../schemas/contacts")

const addContact = async (req, res, next) => {
    try {
      const { error } = contactsSchema.validate(req.body);
      if(error) {
        throw RequestError(400, "missing required name field");
      }
      const result = await contacts.addContact(req.body)
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

  module.exports = addContact;