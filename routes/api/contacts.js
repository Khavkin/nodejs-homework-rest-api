const express = require('express');

const { contactsControllers } = require('../../controllers');

const router = express.Router();

router.all('*', contactsControllers.checkAllowedMethods);

router.get('/', contactsControllers.getAllContacts);

router.get('/:contactId', contactsControllers.getContactById);

router.post('/', contactsControllers.addContact);

router.delete('/:contactId', contactsControllers.deleteContactById);

router.put('/:contactId', contactsControllers.updateContact);

router.patch('/:contactId/favorite', contactsControllers.updateFavorite);

module.exports = router;
