const { isValidObjectId } = require('mongoose');
const { schemaUpdate } = require('../../utils/validate');
const { contactsService } = require('../../service');

const updateFavorite = async (req, res, next) => {
  const contactId = req.params.contactId;
  const { favorite } = req.body;
  if (!isValidObjectId(contactId)) return res.status(400).json({ message: 'Invalid contactId' });

  try {
    if (favorite) {
      const validationResult = schemaUpdate.validate({ favorite });
      if (validationResult.error) {
        return res.status(400).json({ message: validationResult.error.details[0].message });
      }

      const body = { favorite };

      const data = await contactsService.updateStatusContact(contactId, body);

      if (data) res.status(200).json(data);
      else res.status(404).json({ message: 'Not found' });
    } else return res.status(400).json({ message: 'missing field favorite' });
  } catch (e) {
    res.status(404).json({ message: 'Not found' });
  }
};

module.exports = updateFavorite;
