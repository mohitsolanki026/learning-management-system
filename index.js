const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routers/admin/admin.routes");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
 
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const URL = process.env.MONGODB_URL;
console.log(URL);

app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Namste India!");
});

app.get("*", (req, res) => {
  res.status(404).send("404 Not Found");
});

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err));
