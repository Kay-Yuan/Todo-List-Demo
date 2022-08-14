import express, { Express, Request, Response, Router } from "express";
import { format } from "path";
import { v4 as uuidv4 } from "uuid";
import taskSchema from "../../schema/task.schema";
import knex from "../../config/db";
import { Task } from "../../task";

const router: Router = express.Router();

const {
  createTaskSchema,
  getTaskSchema,
  getAllTasksSchema,
  deleteTaskSchema,
  updateTaskSchema,
} = taskSchema;

router.post("/create", createTaskSchema, (req: Request, res: Response) => {
  const { title, description, urgentLevel } = req.body;

  // generate uuid and add to db
  const id: string = uuidv4();
  const createdAt: number = Math.floor(new Date().getTime() / 1000);
  const updatedAt: number = createdAt;
  const completed: boolean = false;
  const isEdit: boolean = false;

  knex("task")
    .insert({
      id,
      title,
      createdAt,
      updatedAt,
      completed,
      isEdit,
      description,
      urgentLevel,
    })
    .then(() => {});

  res.send({ message: "Task created", id, createdAt, updatedAt });
});

router.get("/:taskId", getTaskSchema, (req: Request, res: Response) => {
  const taskId: string = req.params.taskId;

  knex("task")
    .where({ id: taskId })
    .then((queryResult: Task[]) => {
      const task: Task = queryResult[0];

      if (task) {
        res.send(task);
      } else {
        res.status(400);
        res.send({ message: "task not found" });
      }
    })
    .catch((e: Error) => {
      console.log(e);

      res.status(500);
      res.send("INTERNAL SERVER ERROR");
    });
});

router.get("/", getAllTasksSchema, (req: Request, res: Response) => {
  // get query out from req
  if (!req.query.offset) {
    res.status(400);
    res.send("/tasks request need a query for offset!");
    return;
  }
  const offset: any = req.query.offset;
  const limit: number = 5;

  // get result from db
  knex("task")
    .limit(limit)
    .offset(offset)
    .then((taskList: Task[]) => {
      res.send(taskList);
    })
    .catch((e: Error) => {
      console.log(e);

      res.status(500);
      res.send("INTERNAL SERVER ERROR");
    });
});

router.delete("/:taskId", deleteTaskSchema, (req: Request, res: Response) => {
  const taskId: string = req.params.taskId;

  knex("task")
    .where({ id: taskId })
    .del()
    .catch((e: Error) => {
      console.log(e);

      res.status(500);
      res.send("INTERNAL SERVER ERROR");
    });

  res.send({ message: "Task deleted" });
});

router.put("/:taskId", updateTaskSchema, (req: Request, res: Response) => {
  const taskId: string = req.params.taskId;

  const { title, description, urgentLevel } = req.body;
  const updatedAt: number = Math.floor(new Date().getTime() / 1000);

  knex("task")
    .where({ id: taskId })
    .update({
      title,
      updatedAt,
      description,
      urgentLevel,
    })
    .then(() => {
      res.json({ message: "Task updated" });
    })
    .catch((e: Error) => {
      console.log(e);

      res.status(500);
      res.send("INTERNAL SERVER ERROR");
    });
});

module.exports = router;
