import express, { Application, Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const port: number | string = process.env.PORT || 3000;
const app: Application = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/task", require("./routes/task/task.route"));

app.listen(port, () => console.log(`Server started on port ${port}`));
