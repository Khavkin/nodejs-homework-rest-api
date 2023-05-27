const express = require('express');

const ContactsControllers = require('../../controllers/controllers');

const router = express.Router();

router.all('*', ContactsControllers.checkAllowedMethods);

router.get('/', ContactsControllers.getAllContacts);

router.get('/:contactId', ContactsControllers.getContactById);

router.post('/', ContactsControllers.addContact);

router.delete('/:contactId', ContactsControllers.deleteByContactId);

router.put('/:contactId', ContactsControllers.updateContact);

router.patch('/:contactId/favorite', ContactsControllers.updateFavorite);

module.exports = router;
