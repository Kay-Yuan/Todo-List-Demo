const knex = require("knex")({
  client: "postgres",
  connection: {
    host: "localhost",
    port: 4321,
    user: "postgres",
    password: "postgres",
    database: "todo_demo",
  },
});

module.exports = knex;
