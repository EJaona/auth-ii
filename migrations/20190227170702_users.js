exports.up = function(knex, Promise) {
  return knex.schema.createTable("user", user => {
    user.increments();

    user.string("name", 123).notNullable();

    user
      .string("username", 123)
      .notNullable()
      .unique();

    user.string("password", 123).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
