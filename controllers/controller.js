const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, Grocery } = require("../models/index");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;

      const regisUser = await User.create({
        email,
        password,
      });

      res.status(201).json({
        id: regisUser.id,
        email: regisUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "NO_EMAIL" };
      }

      if (!password) {
        throw { name: "NO_PASSWORD" };
      }

      let findUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!findUser) {
        throw { name: "INVALIDEMAILPASS" };
      }

      let checkingPass = comparePass(password, findUser.password);

      if (!checkingPass) {
        throw { name: "INVALIDEMAILPASS" };
      }

      let access_token = signToken({
        id: findUser.id,
        email,
      });

      res.status(200).json({
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getGroceries(req, res, next) {
    try {
      const findAllGroceries = await Grocery.findAll({
        where: {
          UserId: req.userId,
        },
      });
      res.status(200).json(findAllGroceries);
    } catch (error) {
      next(error);
    }
  }

  static async addGrocery(req, res, next) {
    try {
      const { title, price, tag, imageUrl } = req.body;

      const adding = await Grocery.create({
        title,
        price,
        tag,
        imageUrl,
        UserId: req.userId,
      });
      res.status(201).json(adding);
    } catch (error) {
      console.log(error, "ini error");

      next(error);
    }
  }

  static async editGrocery(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id, "ini id");

      const { title, price, tag, imageUrl } = req.body;

      let findGrocery = await Grocery.findByPk(id);
      if (!findGrocery) {
        throw { name: "DATANOTFOUND" };
      }
      console.log("jalan 2");

      await Grocery.update(
        {
          title,
          price,
          tag,
          imageUrl,
          UserId: req.userId,
        },
        {
          where: {
            id,
          },
        }
      );

      console.log("jalan 3");

      res.status(200).json({
        message: "Grocery item has been updated",
      });
    } catch (error) {
      console.log(error, "ini error");

      next(error);
    }
  }

  static async deleteGrocery(req, res, next) {
    try {
      const { id } = req.params;

      const findGrocery = await Grocery.findByPk(id);

      if (!findGrocery) {
        throw { name: "DATANOTFOUND" };
      }

      await Grocery.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Grocery item has been deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
