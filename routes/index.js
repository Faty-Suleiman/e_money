const express = require("express");
const router = express.Router();
const { signUp, login, getUserDetails } = require("../controllers/index");
const { authorization } = require("../middleWares/authorization");;

router.post("/signup", signUp);
router.post("/login", login);
router.get("/getUserDetails:/user-id",  getUserDetails);

module.exports = router;
