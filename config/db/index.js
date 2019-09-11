const mongoose = require("mongoose");

module.exports = {
  async connect() {
    try {
      await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
      console.log("DB connection successfull!!");
    }
    catch (err) {
      console.log("Error in connecting DB");
    }
  }
}