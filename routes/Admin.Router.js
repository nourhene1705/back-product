const express = require("express");
const router = express.Router();
const AdminCtrl = require("../controllers/AdminCtrl");
const verifyRole = require("../middleware/permission");

// Public Routes
router.post("/login", AdminCtrl.login);
router.post("/logout", AdminCtrl.logout);
router.post('/addAdmin', AdminCtrl.addAdmin);

// Protected Routes (only for admins)
router.put("/update-admin/:id", verifyRole("admin"), AdminCtrl.updateAdmin);
router.delete("/delete/:id", AdminCtrl.deleteAdmin);

router.get("/users", AdminCtrl.getAllUsers);
module.exports = router;
