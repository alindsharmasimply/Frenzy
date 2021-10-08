require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log(`Connection Succesful ${res}`))
  .catch((err) => console.log(`Error in DB connection ${err}`));

app.use(express.json());
//routes for the app
app.use(require("./routes/auth.route"));
app.use(require("./routes/post.route"));
app.use(require("./routes/user.route"));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Application is listening at port ${port}`);
});
