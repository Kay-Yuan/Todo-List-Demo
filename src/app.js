const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

app.use("/task", require("./routes/task/task.route"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
