const express = require("express");
const app = express();
const indexRoutes = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
