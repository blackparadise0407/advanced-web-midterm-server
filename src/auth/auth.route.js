const router = require("express").Router();
const { auth } = require("../services/auth");
const AuthCtrl = require("./auth.controller");

router.post("/register", AuthCtrl.regsiter);
router.post("/login", AuthCtrl.login);
router.get("/test", auth, AuthCtrl.test);

module.exports = router;
