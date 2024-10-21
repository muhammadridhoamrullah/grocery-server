const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const router = require("express").Router();

// And routes below need authentication
router.post("/register", Controller.register);
router.post("/login", Controller.login);

// And routes below need authorization
router.use(authentication);
router.get("/groceries", Controller.getGroceries);
router.post("/groceries", Controller.addGrocery);

// The request user should be match with grocery.UserId
// router.use(authorization);
router.put("/groceries/:id", authorization, Controller.editGrocery);
router.delete("/groceries/:id", authorization, Controller.deleteGrocery);

module.exports = router;
