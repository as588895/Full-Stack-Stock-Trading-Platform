const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const protect = require("../middleware/authMiddleware");

const {
    signup,
    login,
    logout,
    getMe,
} = require("../controller/authController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", verifyToken, getMe);
// router.get("/me", protect, (req, res) => {

//     res.json({
//         success: true,
//         user: req.user
//     });

// });

router.post("/logout", logout);




module.exports = router;