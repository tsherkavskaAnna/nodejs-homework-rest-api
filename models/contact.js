const {Schema, model, SchemaTypes} = require("mongoose");
const Joi = require("joi");


const contactsSchema = new Schema({
        name: {
          type: String,
          required: [true, 'Set name for contact'],
        },
        email: {
          type: String,
        },
        phone: {
          type: String,
        },
        favorite: {
          type: Boolean,
          default: false,
        },
        owner: {
          type: SchemaTypes.ObjectId,
          ref: 'user',
        }
}, 
 {versionKey: false, timestamps: true}
);


const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})


const Contact = model("contact", contactsSchema);


module.exports = {
  Contact,
  schemas: {
    add: addSchema,
    update: updateFavoriteSchema,
  }
};