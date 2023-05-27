const express = require('express');

const {
  getContactsController,
  getContactByIdController,
  postRootController,
  deleteByContactIdController,
  putByContactIdController,
  checkAllowedMethods,
  patchFavoriteController,
} = require('../../controllers/controllers');

const router = express.Router();

router.all('*', checkAllowedMethods);

router.get('/', getContactsController);

router.get('/:contactId', getContactByIdController);

router.post('/', postRootController);

router.delete('/:contactId', deleteByContactIdController);

router.put('/:contactId', putByContactIdController);

router.patch('/:contactId/favorite', patchFavoriteController);

module.exports = router;
