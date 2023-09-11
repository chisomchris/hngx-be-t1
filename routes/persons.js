const {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/personController");

const router = require("express").Router();

router.route("/").get(getUsers);

router.route("/").post(addUser);

router.route("/:name").get(getUser);

router.route("/:id").put(updateUser);

router.route("/:id").delete(deleteUser);

module.exports = router;
