const express = require("express");
const router = express.Router();
const { content } = require("../controllers");

router.get("/:folderId", content.getContent);
router.post("/:folderId",content.createContent);
router.put("/:contentId",content.renameContent);
router.delete("/:contentId",content.deleteContent);

module.exports = router;