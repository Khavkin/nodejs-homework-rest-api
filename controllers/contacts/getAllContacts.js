const { contactsService } = require('../../service');

const getAllContacts = async (req, res, next) => {
  try {
    const data = await contactsService.getContacts();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = getAllContacts;
