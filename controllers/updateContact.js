const contacts = require("../models/contacts");
const {RequestError} = require("../helpers/RequestError");
const contactsSchema = require("../schemas/contacts");

const updateContact = async (req, res, next) => {
    try {
      const { error } = contactsSchema.validate(req.body);
      if(error) {
        throw RequestError(400, "missing fields")
      }
      const { contactId } = req.params;
      const result = await contacts.updateContact(contactId, req.body)
      if (!result) {
        throw RequestError(404, "Not found")
      }
      res.json({
        status: 'success',
        code: 200,
        message: "contact updated",
        data: {
          result,
        },
      });
      
    } catch (error) {
      next(error)
    }
  }
  module.exports = updateContact;
