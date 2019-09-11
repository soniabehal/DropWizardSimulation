const express = require("express");
const router = express.Router();
const { folder } = require("../controllers");

router.get("/", folder.getFolders);   //userid will be added either in params or headers
router.get("/:id", folder.getFolder);  //id refers to folder id
router.post("/", folder.createFolder);
router.put("/:id", folder.renameFolder);
router.delete("/:id", folder.deleteFolder);

module.exports = router;