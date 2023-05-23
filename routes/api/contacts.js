const express = require('express');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');
const { schemaUpdate, schemaInsert } = require('../../utils/validate');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await listContacts();
    res.status(200).json({ ...data });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const data = await getContactById(req.params.contactId);
    if (data) res.status(200).json({ ...data });
    else res.status(404).json({ message: 'Not found' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const validationResult = schemaInsert.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details[0].message });
    }
    const result = await addContact(req.body);
    if (result) res.status(201).json({ ...result });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId);
    if (result >= 0) res.status(200).json({ message: 'contact deleted' });
    else res.status(404).json({ message: 'Not found' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    if (Object.keys(req.body).length !== 0) {
      console.log('in if');
      const validationResult = schemaUpdate.validate(req.body);

      if (validationResult.error) {
        return res.status(400).json({ message: validationResult.error.details[0].message });
      }
      const result = await updateContact(req.params.contactId, req.body);
      if (result) res.status(200).json({ ...result });
      else res.status(404).json({ message: 'Not found' });
    } else res.status(400).json({ message: 'missing fields' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.all('*', async (req, res, next) => {
  const allowedMethods = ['GET', 'PUT', 'POST,DELETE'];
  const { method } = req;
  if (!allowedMethods.includes(method.toUpperCase())) {
    return res.status(400).json({ message: `method ${method} not allowed` });
  }
  next();
});

module.exports = router;
