const { folder, content } = require("../models");

module.exports = {
  async getFolders(req, res) {
    try {
      const folders = await folder.find({ isActive: true });
      res.json({
        success: true,
        result: folders
      })
    }
    catch (err) {
      res.json({
        success: false,
        error: err
      })
    }
  },
  async getFolder(req, res) {
    try {
      if (!req.params.id)
        throw "Folder id is required";
      const folderData = await folder.findOne({ _id: req.params.id, isActive: true });
      res.json({
        success: true,
        result: folderData
      })
    }
    catch (err) {
      res.json({
        success: false,
        error: err
      })
    }
  },
  async createFolder(req, res) {
    try {
      if (!req.body.folder)
        throw "Required information not available for folder creation";
      const newFolder = await folder.create(req.body.folder);
      res.json({
        success: true,
        result: newFolder
      })
    }
    catch (err) {
      res.json({
        success: false,
        error: err
      })
    }
  },
  async renameFolder(req, res) {
    try {
      if (!req.params.id)
        throw "Folder id required";
      const updatedFolder = await folder.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      res.json({
        success: true,
        result: updatedFolder
      })
    }
    catch (err) {
      res.json({
        success: false,
        error: err
      })
    }
  },
  async deleteFolder(req, res) {
    try {
      if (!req.params.id)
        throw "Folder id required";
      await folder.findOneAndUpdate({ _id: req.params.id }, { isActive: false }, { new: true })
      await content.updateMany({ parentId: req.params.id }, { isActive: false }, { multi: true });
      res.json({
        success: true,
        result: "Folder Deleted successfully"
      })
    }
    catch (err) {
      res.json({
        success: false,
        error: err
      })
    }
  }
}