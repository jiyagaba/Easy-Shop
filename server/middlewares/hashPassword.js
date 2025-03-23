const bcrypt = require('bcryptjs');

const hashPassword = async (req, res, next) => {
  console.log("hash middleware")
  console.log(req.body)
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = hashPassword;