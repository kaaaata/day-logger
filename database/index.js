const knex = require('./db');

// DEVELOPMENT
const addDummyData = async() => {
  await knex('logins').insert({
    username: 'dummy',
    password: 'dummy',
  });
};
const getAll = async() => {
  const users = await knex.select().from('logins');
  const days = await knex.select().from('days');
  const activities = await knex.select().from('activities');
  return { users, days, activities };
}

// PRODUCTION
const usernameAvailable = async(username) => (await knex('logins').where({ username }).select()).length === 0;
const validLogin = async(username, password) => (await knex('logins').where({ username, password }).select()).length === 1;
const newLogin = async(username, password) => await knex('logins').insert({ username, password });



module.exports = {
  addDummyData,
  getAll,
  validLogin,
  usernameAvailable,
  newLogin,
};
