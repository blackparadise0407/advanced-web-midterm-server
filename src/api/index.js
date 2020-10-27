const express = require('express')
const router = express.Router()

const board = require('../board/board.route');
const user = require('../user/user.route');
const auth = require('../auth/auth.route');


// router.use('/user', user);
// router.use('/board', board);
router.use('/auth', auth);


module.exports = router

