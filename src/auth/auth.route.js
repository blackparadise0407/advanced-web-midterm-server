const router = require("express").Router();
const { auth } = require("../services/auth");
const AuthCtrl = require("./auth.controller");

router.get("/", auth, AuthCtrl.auth);
router.post("/register", AuthCtrl.regsiter);
router.post("/login", AuthCtrl.login);
router.post("/update", auth, AuthCtrl.changeInfo);


module.exports = router;
