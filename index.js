const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
//require("./services/passport");
const passport = require("passport");
require("./models/User");
require("./services/passport");
const cookieSession = require("cookie-session");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 60 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
{
  /*
app.get("/", (req, res) => {
  res.send({ bye: "buddy" });
});
*/
}

const PORT = process.env.PORT || 5001;

app.listen(PORT);
