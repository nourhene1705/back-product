const express = require("express");
const router = express.Router();
const AdminCtrl = require("../controllers/AdminCtrl");
const verifyRole = require("../middleware/permission");
console.log("AdminCtrl:", AdminCtrl);

// Public Routes
router.post("/login", AdminCtrl.login);
router.post("/logout", AdminCtrl.logout);

// Protected Routes (only for admins)
router.put("/update-admin/:id", verifyRole("admin"), AdminCtrl.updateAdmin);
router.delete("/delete-admin/:id", verifyRole("admin"), AdminCtrl.deleteAdmin);

module.exports = router;


