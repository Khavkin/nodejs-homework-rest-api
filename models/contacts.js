const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

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

const getContactById = async contactId => {
  try {
    const data = await listContacts();
    const result = data?.filter(({ id }) => id === contactId);
    return result;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

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
