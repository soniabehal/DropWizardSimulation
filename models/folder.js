const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: String         // will be of type "mongoose.Schema.Types.ObjectId" refering to user id
  }
}, { timestamps: true });

module.exports = mongoose.model("Folder", folderSchema);