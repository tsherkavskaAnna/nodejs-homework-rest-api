const { Contact, schemas } = require("../../models/contact");
const { RequestError}  = require("../../helpers/RequestError");


const updateContact = async (req, res, next) => {
    try {
      const { error } = schemas.add.validate(req.body);
      if(error) {
        throw RequestError(400, "missing fields")
      }
      const { contactId } = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
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
