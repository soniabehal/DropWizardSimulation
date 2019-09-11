const mongoose = require("mongoose");

const fileTypes = ["FOLDER", "FILE"];

const contentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder'
  },
  description: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  fileType: {
    type: String,
    enum: fileTypes
  },
  createdBy: {
    type: String         // will be of type "mongoose.Schema.Types.ObjectId" refering to user id
  }
}, { timestamps: true });

contentSchema.index({ parentId: 1 })

module.exports = mongoose.model("Content", contentSchema);