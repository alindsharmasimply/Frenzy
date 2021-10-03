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

app.use(require("./routes/auth.route"));
app.use(require("./routes/post.route"));

app.get("/", (req, res) => {
  res.send(`<h1>Hello!</h1>`);
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Application is listening at port ${port}`);
});
