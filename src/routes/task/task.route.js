const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const knex = require("../../config/db");

const {
  createTaskSchema,
  getTaskSchema,
  getAllTasksSchema,
  deleteTaskSchema,
  updateTaskSchema,
} = require("../../schema/task.schema");

router.post("/create", createTaskSchema, (req, res) => {
  const { title, description, urgentLevel } = req.body;

  // generate uuid and add to db
  const id = uuidv4();
  const createdAt = Math.floor(new Date().getTime() / 1000);
  // const createdAt = new Date();
  const updatedAt = createdAt;
  const completed = false;
  const isEdit = false;

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

router.get("/:taskId", getTaskSchema, (req, res) => {
  const taskId = req.params.taskId;

  knex("task")
    .where({ id: taskId })
    .then((queryResult) => {
      const task = queryResult[0];

      if (task) {
        res.send(task);
      } else {
        res.status(400);
        res.send({ message: "task not found" });
      }
    })
    .catch((e) => {
      console.log(e);

      res.status(500);
      res.send("INTERNAL SERVER ERROR");
    });
});

router.get("/", getAllTasksSchema, (req, res) => {
  //mock data
  this.tasks = [
    {
      id: "1",
      title: "Task 1",
      description: "Description 1",
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      urgentLevel: 10,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Description 2",
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      urgentLevel: 2,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Description 3",
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      urgentLevel: 3,
    },
  ];

  // get query out from req
  if (!req.query.offset) {
    res.status(400);
    res.send("/tasks request need a query for offset!");
    return;
  }
  const offset = req.query.offset;
  const limit = 5;

  // get result from db
  knex("task")
    .limit(limit)
    .offset(offset)
    .then((taskList) => {
      res.send(taskList);
    })
    .catch((e) => {
      console.log(e);

      res.status(500);
      res.send("INTERNAL SERVER ERROR");
    });
});

router.delete("/:taskId", deleteTaskSchema, (req, res) => {
  const taskId = req.params.taskId;

  knex("task")
    .where({ id: taskId })
    .del()
    .catch((e) => {
      console.log(e);

      res.status(500);
      res.send("INTERNAL SERVER ERROR");
    });

  res.send({ message: "Task deleted" });
});

router.put("/:taskId", updateTaskSchema, (req, res) => {
  const taskId = req.params.taskId;

  const { title, description, urgentLevel } = req.body;
  const updatedAt = Math.floor(new Date().getTime() / 1000);

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
    .catch((e) => {
      console.log(e);

      res.status(500);
      res.send("INTERNAL SERVER ERROR");
    });
});

module.exports = router;
