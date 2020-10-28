const router = require("express").Router();
const { auth } = require("../services/auth");

const boardRoute = require("../board/board.route");
const userRoute = require("../user/user.route");
const authRoute = require("../auth/auth.route");

// router.use('/user', user);
router.use("/board", boardRoute);
router.use("/auth", authRoute);

module.exports = router;
