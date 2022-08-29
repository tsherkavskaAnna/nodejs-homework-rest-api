const { Contact, schemas} = require("../models/contact");
const { RequestError } = require("../helpers/");


const addContact = async (req, res, next) => {
  try {
    const { error } = schemas.add.validate(req.body);
    if (error) {
       throw RequestError(400, "missing required name field");
    }
    const result = await Contact.create(req.body);
    res.json({
      status: 'success',
      code: 201,
      message: "contact created",
      data: { result },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = addContact;