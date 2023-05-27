const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateStatusContact,
  updateContact,
} = require('../service/contacts-db');
const Contact = require('../service/schemas/contacts');
const { schemaInsert, schemaUpdate } = require('../utils/validate');

const getContactsController = async (req, res, next) => {
  try {
    const data = await getContacts();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getContactByIdController = async (req, res, next) => {
  try {
    const data = await getContactById(req.params.contactId);

    if (data) res.status(200).json(data);
    else res.status(404).json({ message: 'Not found' });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const postRootController = async (req, res, next) => {
  try {
    const validationResult = schemaInsert.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details[0].message });
    }
    const result = await addContact(req.body);
    if (result) res.status(201).json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteByContactIdController = async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId);
    if (result > 0) res.status(200).json({ message: 'contact deleted' });
    else res.status(404).json({ message: 'Not found' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const putByContactIdController = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length !== 0) {
      const validationResult = schemaUpdate.validate(req.body);

      if (validationResult.error) {
        return res.status(400).json({ message: validationResult.error.details[0].message });
      }
      const result = await updateContact(req.params.contactId, req.body);
      if (result) res.status(200).json(result);
      else res.status(404).json({ message: 'Not found' });
    } else res.status(400).json({ message: 'missing fields' });
  } catch (e) {
    res.status(404).json({ message: 'Not found' });
  }
};

const checkAllowedMethods = async (req, res, next) => {
  const allowedMethods = ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'];
  const { method } = req;
  if (!allowedMethods.includes(method.toUpperCase())) {
    return res.status(400).json({ message: `method ${method} is not allowed` });
  }
  next();
};

const patchFavoriteController = async (req, res, next) => {
  const contactId = req.params.contactId;
  const { favorite } = req.body;
  console.log('favorite', favorite);
  try {
    if (favorite) {
      const validationResult = schemaUpdate.validate({ favorite });
      if (validationResult.error) {
        return res.status(400).json({ message: validationResult.error.details[0].message });
      }
      const body = { favorite: favorite.toLowerCase() === 'true' ? true : false };
      const data = await updateStatusContact(contactId, body);

      if (data) res.status(200).json(data);
      else res.status(404).json({ message: 'Not found' });
    } else return res.status(400).json({ message: 'missing field favorite' });
  } catch (e) {
    res.status(404).json({ message: 'Not found' });
  }

  // if (Object.keys(body).length !== 0 && Object.keys(body).includes("favorite")) {
  //   const validationResult = schemaUpdate.validate(req.body);
  // }
};

module.exports = {
  getContactsController,
  getContactByIdController,
  postRootController,
  deleteByContactIdController,
  putByContactIdController,
  checkAllowedMethods,
  patchFavoriteController,
};
