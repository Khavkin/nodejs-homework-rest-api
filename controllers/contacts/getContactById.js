const { isValidObjectId } = require('mongoose');
const { contactsService } = require('../../service');

const getContactById = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.contactId))
      return res.status(400).json({ message: 'Invalid contactId' });

    const data = await contactsService.getContactById(req.params.contactId);

    if (data) res.status(200).json(data);
    else res.status(404).json({ message: 'Not found' });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports = getContactById;
