const { Contact, schemas} = require("../../models/contact");
const {RequestError} = require("../../helpers/RequestError");


const addContact = async (req, res, next) => {
  console.log(req.user);
  const {_id: owner} = req.user;
  try {
    const { error } = schemas.add.validate(req.body);
    if (error) {
       throw RequestError(400, "missing required name field");
    }
    const result = await Contact.create({...req.body, owner});
    res.status(201).json({
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