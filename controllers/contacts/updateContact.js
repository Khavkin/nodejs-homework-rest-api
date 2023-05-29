const { isValidObjectId } = require('mongoose');
const { contactsService } = require('../../service/');

const { schemaUpdate } = require('../../utils/validate');

const updateContact = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.contactId))
      return res.status(400).json({ message: 'Invalid contactId' });

    if (Object.keys(req.body).length !== 0) {
      const validationResult = schemaUpdate.validate(req.body);

      if (validationResult.error) {
        return res.status(400).json({ message: validationResult.error.details[0].message });
      }
      const result = await contactsService.updateContact(req.params.contactId, req.body);
      if (result) res.status(200).json(result);
      else res.status(404).json({ message: 'Not found' });
    } else res.status(400).json({ message: 'missing fields' });
  } catch (e) {
    res.status(404).json({ message: 'Not found' });
  }
};

module.exports = updateContact;
