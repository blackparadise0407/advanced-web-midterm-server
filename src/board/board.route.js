const router = require("express").Router();
const BoardCtrl = require("./board.controller");

router.get("/", BoardCtrl.listAll);
router.post("/:id/action", BoardCtrl.addActions);
router.get("/:id", BoardCtrl.getByID);
router.post("/", BoardCtrl.add);
router.post("/:id", BoardCtrl.update);
router.delete("/:id", BoardCtrl.remove);

module.exports = router;
