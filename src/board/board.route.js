const router = require("express").Router();
const BoardCtrl = require("./board.controller");
const { auth } = require("../services/auth");

router.get("/", auth, BoardCtrl.getByCurrentUser);
router.post("/:id/action", auth, BoardCtrl.addActions);
router.post("/:id/remove-action", auth, BoardCtrl.removeActions);
router.get("/:id", auth, BoardCtrl.getByID);
router.post("/", auth, BoardCtrl.add);
router.post("/:id", auth, BoardCtrl.update);
router.delete("/:id", auth, BoardCtrl.remove);

module.exports = router;
