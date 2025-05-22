const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const todoRoutes = require("./routes/todos");
const summarizeRoutes = require("./routes/summarize");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/todos", todoRoutes);
app.use("/summarize", summarizeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));