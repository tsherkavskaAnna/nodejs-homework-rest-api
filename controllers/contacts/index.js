const listContacts = require("./listContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const removeContact = require("./removeContact");
const updateContact = require("./updateContact");
const updateFavorite = require("./updateFavorire");

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateFavorite,
}