const current = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'current' });
    // const validationResult = schemaInsert.validate(req.body);

    // if (validationResult.error) {
    //   return res.status(400).json({ message: validationResult.error.details[0].message });
    // }
    // const result = await contactsService.addContact(req.body);
    // if (result) res.status(201).json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = current;
