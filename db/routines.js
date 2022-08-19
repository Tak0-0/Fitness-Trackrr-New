const client = require("./client");
async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        INSERT INTO routines(name, goal, "isPublic", "creatorId")
        VALUES($1, $2, $3, $4)
        RETURNING *;
      `,
      [name, goal, isPublic, creatorId]
    );

    return routine;
  } catch (error) {
    console.log(error);
  }
}

async function getRoutineById(id) {
  try {
    const { rows } = await client.query(`SELECT * FROM routines
     WHERE id=${id};`);
    return rows[0];
  } catch (error) {
    console.log(error.error);
  }
}

async function getRoutinesWithoutActivities() {
  try {
    const { rows } = await client.query(`SELECT * FROM routines;`);
    return rows;
  } catch (error) {
    console.log(error.error);
  }
}

async function getAllRoutines() {
  try {
    const { rows } = await client.query(
      `SELECT r.*, u.username AS "creatorName" FROM routines r
      JOIN users u ON r."creatorId" = u.id
      ;`
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getAllRoutinesByUser({ username }) {
  try {
    const { rows } = await client.query(
      `SELECT r.*, u.username AS "creatorName" FROM routines r
      JOIN users u ON r."creatorId" = u.id WHERE username = '${username}'
      ;`
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getPublicRoutinesByUser({ username }) {
  try {
    const { rows } = await client.query(
      `SELECT r.*, u.username AS "creatorName" FROM routines r
      JOIN users u ON r."creatorId" = u.id WHERE r."creatorId" = '${username}'
      WHERE "isPublic" = true
      ;`
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getAllPublicRoutines() {
  try {
    const { rows } = await client.query(
      `SELECT r.*, u.username AS "creatorName" FROM routines r
      JOIN users u ON r."creatorId" = u.id WHERE "isPublic" = true
      ;`
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
}
//do
async function getPublicRoutinesByActivity({ id }) {
  try {
    const { rows } = await client.query(
      `SELECT r.*, u.username AS "creatorName" FROM routines r
      JOIN users u ON r."creatorId" = u.id
      WHERE "isPublic" = true
      ;`
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function updateRoutine({ id, ...fields }) {}

async function destroyRoutine(id) {
  try {
    await client.query(`DELETE FROM routine_activities
     WHERE "routineId"=${id};`);
    const { rows } = await client.query(`DELETE FROM routines
     WHERE id=${id}
     RETURNING *;`);
    return rows;
  } catch (error) {
    console.log(error.error);
  }
}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
