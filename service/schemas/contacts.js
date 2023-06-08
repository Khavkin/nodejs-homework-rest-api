const mongoose = require('mongoose');
const handleMangooseError = require('../../middlewares/handleMangooseError');
const Schema = mongoose.Schema;

console.log(handleMangooseError);

const contact = new Schema(
  {
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
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { collection: 'contacts' }
);

contact.post('save', handleMangooseError);

const ContactModel = mongoose.model('contact', contact);

module.exports = ContactModel;
