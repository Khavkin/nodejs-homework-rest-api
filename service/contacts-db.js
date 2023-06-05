const { ContactModel } = require('./schemas/');

/***
 * function getContacts
 * return all contacts from MongoDB
 *
 * @return array of contacts {id,name,email,phone,favorite}
 */

const getContacts = async () => {
  try {
    const data = await ContactModel.find();

    return data || [];
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

/***
 * function getContactById
 * return contact by contactId or null
 *
 * @param {contactId} - id for search
 * @return contact or null
 */
const getContactById = async contactId => {
  try {
    const data = await ContactModel.findById(contactId);
    return data;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

/***
 * function removeContact
 * Remove contact by contactId and return count of deleted contacts
 *
 * @param {contactId} - id for remove
 * @return return count of deleted contacts
 */
const removeContact = async contactId => {
  try {
    const data = await ContactModel.deleteOne({ _id: contactId });

    return data.deletedCount;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

/***
 * function addContact
 * Add contact and return new contact
 *
 * @param body {
 * {name} (required) - contact name,
 * {email} - contact email,
 * {phone} - contact phone,
 * {favorite} - is favorite contact,
 * }
 *
 * @return contact = {id,name,email,phone,favorite}
 */
const addContact = async body => {
  const { name, email, phone, favorite } = body;
  const newContact = { name, email, phone, favorite };

  try {
    const data = await ContactModel.create(newContact);
    return data;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

/***
 * function updateContact
 * Update contact and return updated contact
 *
 @param body {
 * {name}  - contact name,
 * {email} - contact email,
 * {phone} - contact phone,
 * {favorite} - is favorite contact,
 * }
 * @return contact = {id,name,email,phone} or throw error
 */
const updateContact = async (contactId, body) => {
  try {
    const response = await ContactModel.findOneAndUpdate({ _id: contactId }, body, { new: true });
    return response;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

/***
 * function updateStatusContact
 * Update contact status and return updated contact
 *
 @param body {
 * {favorite} - is favorite contact,
 * }
 * @return contact = {id,name,email,phone,favorite} or throw error
 */
const updateStatusContact = async (contactId, body) => {
  try {
    const response = await ContactModel.findOneAndUpdate({ _id: contactId }, body, { new: true });

    return response;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

const contactsService = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};

module.exports = contactsService;
