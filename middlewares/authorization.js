const { Grocery, User } = require("../models/index");

async function authorization(req, res, next) {
  try {
    const { id } = req.params;

    let findGrocery = await Grocery.findByPk(id);
    if (!findGrocery) {
      throw { name: "DATANOTFOUND" };
    }
    console.log("jalan");

    if (req.userId === findGrocery.UserId) {
      next();
    } else {
      throw { name: "FORBIDDEN" };
    }
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;
