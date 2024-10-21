const bcrypt = require("bcryptjs");

const hashingPass = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);
  return hashPass;
};

const comparePass = (password, hash) => {
  const comparing = bcrypt.compareSync(password, hash);
  return comparing;
};

module.exports = { hashingPass, comparePass };
