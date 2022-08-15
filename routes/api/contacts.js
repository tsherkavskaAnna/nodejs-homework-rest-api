const express = require('express');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const { RequestError } = require('../../helpers');
const contactsSchema = require("../../schemas/contacts");


const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts();
  res.json(result);
  } catch (error) {
   next(error)
  }
})

router.get("/:contactId", async(req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await getContactById(contactId);
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
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if(error) {
      throw RequestError(400, "missing required name field");
    }
    const result = await addContact(req.body)
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
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
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
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if(error) {
      throw RequestError(400, "missing fields")
    }
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body)
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
})

module.exports = router
