const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

const app = express();

// bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Database config
const database = require("./config/keys").mongoURI;

// Connect to Database via mongoose
mongoose
  .connect(database, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true })
  .then(() => console.log("Connect to MongoDatabase sucessfully."))
  .catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport)

// Routes
app.use("/api/users", users)


// process.env.PORT is Herokus port, for deployment.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
