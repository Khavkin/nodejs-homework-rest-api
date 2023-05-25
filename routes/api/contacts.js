const express = require('express');

const {
  getContactsController,
  getContactByIdController,
  postRootController,
  deleteByContactIdController,
  putByContactIdController,
  checkAllowedMethods,
} = require('../../controllers/controllers');

const router = express.Router();

router.all('*', checkAllowedMethods);

router.get('/', getContactsController);

router.get('/:contactId', getContactByIdController);

router.post('/', postRootController);

router.delete('/:contactId', deleteByContactIdController);

router.put('/:contactId', putByContactIdController);

module.exports = router;
