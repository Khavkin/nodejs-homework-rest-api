const { isValidObjectId } = require('mongoose');
const { contactsService } = require('../../service');

const deleteByContactId = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.contactId))
      return res.status(400).json({ message: 'Invalid contactId' });

    const result = await contactsService.removeContact(req.params.contactId);
    if (result > 0) res.status(200).json({ message: 'contact deleted' });
    else res.status(404).json({ message: 'Not found' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = deleteByContactId;
