const Joi = require("joi");
const joiMiddleware = require("../middlewares/joiMiddleware");

const createTaskSchema = Joi.object().keys({
  body: {
    content: Joi.string(),
    taskStatus: Joi.number(),
    urgentLevel: Joi.number(),
  },
});

const getTaskSchema = Joi.object().keys({
  params: {
    taskId: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
  },
});

const deleteTaskSchema = Joi.object().keys({
  params: {
    taskId: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
  },
});

const updateTaskSchema = Joi.object().keys({
  params: {
    taskId: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
  },
  body: {
    content: Joi.string(),
    taskStatus: Joi.number(),
    urgentLevel: Joi.number(),
  },
});

const getAllTasksSchema = Joi.object().keys({
  params: {
    offset: Joi.number(),
  },
});

module.exports = {
  createTaskSchema: joiMiddleware(createTaskSchema),
  getTaskSchema: joiMiddleware(getTaskSchema),
  getAllTasksSchema: joiMiddleware(getAllTasksSchema),
  deleteTaskSchema: joiMiddleware(deleteTaskSchema),
  updateTaskSchema: joiMiddleware(updateTaskSchema),
};
