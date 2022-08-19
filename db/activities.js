const { RowDescriptionMessage } = require("pg-protocol/dist/messages");
const client = require("./client");

// database functions

async function getAllActivities() {
  try {
    const { rows } = await client.query(`SELECT * FROM activities;`);
    return rows;
  } catch (error) {
    console.log(error.error);
  }
}

async function getActivityById(id) {
  try {
    const { rows } = await client.query(`SELECT * FROM activities 
     WHERE id=${id};`);
    return rows[0];
  } catch (error) {
    console.log(error.error);
  }
}

async function getActivityByName(name) {
  try {
    const { rows } = await client.query(`SELECT * FROM activities
     WHERE name='${name}';`);
    return rows[0];
  } catch (error) {
    console.log(error.error);
  }
}

// select and return an array of all activities
async function attachActivitiesToRoutines(routines) {
  try {
  } catch (error) {
    console.log(error.error);
  }
}

// return the new activity
async function createActivity({ name, description }) {
  // return the new activity
  try {
    const {
      rows: [activities],
    } = await client.query(
      `
        INSERT INTO activities(name, description)
        VALUES($1, $2)
        RETURNING *;
      `,
      [name, description]
    );

    return activities;
  } catch (error) {
    console.log(error);
  }
}
// don't try to update the id
// do update the name and description
// return the updated activity
async function updateActivity({ id, ...fields }) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `UPDATE activities SET name = '${fields.name}', description = '${fields.description}'
       WHERE id=${id}
       RETURNING *;`
    );
    return activity;
  } catch (error) {
    console.log(error.error);
  }
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
