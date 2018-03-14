exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTableIfNotExists('logins', (login) => {
    login.string('username').notNullable().primary();
    login.string('password').notNullable();
  }),
  knex.schema.createTableIfNotExists('days', (day) => {
    day.string('id').notNullable().primary(); // shortid
    day.string('date').notNullable(); // no format specified
    day.string('colors').notNullable(); // stringified object
    day.integer('happiness').notNullable();
    day.integer('productivity').notNullable();
    // day.string('username').references('username').inTable('logins').notNullable().onDelete('cascade');
    day.string('username').notNullable();
  }),
  knex.schema.createTableIfNotExists('activities', (activity) => {
    activity.string('id').notNullable().primary(); // shortid
    activity.string('activity').notNullable();
    activity.string('colors').notNullable(); // stringified object
    activity.integer('happiness').notNullable();
    activity.integer('productivity').notNullable();
    // activity.string('username').references('username').inTable('logins').notNullable().onDelete('cascade');
    // activity.string('day').references('id').inTable('days').notNullable().onDelete('cascade');
    activity.string('username').notNullable();
    activity.string('day').notNullable();
  }),
]);
  
exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTableIfExists('logins'),
  knex.schema.dropTableIfExists('days'),
  knex.schema.dropTableIfExists('activities'),
]);
