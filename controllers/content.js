const { content, folder } = require("../models");
const mongoose = require("mongoose");

module.exports = {
  async getContent(req, res) {
    try {
      if (!req.params.folderId)
        throw "Folder id required";
      const existingFolder = await folder.findOne({ _id: req.params.folderId }) || await content.findOne({ _id: req.params.folderId });
      if (!existingFolder.isActive) throw "Folder doesn't esists.";
      const folderContent = await content.find({ parentId: mongoose.Types.ObjectId(req.params.folderId), isActive: true });
      res.json({
        success: true,
        result: folderContent
      })
    }
    catch (err) {
      res.json({
        success: false,
        error: err
      })
    }
  },
  async createContent(req, res) {
    try {
      if (!req.body.folder || !req.params.folderId)
        throw "Required information not available for folder addition";
      let newfolder = {};
      if (Array.isArray(req.body.folder))
        newfolder = req.body.folder.map(f => {
          f.parentId = req.params.folderId;
          f.fileType = (f.name.includes(".zip") || !f.name.includes(".")) ? "FOLDER" : "FILE"; // a util can be included to check file type
          return f;
        });
      else {
        newfolder = req.body.folder;
        newfolder.parentId = req.params.folderId;
        newfolder.fileType = (newfolder.name.includes(".zip") || !newfolder.name.includes(".")) ? "FOLDER" : "FILE";
      }
      const newContent = await content.create(newfolder);
      res.json({
        success: true,
        result: newContent
      })
    }
    catch (err) {
      res.json({
        success: false,
        error: err
      })
    }
  },
  async deleteContent(req, res) {
    try {
      if (!req.params.contentId)
        throw "Folder or file id required.";
      const updatedContent = await content.findOneAndUpdate({ _id: req.params.contentId }, { isActive: false }, { new: true });
      res.json({
        success: true,
        result: updatedContent
      })
    }
    catch (err) {
      res.json({
        success: false,
        error: err
      })
    }
  },
  async renameContent(req, res) {
    try {
      if (!req.params.contentId)
        throw "Folder or file id required.";
      const updatedContent = await content.findOneAndUpdate({ _id: req.params.contentId }, req.body, { new: true });
      res.json({
        success: true,
        result: updatedContent
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