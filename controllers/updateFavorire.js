const {Contact} = require("../models/contact");
const RequestError = require("../helpers/RequestError");

const updateFavorite = async(req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
        if(!result) {
            throw RequestError(404, "Not found");
        }
        res.status(201).json({
            status: 'success',
            code: 201,
            data: { result },
          })
    } catch (error) {
        next(error) 
    }
}

module.exports = updateFavorite;