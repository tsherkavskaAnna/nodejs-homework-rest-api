const express = require('express');
const ctrl = require("../../controllers/contacts");
const {authorization, isValidId, validationBody} = require('../../middlewares');
const { schemas } = require('../../models/contact');
const {ctrlWrapper} = require("../../helpers");


const router = express.Router()

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getContactById));

router.post('/', authorization, validationBody(schemas.add), ctrlWrapper(ctrl.addContact));

router.delete('/:contactId',isValidId, ctrlWrapper(ctrl.removeContact));

router.put('/:contactId',isValidId, validationBody(schemas.add), ctrlWrapper(ctrl.updateContact));

router.patch('/:contactId/favorite',validationBody(schemas.update), ctrlWrapper(ctrl.updateFavorire));

module.exports = router;
