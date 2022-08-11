/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("task", function (table) {
    table.uuid("id").primary();
    table.string("title").notNullable();
    table.boolean("completed").defaultTo(false);
    table.boolean("isEdit").defaultTo(false);
    table.string("description").nullable();
    table.integer("createdAt").unsigned().nullable();
    table.integer("updatedAt").unsigned().nullable();
    table.integer("urgentLevel").unsigned().nullable();
  });
  return knex.raw("GRANT ALL PRIVILEGES ON task TO postgres;");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("task");
};
