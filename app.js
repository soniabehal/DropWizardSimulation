const express = require("express");
require("dotenv").config();  // its reads the .evn file and attach all the variables to global vriable called "process"
const bodyParser = require("body-parser");
const app = express();
require("./config/db").connect();
const routes = require("./routes");
const port = process.env.PORT;

app.use(bodyParser.json())
app.use(routes);

app.listen(port, (err) => {
  if (err) {
    console.log("Error in starting app at port:", port, " : ", err);
  }
  else {
    console.log("Server started at port:", port)
  }
})