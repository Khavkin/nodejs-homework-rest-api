const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

/***
 * function listContacts
 * return list of contacts from 'contacts.json'
 *
 * @return array of contacts {id,name,email,phone}
 */
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);

    const result = JSON.parse(data);
    return result || [];
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

/***
 * function getContactById
 * return contact by contactId or undefined
 *
 * @param {contactId} - id for search
 * @return contact or undefined
 */
const getContactById = async contactId => {
  try {
    const data = await listContacts();
    const result = data?.find(({ id }) => id === contactId);

    return result;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

/***
 * function removeContact
 * Remove contact by contactId and return index of deleted contact or -1
 *
 * @param {contactId} - id for remove
 * @return index removed contact in array or -1 if not found
 */

const removeContact = async contactId => {
  try {
    const data = await listContacts();
    const index = data?.findIndex(({ id }) => id === contactId);
    if (index >= 0) {
      data.splice(index, 1);
      await fs.writeFile(contactsPath, JSON.stringify(data, 0, 2));
    }
    return index;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

/***
 * function addContact
 * Add contyact and return new contact
 *
 * @param {name} (required) - contact name
 * @param {email} (required)- contact email
 * @param {phone} (required)- contact phone
 * @return contact = {id,name,email,phone}
 */

const addContact = async body => {
  const { name, email, phone } = body;
  const newContact = { id: nanoid(), name, email, phone };
  try {
    const data = await listContacts();
    const result = data.concat(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(result, 0, 2));
    return newContact;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

/***
 * function updateContact
 * Update contact and return updated contact
 *
 * @param {name} (optional) - contact name
 * @param {email} (optional)- contact email
 * @param {phone} (optional)- contact phone
 * @return contact = {id,name,email,phone} or null (if not found)
 */
const updateContact = async (contactId, body) => {
  try {
    const data = await listContacts();
    const index = data?.findIndex(({ id }) => id === contactId);
    if (index >= 0) {
      const updatedContact = { ...data[index], ...body };
      data.splice(index, 1, updatedContact);
      await fs.writeFile(contactsPath, JSON.stringify(data, 0, 2));
      return updatedContact;
    }
    return null;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
