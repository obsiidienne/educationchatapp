const {
  adminLogin,
  allUsers,
  deleteUser,
  editUser,
  addUser,
} = require("../controllers/adminController");
const {
  allEtablissement,
  deleteEtablissement,
  editEtablissement,
  addEtablissement,
} = require("../controllers/etablissementController");
const { verifyAdmin } = require("../middleware/authAdmin");

const router = require("express").Router();

router.post("/", adminLogin);
router.get("/userlist",allUsers);
router.delete("/delete-user/:userId", deleteUser);
router.put("/edit-user", editUser);
router.post("/add-user", addUser);
router.get("/etablissementlist", allEtablissement);
router.delete("/delete/:Id", deleteEtablissement);
router.put("/edit", editEtablissement);
router.post("/add", addEtablissement);

module.exports = router;
