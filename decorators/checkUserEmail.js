const { httpError } = require('../helpers');
const { usersService } = require('../service');

// const checkUserEmail = () => {
//   const func = async (req, res, next) => {
//     const { email } = req.body;
//     try {
//       console.log('check user email', email);
//       if (email) {
//         const user = await usersService.getUserByEmail(email);
//         if (user) next(httpError(409, 'Email in use'));
//         else next();
//       }
//       next();
//     } catch (e) {
//       next(httpError(500, e.message));
//     }
//   };
//   console.log(func);
//   return func;
// };

// const checkUserEmail = async (req, res, next) => {
//   const { email } = req.body;
//   try {
//     console.log('check user email', email);
//     if (email) {
//       const user = await usersService.getUserByEmail(email);
//       if (user) next(httpError(409, 'Email in use'));
//       else next();
//     }
//     next();
//   } catch (e) {
//     next(httpError(500, e.message));
//   }
// };

const checkUserEmail = () => {
  const func = (req, res, next) => {
    const { email } = req.body;

    if (email) {
      const user = usersService
        .getUserByEmail(email)
        .then(user => {
          if (user) next(httpError(409, 'Email in use'));
          else next();
        })
        .catch(e => next(httpError(500, e.message)));
    } else next();
  };

  return func;
};

module.exports = checkUserEmail;
