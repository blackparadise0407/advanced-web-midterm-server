const router = require('express').Router();
const AuthCtrl = require('./auth.controller');

router.post('/register', AuthCtrl.regsiter);
router.post('/login', AuthCtrl.login);

module.exports = router
