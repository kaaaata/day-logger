const knex = require('./db');
const shortid = require('shortid');

// DEVELOPMENT
// const colors = JSON.stringify({ input: 'rgba(200, 200, 200, 0.4)', body: 'rgba(200, 200, 200, 0.6)', border: 'rgba(200, 200, 200, 0.8)' });
// const addDummyData = async() => {
//   const logins = [
//     { username: 'cat', password: 'cat' },
//     { username: 'dog', password: 'dog' },
//   ];
//   const days = [
//     { id: '1', date: 'March 1, 2018', colors, happiness: 50, productivity: 50, username: 'cat' },
//     { id: '2', date: 'March 2, 2018', colors, happiness: 50, productivity: 50, username: 'cat' },
//     { id: '3', date: 'March 3, 2018', colors, happiness: 50, productivity: 50, username: 'cat' },
//   ];
//   const activities = [
//     { id: '4', activity: 'learn redux', colors, happiness: 50, productivity: 50, username: 'cat', day: '1' },
//     { id: '5', activity: 'work out', colors, happiness: 50, productivity: 50, username: 'cat', day: '1' },
//     { id: '6', activity: 'play dota', colors, happiness: 50, productivity: 50, username: 'cat', day: '1' },
//     { id: '7', activity: 'learn redux', colors, happiness: 50, productivity: 50, username: 'cat', day: '2' },
//     { id: '8', activity: 'work out', colors, happiness: 50, productivity: 50, username: 'cat', day: '2' },
//     { id: '9', activity: 'play dota', colors, happiness: 50, productivity: 50, username: 'cat', day: '2' },
//     { id: '10', activity: 'learn redux', colors, happiness: 50, productivity: 50, username: 'cat', day: '3' },
//     { id: '11', activity: 'work out', colors, happiness: 50, productivity: 50, username: 'cat', day: '3' },
//     { id: '12', activity: 'play dota', colors, happiness: 50, productivity: 50, username: 'cat', day: '3' },
//   ];
//   await knex('logins').insert(logins);
//   await knex('days').insert(days);
//   await knex('activities').insert(activities);
// };
// const getAll = async() => {
//   const users = await knex.select().from('logins');
//   const days = await knex.select().from('days');
//   const activities = await knex.select().from('activities');
//   return { users, days, activities };
// };

// LOGIN
const usernameAvailable = async(username) => (await knex('logins').where({ username }).select()).length === 0;
const validLogin = async(username, password) => (await knex('logins').where({ username, password }).select()).length === 1;
const newLogin = async(username, password) => {
  await knex('logins').insert({ username, password });
  const day_id = shortid.generate();
  await knex('days').insert({ id: day_id, date: 'Sample Day', colors, happiness: 50, productivity: 50, username });
  await knex('activities').insert({ id: shortid.generate(), activity: 'Sample activity', colors, happiness: 50, productivity: 50, username, day: day_id });
};

// DAYS
const getDaysByUsername = async(username) => await knex('days').where({ username }).select();

// ACTIVITIES
const getActivitiesByUsername = async(username) => await knex('activities').where({ username }).select();

// SYNCING
const persistDaysAndActivitiesForUsername = async(username, days, activities) => {
  await knex('days').where({ username }).del();
  await knex('days').insert(days);
  await knex('activities').where({ username }).del();
  await knex('activities').insert(activities);
};

module.exports = {
  // addDummyData,
  // getAll,
  usernameAvailable,
  validLogin,
  newLogin,
  getDaysByUsername,
  getActivitiesByUsername,
  persistDaysAndActivitiesForUsername,
};
