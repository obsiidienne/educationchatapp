const {
  adminLogin,
  allUsers,
  deleteUser,
  editUser,
  addUser,
} = require("../controllers/adminController");
const { verifyAdmin } = require("../middleware/authAdmin");

const router = require("express").Router();

router.post("/", adminLogin);
router.get("/userlist",allUsers);
router.delete("/delete-user/:userId", deleteUser);
router.put("/edit-user", editUser);
router.post("/add-user", addUser);
module.exports = router;
